import { test, expect } from 'vitest';
import fs from 'fs';
import path from 'path';


function extractImports(filePath: any) {
  // if (!fs.existsSync(filePath)) {
  //   console.warn(`File not found: ${filePath}`);
  //   return [];
  // }
  const content = fs.readFileSync(filePath, 'utf8');
  const importMatches = content.matchAll(/import .* from ['"]([^'";]+)['"]/g);
  return Array.from(importMatches, (match) => match[1]);
}

export function runDependencyCheckTests(packageJsonPath: any, componentPaths: any) {
  test(`All dependencies from package.json are imported in:
 ${componentPaths.join(',\n ')}`, () => {
    if (!fs.existsSync(packageJsonPath)) {
      throw new Error(`package.json not found at ${packageJsonPath}`);
    }

    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    const dependencies = Object.keys(packageJson.dependencies || {});

    const validExtensions = ['.tsx', '.jsx', '.ts'];
    const allImports = new Set();

    // collect all imports
    componentPaths.forEach((componentPath: any) => {
      const fileExtension = path.extname(componentPath);
      if (!validExtensions.includes(fileExtension)) {
        throw new Error(`Invalid file extension for ${componentPath}, must be .tsx, .jsx, or .ts`);
      }
      extractImports(componentPath).forEach((imp) => allImports.add(imp));
    });

    //uncomment for debug
    // console.log('Expected dependencies:', dependencies);
    // console.log('Found imports:', Array.from(allImports));

  //check that dependency imported at least once
    dependencies.forEach((dep) => {
      const isDepImported = Array.from(allImports).some((imp:any) => imp === dep || imp.includes(dep));
     // console.log(`Checking dependency "${dep}" - Found: ${isDepImported}`);
      expect(isDepImported).toBe(true);
    });
  });
}
