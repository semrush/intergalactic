import ts from 'typescript';
import {
  extractDependenciesList,
  serializeMethod,
  serializeProperty,
  serializeTsNode,
} from './serializer';

export const serializeClassDeclaration = (classDeclaration: ts.ClassDeclaration) => {
  const name = classDeclaration.name.escapedText as string;
  const genericsMap = {};
  const inheritance = [...(classDeclaration.heritageClauses ?? [])].flatMap((clause) =>
    clause.types.map((type: any) => ({
      referenceTo: type.expression.escapedText,
      displayText: type.expression.escapedText,
    })),
  );
  const dependencies = extractDependenciesList(inheritance);
  const properties: ts.PropertySignature[] = [];
  const methods: ts.MethodDeclaration[] = [];
  classDeclaration.forEachChild((child) => {
    if (child.kind === ts.SyntaxKind.PropertySignature) {
      properties.push(child as ts.PropertySignature);
    }
    if (child.kind === ts.SyntaxKind.MethodDeclaration) {
      methods.push(child as ts.MethodDeclaration);
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
  const serializedMethods = methods.map((method) => serializeMethod(method, genericsMap));
  for (const property of serializedProperties) {
    dependencies.push(...property.dependencies);
  }
  for (const method of serializedMethods) {
    dependencies.push(...method.dependencies);
  }

  return {
    entity: 'class',
    name,
    inheritance,
    properties: [...serializedProperties, serializedMethods],
    dependencies,
  };
};
