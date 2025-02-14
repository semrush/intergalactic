import { test, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

//receive list of inports .tsx, .jsx or .ts files
function extractImports(filePath: string): string[] {
  // if (!fs.existsSync(filePath)) {
  //   console.warn(`File not found: ${filePath}`);
  //   return []; // Если файл не найден, возвращаем пустой массив
  // }

  const content = fs.readFileSync(filePath, 'utf8');
  const importMatches = content.matchAll(/import .* from ['"](@semcore\/[^'"]+)['"]/g);
  return Array.from(importMatches, (match) => match[1]);
}

// check dependencies in component
export function runDependencyCheckTests(packageJsonPath: string, componentPaths: string[]) {
  test(`All dependencies from package.json are imported in:\n ${componentPaths.join(
    ',\n ',
  )}`, () => {
    if (!fs.existsSync(packageJsonPath)) {
      throw new Error(`package.json not found at ${packageJsonPath}`);
    }

    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    const dependencies = Object.keys(packageJson.dependencies).filter((dep) =>
      dep.startsWith('@semcore/'),
    );

    const validExtensions = ['.tsx', '.jsx', '.ts', '.tsx'];
    const allImports = new Set<string>();

    // collect all inports

    componentPaths.forEach((componentPath) => {
      const fileExtension = path.extname(componentPath);

      if (!validExtensions.includes(fileExtension)) {
        throw new Error(`Invalid file extension for ${componentPath}, must be .tsx, .jsx, or .ts`);
      }

      extractImports(componentPath).forEach((imp) => allImports.add(imp));
    });

    //uncomment for debug
    // console.log('Expected dependencies:', dependencies);
    // console.log('Found imports:', Array.from(allImports));

    // Each dep from package.jsonimported at lease once at leaast in one file
    dependencies.forEach((dep) => {
      const isDepImported = Array.from(allImports).some((imp) => imp === dep || imp.includes(dep));
      //  console.log(`Checking dependency "${dep}" - Found: ${isDepImported}`);
      expect(isDepImported).toBe(true);
    });
  });
}
