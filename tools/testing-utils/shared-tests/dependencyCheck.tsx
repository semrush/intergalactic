import { test, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

function extractImports(filePath: string) {
  const content = fs.readFileSync(filePath, 'utf8');
  const importMatches = content.matchAll(/import .* from ['"]([^'";]+)['"]/g);
  return Array.from(importMatches, (match) => match[1]);
}

export function runDependencyCheckTests(packageJsonPath: string, componentPaths: string[]) {
  test(`All @semcore dependencies are imported in:\n ${componentPaths.join(',\n ')}`, () => {
    if (!fs.existsSync(packageJsonPath)) {
      throw new Error(`package.json not found at ${packageJsonPath}`);
    }

    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    const dependencies = Object.keys(packageJson.dependencies || {});

    const validExtensions = ['.tsx', '.jsx', '.ts'];
    const allImports = new Set<string>();

    // all imports from components
    componentPaths.forEach((componentPath) => {
      const fileExtension = path.extname(componentPath);
      if (!validExtensions.includes(fileExtension)) {
        throw new Error(`Invalid file extension for ${componentPath}, must be .tsx, .jsx, or .ts`);
      }

      extractImports(componentPath).forEach((imp) => {
        // Ignore @semcore/core imports because they present in impports but dont present in dependencies
        if (imp.startsWith('@semcore/') && imp !== '@semcore/core') {
          const semcorePackage = imp.split('/')[0] + '/' + imp.split('/')[1];
          allImports.add(semcorePackage); // use unique semcore imports
        }
      });
    });
   //console.log('Expected dependencies:', Array.from(dependencies));
   // console.log('Found @semcore imports:', Array.from(allImports));
    // each @semcore unique import exists in package.json dependencies
    allImports.forEach((importedDep) => {
      const isDepImported = dependencies.includes(importedDep);
     // console.log(`Checking import: ${importedDep}`);
     // console.log(`Is ${importedDep} in dependencies? ${isDepImported}`);

      expect(isDepImported).toBe(true); 
    });
  });
}
