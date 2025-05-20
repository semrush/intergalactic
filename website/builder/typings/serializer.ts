import ts from 'typescript';

const hideGenerics = {
  'Intergalactic.InternalTypings.EfficientOmit': 1,
  Omit: 1,
};

export const extractDependenciesList = (typingsParts) => {
  const dependencies = typingsParts
    .filter((part) => typeof part === 'object')
    .map((part) => part.referenceTo);
  for (let i = 0; i < dependencies.length; i++) {
    if (!dependencies[i]) {
      throw new Error(
        `Got invalid dependency while resolving dependencies of ${JSON.stringify(typingsParts)}`,
      );
    }
  }
  return dependencies;
};
const computeTypingStringLength = (typingsParts) =>
  typingsParts.reduce(
    (sum, part) => sum + (typeof part === 'string' ? part.length : part.displayText.length),
    0,
  );

export const serializeTsNode = (node: ts.Node, genericsMap = {}, minimizeMembersOf = []) => {
  const traverse = (node: ts.Node) => {
    switch (node.kind) {
      case ts.SyntaxKind.NumberKeyword:
        return 'number';
      case ts.SyntaxKind.ObjectKeyword:
        return 'object';
      case ts.SyntaxKind.SetKeyword:
        return 'set';
      case ts.SyntaxKind.StringKeyword:
        return 'string';
      case ts.SyntaxKind.SymbolKeyword:
        return 'symbol';
      case ts.SyntaxKind.UndefinedKeyword:
        return 'undefined';
      case ts.SyntaxKind.VoidKeyword:
        return 'void';
      case ts.SyntaxKind.NeverKeyword:
        return 'never';
      case ts.SyntaxKind.NullKeyword:
        return 'null';
      case ts.SyntaxKind.BooleanKeyword:
        return 'boolean';
      case ts.SyntaxKind.TrueKeyword:
        return 'true';
      case ts.SyntaxKind.FalseKeyword:
        return 'false';
      case ts.SyntaxKind.BigIntKeyword:
        return 'BigInt';
      case ts.SyntaxKind.AnyKeyword:
        return 'any';
      case ts.SyntaxKind.UnknownKeyword:
        return 'unknown';
      case ts.SyntaxKind.StringLiteral:
        return `"${(node as ts.StringLiteral).text}"`;
      case ts.SyntaxKind.FirstLiteralToken:
        return (node as ts.LiteralLikeNode).text;
      case ts.SyntaxKind.Identifier:
        return (node as ts.Identifier).escapedText;
      case ts.SyntaxKind.TypeParameter:
        return (node as ts.TypeParameterDeclaration).name.escapedText;
      case ts.SyntaxKind.InferType:
        return ['infer ', traverse((node as ts.InferTypeNode).typeParameter)];
      case ts.SyntaxKind.TypeQuery:
        return ['typeof ', traverse((node as ts.TypeQueryNode).exprName)];
      case ts.SyntaxKind.ArrayType:
        return [traverse((node as ts.ArrayTypeNode).elementType), '[]'];
      case ts.SyntaxKind.RestType:
        return ['...', traverse((node as ts.RestTypeNode).type)];
      case ts.SyntaxKind.TypeLiteral: {
        const members = (node as ts.TypeLiteralNode).members.map((member) => traverse(member));
        const result = ['{'];
        if (minimizeMembersOf.includes(node)) {
          result.push('...');
        } else {
          for (const member of members) {
            if (result.length > 1) result.push('; ');
            result.push(member);
          }
          if (members.length > 0) {
            result.unshift(' ');
            result.push(' ');
          }
        }
        result.push('}');
        return result;
      }
      case ts.SyntaxKind.TupleType: {
        const elements = (node as ts.TupleTypeNode).elements.map((element) => traverse(element));
        const result = ['['];
        for (const element of elements) {
          if (result.length > 1) result.push(', ');
          result.push(element);
        }
        result.push(']');
        return result;
      }
      case ts.SyntaxKind.PropertySignature: {
        const property = node as ts.PropertySignature;
        const name = String((property as { name?: ts.Identifier }).name!.escapedText);
        const isOptional = property.questionToken !== undefined;
        const result: string[] = [name];
        if (isOptional) result.push('?');
        result.push(': ');
        result.push(traverse(property.type));
        return result;
      }
      case ts.SyntaxKind.MethodDeclaration: {
        const method = node as ts.MethodDeclaration;
        const name = String((method as { name?: ts.Identifier }).name!.escapedText);
        const isOptional = method.questionToken !== undefined;
        const result = [name];
        if (method.parameters.length === 0) {
          result.push('()');
        } else {
          const params = method.parameters.map((param) => traverse(param));
          result.push('(');
          for (let i = 0; i < params.length; i++) {
            if (i !== 0) result.push(', ');
            result.push(params[i]);
          }
          result.push(')');
        }
        if (isOptional) result.push('?');
        result.push(': ');
        if (method.body) {
          result.push('{ ... }');
        } else {
          result.push(traverse(method.type));
        }
        return result;
      }
      case ts.SyntaxKind.ParenthesizedType:
        return ['(', traverse((node as ts.ParenthesizedTypeNode).type), ')'];
      case ts.SyntaxKind.FunctionType: {
        const { parameters, type } = node as ts.FunctionTypeNode;
        const params = parameters.map((param) => traverse(param));
        const returnType = traverse(type);
        const result: any[] = [];
        result.push('(');
        for (let i = 0; i < params.length; i++) {
          if (i !== 0) result.push(', ');
          result.push(params[i]);
        }
        result.push(') => ');
        result.push(returnType);

        return result;
      }
      case ts.SyntaxKind.ConditionalType: {
        const { checkType, extendsType, trueType, falseType } = node as ts.ConditionalTypeNode;

        return [
          traverse(checkType),
          ' extends ',
          traverse(extendsType),
          ' ? ',
          traverse(trueType),
          ' : ',
          traverse(falseType),
        ];
      }
      case ts.SyntaxKind.MappedType: {
        const { typeParameter, type } = node as ts.MappedTypeNode;
        return [
          '[',
          traverse(typeParameter.name),
          traverse(typeParameter.constraint!),
          ']:',
          traverse(type!),
        ];
      }
      case ts.SyntaxKind.IndexSignature: {
        const { type, parameters } = node as ts.IndexSignatureDeclaration;
        if (parameters.length !== 1) {
          // biome-ignore lint/suspicious/noConsoleLog:
          console.log(node);
          throw new Error('Unable to handle IndexSignature with node.paraments.length !== 1');
        }
        return ['[', traverse(parameters[0]), ']:', traverse(type)];
      }
      case ts.SyntaxKind.NamedTupleMember:
      case ts.SyntaxKind.Parameter: {
        const { name, type } = node as ts.ParameterPropertyDeclaration;
        const parameterName = name.escapedText;
        const parameterValue = type ? traverse(type) : '';

        if (parameterValue) {
          return [parameterName, ': ', parameterValue];
        } else {
          return [parameterName];
        }
      }
      case ts.SyntaxKind.IndexedAccessType: {
        const { objectType, indexType } = node as ts.IndexedAccessTypeNode;
        return [traverse(objectType), '[', traverse(indexType), ']'];
      }
      case ts.SyntaxKind.UnionType: {
        const { types } = node as ts.UnionTypeNode;
        const result: any[] = [];
        for (let i = 0; i < types.length; i++) {
          if (i !== 0) result.push(' | ');
          result.push(traverse(types[i]));
        }
        return result;
      }
      case ts.SyntaxKind.IntersectionType: {
        const { types } = node as ts.IntersectionTypeNode;
        const result: any[] = [];
        for (let i = 0; i < types.length; i++) {
          if (i !== 0) result.push(' & ');
          result.push(traverse(types[i]));
        }
        return result;
      }
      case ts.SyntaxKind.FirstJSDocNode:
        return traverse((node as ts.JSDocTypeReferencingNode).type);
      case ts.SyntaxKind.LiteralType:
        return traverse((node as ts.LiteralTypeNode).literal);
      case ts.SyntaxKind.TypeOperator: {
        const { type, operator } = node as ts.TypeOperatorNode;
        switch (operator) {
          case ts.SyntaxKind.KeyOfKeyword:
            return ['keyof ', traverse(type)];
          case ts.SyntaxKind.ReadonlyKeyword:
            return 'readonly';
        }
        throw new Error(`Got unknown type operator ${ts.SyntaxKind[operator]} (${operator})`);
      }
      case ts.SyntaxKind.TemplateLiteralType: {
        const { head, templateSpans } = node as ts.TemplateLiteralTypeNode;
        return ['`', head.text, templateSpans.map((span) => traverse(span)), '`'];
      }
      case ts.SyntaxKind.TemplateLiteralTypeSpan: {
        const { type, literal } = node as ts.TemplateLiteralTypeSpan;
        return ['${', traverse(type), '}', literal.text];
      }
      case ts.SyntaxKind.TypeReference: {
        const { typeName, typeArguments } = node as Omit<ts.TypeReferenceNode, 'typeName'> & {
          typeName: ts.BinaryExpression & { escapedText: string };
        };
        if (typeArguments) {
          let name = [typeName.escapedText];
          if (typeName.left && typeName.right) {
            name = [traverse(typeName.left), '.', traverse(typeName.right)];
          }
          const stringifiedName = name.flat().join('');
          if (hideGenerics[stringifiedName]) {
            const maxArgLength = hideGenerics[stringifiedName];
            const result = [];
            for (let i = 0; i < typeArguments.length && i < maxArgLength; i++) {
              if (i !== 0) result.push(', ');
              result.push(traverse(typeArguments[i]));
            }
            return result;
          }
          const result = [...name, '<'];
          for (let i = 0; i < typeArguments.length; i++) {
            if (i !== 0) result.push(', ');
            result.push(traverse(typeArguments[i]));
          }
          result.push('>');
          return result;
        }
        if (typeName.left && typeName.right) {
          return [traverse(typeName.left), '.', traverse(typeName.right)];
        }
        if (typeName.escapedText !== undefined) {
          const genericReference = genericsMap[typeName.escapedText];
          if (genericReference) return genericReference;

          return {
            referenceTo: typeName.escapedText,
            displayText: typeName.escapedText,
          };
        }

        break;
      }
      case ts.SyntaxKind.MethodSignature: {
        const { type, name, parameters } = node as ts.MethodSignature;
        const params = parameters.map((param) => traverse(param));
        const returnType = traverse(type);
        const result: any[] = [];
        result.push(traverse(name));
        result.push('(');
        for (let i = 0; i < params.length; i++) {
          if (i !== 0) result.push(', ');
          result.push(params[i]);
        }
        result.push('): ');
        result.push(returnType);

        return result;
      }
      case ts.SyntaxKind.FirstNode: {
        const { left, right } = node as ts.QualifiedName;
        return [traverse(left), '.', traverse(right)];
      }
    }

    throw new Error(`Unable to handle ${ts.SyntaxKind[node?.kind]}`);
  };

  const nestedList = [traverse(node)];
  const flatList = nestedList.flat(Infinity);
  const joinedList = flatList.reduce((acc, item) => {
    if (typeof item === 'string' && typeof acc[acc.length - 1] === 'string') {
      acc[acc.length - 1] += item;
    } else {
      acc.push(item);
    }
    return acc;
  }, []);

  return joinedList;
};

const serializeJSDoc = (jsDoc: ts.JSDoc[], dependencies: string[], genericsMap) => {
  const description = jsDoc.map((jsDocBlock) => jsDocBlock.comment).join('\n');
  const params = Object.fromEntries(
    jsDoc
      .flatMap((jsDocBlock) => jsDocBlock.tags ?? [])
      .map((tag) => {
        const paramName = tag.tagName.escapedText;
        const paramValue =
          (tag as any).typeExpression && serializeTsNode((tag as any).typeExpression, genericsMap);

        if (paramName === 'use') {
          const useInstead = (tag as any).comment.split('.')[0];
          let useInsteadPostfix = (tag as any).comment.split('.').slice(1).join('.');
          if (useInsteadPostfix.length > 0) {
            useInsteadPostfix = `.${useInsteadPostfix}`;
          }
          dependencies.push(useInstead);
          return [
            paramName,
            [{ referenceTo: useInstead, displayText: useInstead }, useInsteadPostfix],
          ];
        }

        if (!paramValue || computeTypingStringLength(paramValue) === 0) {
          return [paramName, tag.comment ?? true];
        }
        dependencies.push(...extractDependenciesList(paramValue));

        return [paramName, paramValue];
      }),
  );

  return { description, params };
};

export const serializeProperty = (propertyDeclaration: ts.PropertySignature, genericsMap) => {
  const name = (propertyDeclaration as { name?: ts.Identifier }).name!.escapedText;
  const isOptional = propertyDeclaration.questionToken !== undefined;
  const type = serializeTsNode(propertyDeclaration.type!, genericsMap, []);
  const dependencies = extractDependenciesList(type);

  const jsDoc = (propertyDeclaration as { jsDoc?: ts.JSDoc[] }).jsDoc ?? [];
  const { description, params } = serializeJSDoc(jsDoc, dependencies, genericsMap);

  return {
    name,
    isOptional,
    type,
    description,
    params,
    dependencies,
  };
};

export const serializeMethod = (propertyDeclaration: ts.MethodDeclaration, genericsMap) => {
  const name = (propertyDeclaration as { name?: ts.Identifier }).name!.escapedText;
  const isOptional = propertyDeclaration.questionToken !== undefined;
  const type = serializeTsNode(propertyDeclaration, genericsMap, []);
  const dependencies = extractDependenciesList(type);

  const jsDoc = (propertyDeclaration as { jsDoc?: ts.JSDoc[] }).jsDoc ?? [];
  const { description, params } = serializeJSDoc(jsDoc, dependencies, genericsMap);

  return {
    name,
    isOptional,
    type,
    description,
    params,
    dependencies,
  };
};
