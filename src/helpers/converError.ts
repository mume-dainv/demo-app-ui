export const convertError = (dataError: Record<string, string[]>, key: string[]) => {
  const result: Record<string, string> = {};
  key.forEach((k) => {
    if (dataError?.[k]) {
      result[k] = dataError[k][0];
    }
  });

  return result;
};
