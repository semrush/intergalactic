import ts from 'typescript';
import { extractDependenciesList, serializeProperty, serializeTsNode } from './serializer';

export const serializeTypeDeclaration = (typeDeclaration: ts.TypeAliasDeclaration) => {
  const name = typeDeclaration.name.escapedText as string;
  const genericsMap = {};
  const properties = [];
  const dependencies = [];

  for (const typeParameter of typeDeclaration.typeParameters ?? []) {
    if (typeParameter.kind === ts.SyntaxKind.TypeParameter && typeParameter.constraint) {
      const computedNode = serializeTsNode(typeParameter.constraint, genericsMap);
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
        .map((property) => serializeProperty(property as ts.PropertySignature, genericsMap)),
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
            .map((property) => serializeProperty(property as ts.PropertySignature, genericsMap)),
        );
      }
    }
  }
  for (const property of properties) {
    dependencies.push(...property.dependencies);
  }

  const type = serializeTsNode(typeDeclaration.type, genericsMap, minimizeMembers);
  dependencies.push(...extractDependenciesList(type));

  return {
    entity: 'type',
    name,
    type,
    properties,
    dependencies,
  };
};
