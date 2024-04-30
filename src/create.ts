import fs from 'fs';
import { red, reset } from 'kolorist';
import minimist from 'minimist';
import path from 'path';
import prompts from 'prompts';
import { OptionTerminalSelect } from './@types/create.types.js';
import { CREATE_OPTIONS } from './constants/create-options';
import { ConvertToKebabCase } from './utils/convert-to-kebab-case.js';
import { emptyDir, isEmpty } from './utils/validate.js';

const argv = minimist<{
  t?: string;
  template?: string;
}>(process.argv.slice(2), { string: ['_'] });

const cwd = process.cwd();

function formatTargetDir(targetDir: string | undefined) {
  return targetDir?.trim().replace(/\/+$/g, '');
}

const TEMPLATES = CREATE_OPTIONS.map((f) => (f.variants && f.variants.map((v) => v.name)) || [f.name]).reduce(
  (a, b) => a.concat(b),
  [],
);

const defaultTargetDir = 'component-name';

const Init = async () => {
  const argumentTargetDir = formatTargetDir(argv._[0]);
  const argTemplate = argv.template || argv.t;

  let targetDir = argumentTargetDir || defaultTargetDir;
  const getProjectName = () => (targetDir === '.' ? path.basename(path.resolve()) : targetDir);

  let OPTIONS_TYPE_STEPS: prompts.Answers<'folder_name' | 'overwrite' | 'type' | 'code_type'>;

  try {
    OPTIONS_TYPE_STEPS = await prompts(
      [
        {
          type: argumentTargetDir ? null : 'text',
          name: 'folder_name',
          message: reset('Folder name:'),
          initial: defaultTargetDir,
          onState: (state) => {
            targetDir = ConvertToKebabCase(state.value) || defaultTargetDir;
          },
        },
        {
          type: () => (!fs.existsSync(targetDir) || isEmpty(targetDir) ? null : 'select'),
          name: 'overwrite',
          message: () =>
            (targetDir === '.' ? 'Current directory' : `Target directory "${targetDir}"`) +
            ` is not empty. Please choose how to proceed:`,
          initial: 0,
          choices: [
            {
              title: 'Remove existing files and continue',
              value: 'yes',
            },
            {
              title: 'Cancel operation',
              value: 'no',
            },
            {
              title: 'Ignore files and continue',
              value: 'ignore',
            },
          ],
        },
        {
          type: (_, { overwrite }: { overwrite?: string }) => {
            if (overwrite === 'no') {
              throw new Error(red('✖') + ' Operation cancelled');
            }
            return null;
          },
          name: 'overwriteChecker',
        },
        {
          type: argTemplate && TEMPLATES.includes(argTemplate) ? null : 'select',
          name: 'type',
          message:
            typeof argTemplate === 'string' && !TEMPLATES.includes(argTemplate)
              ? reset(`"${argTemplate}" isn't a valid template. Please choose from below: `)
              : reset('Select a create:'),
          initial: 0,
          choices: CREATE_OPTIONS.map((create) => {
            const createColor = create.color;
            return {
              title: createColor(create.display || create.name),
              value: create,
            };
          }),
        },
        {
          type: (create: OptionTerminalSelect) => (create && create.variants ? 'select' : null),
          name: 'code_type',
          message: reset('Select code type:'),
          choices: (create: OptionTerminalSelect) =>
            create.variants.map((variant) => {
              const variantColor = variant.color;
              return {
                title: variantColor(variant.display || variant.name),
                value: variant.name,
              };
            }),
        },
      ],
      {
        onCancel: () => {
          throw new Error(red('✖') + ' Operation cancelled');
        },
      },
    );
  } catch (cancelled: any) {
    console.log(cancelled.message);
    return;
  }

  const { folder_name, code_type, overwrite, type } = OPTIONS_TYPE_STEPS;

  const root = path.join(cwd, targetDir);

  if (overwrite === 'yes') {
    emptyDir(root);
  } else if (!fs.existsSync(root)) {
    fs.mkdirSync(root, { recursive: true });
  }

  console.log({ type, argv, argTemplate, getProjectName: getProjectName(), targetDir });
};

Init().catch((e) => {
  console.error(e);
});
