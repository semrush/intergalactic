import ts from 'typescript';

import { extractDependenciesList, serializeProperty, serializeTsNode } from './serializer';

const getQualifiedTypeName = (typeName: ts.TypeReferenceNode['typeName']): string => {
  if (ts.isQualifiedName(typeName)) {
    const left = getQualifiedTypeName(typeName.left);
    const right = typeName.right.escapedText;

    return `${left}.${right}`;
  }

  return typeName.text;
};

export const serializeTypeDeclaration = (
  typeDeclaration: ts.TypeAliasDeclaration,
  nsRegistry: Record<string, ts.TypeAliasDeclaration>,
  initialGenericsMap: Record<string, any> = {},
) => {
  const name = typeDeclaration.name.escapedText as string;

  if (ts.isTypeReferenceNode(typeDeclaration.type)) {
    const { type } = typeDeclaration;
    const qualifiedName = getQualifiedTypeName(type.typeName);

    if (qualifiedName) {
      const nsTypeDecl = nsRegistry[qualifiedName];

      if (nsTypeDecl) {
        const innerGenericMap: Record<string, any> = {};

        if (type.typeArguments) {
          nsTypeDecl.typeParameters?.forEach((p, i) => {
            const parameter = p.name.text;
            innerGenericMap[parameter] = serializeTsNode(p);
          });
        }

        return {
          ...serializeTypeDeclaration(nsTypeDecl, nsRegistry, innerGenericMap),
          name,
        };
      }
    }
  }

  const genericsMap = { ...initialGenericsMap };
  const properties = [];
  const dependencies = [];

  for (const typeParameter of typeDeclaration.typeParameters ?? []) {
    if (typeParameter.kind === ts.SyntaxKind.TypeParameter && typeParameter.constraint) {
      const computedNode = serializeTsNode(typeParameter.constraint, genericsMap, [], nsRegistry);
      dependencies.push(...extractDependenciesList(computedNode));
      const { escapedText } = typeParameter.name as { escapedText: string };
      genericsMap[escapedText] = computedNode;
    }
  }
  const minimizeMembers: ts.TypeLiteralNode[] = [];
  if ('members' in typeDeclaration.type) {
    const { members } = typeDeclaration.type as ts.TypeLiteralNode;
    minimizeMembers.push(typeDeclaration.type as ts.TypeLiteralNode);
    properties.push(
      ...members
        .filter((property) => property.kind === ts.SyntaxKind.PropertySignature)
        .map((property) => serializeProperty(property as ts.PropertySignature, genericsMap, nsRegistry)),
    );
  }
  if ('types' in typeDeclaration.type) {
    for (const type of typeDeclaration.type.types as ts.TypeLiteralNode[]) {
      minimizeMembers.push(type as ts.TypeLiteralNode);
      if ('members' in type) {
        const { members } = type;

        properties.push(
          ...members
            .filter((property) => property.kind === ts.SyntaxKind.PropertySignature)
            .map((property) => serializeProperty(property as ts.PropertySignature, genericsMap, nsRegistry)),
        );
      }
    }
  }
  for (const property of properties) {
    dependencies.push(...property.dependencies);
  }

  const type = serializeTsNode(typeDeclaration.type, genericsMap, minimizeMembers, nsRegistry);
  dependencies.push(...extractDependenciesList(type));

  return {
    entity: 'type',
    name,
    type,
    properties,
    dependencies,
  };
};
