import { ConvertToKebabCase } from './utils/convert-to-kebab-case.js';

import fs from 'fs';
import path from 'path';
import { EXCLUDED_PATHS } from './constants/excluded-paths.js';

function renameComponents(directory: string) {
  fs.readdir(directory, { withFileTypes: true }, (err, files) => {
    for (const file of files) {
      const fullPath = path.join(directory, file.name);
      const isExcluded = EXCLUDED_PATHS.some((excludedPath) => file.name.includes(excludedPath));

      if (file.isDirectory() && !isExcluded) {
        const components = fs.readdirSync(fullPath);

        components.forEach((component) => {
          if (component.endsWith('.tsx')) {
            const componentName = component.replace('.tsx', '');
            const componentNameFormatted = ConvertToKebabCase(componentName);

            const newDir = path.join(fullPath, componentNameFormatted);

            fs.mkdirSync(newDir);
            fs.renameSync(path.join(fullPath, component), path.join(newDir, `${componentNameFormatted}.tsx`));
            fs.writeFileSync(path.join(newDir, 'index.ts'), `export * from './${componentNameFormatted}';\n`);
          }
        });
      }
    }
  });
}

function renameDirectories(directory: string) {
  fs.readdir(directory, { withFileTypes: true }, (err, files) => {
    for (const file of files) {
      const isExcluded = EXCLUDED_PATHS.some((excludedPath) => file.name.includes(excludedPath));

      const fullPath = path.join(directory, file.name);

      if (file.isDirectory() && !isExcluded) {
        const newFilename = ConvertToKebabCase(file.name);
        fs.renameSync(fullPath, path.join(directory, newFilename));
        renameDirectories(path.join(directory, newFilename));
      } else {
        const newFilename = ConvertToKebabCase(file.name);
        fs.renameSync(fullPath, path.join(directory, newFilename));
      }
    }
  });

  renameComponents(directory);
}

renameDirectories(process.cwd());
