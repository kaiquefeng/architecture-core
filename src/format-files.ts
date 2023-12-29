import { ConvertToKebabCase } from './utils/convert-to-kebab-case.js';

import fs from 'fs';
import path from 'path';
import { EXCLUDED_PATHS } from './constants/excluded-paths.js';

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
}

renameDirectories(process.cwd());
