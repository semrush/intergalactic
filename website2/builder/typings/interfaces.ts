import ts from 'typescript';
import { extractDependenciesList, serializeProperty, serializeTsNode } from './serializer';

export const serializeInterfaceDeclaration = (interfaceDeclaration: ts.InterfaceDeclaration) => {
  const name = interfaceDeclaration.name.escapedText as string;
  const genericsMap = {};
  const inheritance = (interfaceDeclaration.heritageClauses ?? [])
    .map((clause) =>
      clause.types.map((type) => ({
        referenceTo: type.expression.escapedText,
        displayText: type.expression.escapedText,
      })),
    )
    .flat();
  const dependencies = extractDependenciesList(inheritance);
  const properties: ts.PropertySignature[] = [];
  interfaceDeclaration.forEachChild((child) => {
    if (child.kind === ts.SyntaxKind.PropertySignature) {
      properties.push(child as ts.PropertySignature);
    }
    if (
      child.kind === ts.SyntaxKind.TypeParameter &&
      (child as ts.TypeParameterDeclaration).constraint
    ) {
      const { constraint, name } = child as ts.TypeParameterDeclaration & {
        name: { escapedText: string };
      };
      const computedChild = serializeTsNode(constraint, genericsMap);
      genericsMap[name.escapedText] = computedChild;
      dependencies.push(...extractDependenciesList(computedChild));
    }
  });
  const serializedProperties = properties.map((property) =>
    serializeProperty(property, genericsMap),
  );
  for (const property of serializedProperties) {
    dependencies.push(...property.dependencies);
  }

  return {
    entity: 'interface',
    name,
    inheritance,
    properties: serializedProperties,
    dependencies,
  };
};
