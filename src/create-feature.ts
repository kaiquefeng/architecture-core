import fs from 'fs';
import path from 'path';
import { FEATURE_STRUCTURE_FILES, FEATURE_STRUCTURE_FOLDERS } from './constants/feature-structure.js';

const folderName = process.argv[2];

if (!folderName) {
  console.error('Please provide a feature name.');
  process.exit(1);
}

function searchDirectory(directory: string) {
  fs.readdir(directory, { withFileTypes: true }, (err, files) => {
    for (const file of files) {
      if (file.isDirectory()) {
        const fullPath = path.join(directory, file.name);

        if (file.name === 'features') {
          const newFolderPath = path.join(fullPath, folderName);

          FEATURE_STRUCTURE_FOLDERS.forEach((dir) => {
            const folderPath = `${newFolderPath}${dir}`;
            fs.mkdir(folderPath, { recursive: true }, (err) => {
              if (err) {
              } else {
                console.log('Feature created successfully:');

                FEATURE_STRUCTURE_FILES.filter((item) => {
                  if (folderPath.includes(item.name)) {
                    item.files.map((file) => {
                      fs.writeFile(`${folderPath}/${file}`, '', (err) => {});
                    });
                  }
                });
              }
            });
          });
        }

        searchDirectory(fullPath);
      }
    }
  });
}

searchDirectory(process.cwd());
