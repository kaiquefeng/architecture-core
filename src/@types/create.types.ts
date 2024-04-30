import prompts from 'prompts';

export type ColorFunc = (str: string | number) => string;

export type OptionVariant = {
  name: string;
  display: string;
  color: ColorFunc;
  customCommand?: string;
};

export type OptionTerminalSelect = {
  name: string;
  display: string;
  color: ColorFunc;
  variants: OptionVariant[];
};

export type OPTIONS_TYPE_STEPS = prompts.Answers<'type' | 'code_type'>;
