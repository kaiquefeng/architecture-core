export const ConvertToKebabCase = (text: string) => {
  let count = 0;
  const REGEX_UPPERCASE = /((?=[A-Z]{2,}))([A-Z])/g;
  const REGEX_CAMELCASE = /([a-z0-9]|(?=[A-Z]))([A-Z])/g;

  if (!REGEX_UPPERCASE.test(text)) {
    return text
      .replace(REGEX_CAMELCASE, (match, p1, p2) => {
        count++;
        return count > 1 ? `${p1}-${p2}` : `${p1}${p2}`;
      })
      .toLocaleLowerCase();
  }

  return text;
};
