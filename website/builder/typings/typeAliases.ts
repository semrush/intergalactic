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
  if (typeDeclaration.type.kind === ts.SyntaxKind.TypeLiteral) {
    const { members } = typeDeclaration.type as ts.TypeLiteralNode;
    properties.push(
      ...members
        .filter((property) => property.kind === ts.SyntaxKind.PropertySignature)
        .map((property) => serializeProperty(property as ts.PropertySignature, genericsMap)),
    );
  }
  for (const property of properties) {
    dependencies.push(...property.dependencies);
  }

  const type = serializeTsNode(typeDeclaration.type, genericsMap);
  dependencies.push(...extractDependenciesList(type));

  return {
    entity: 'type',
    name,
    type,
    properties,
    dependencies,
  };
};
