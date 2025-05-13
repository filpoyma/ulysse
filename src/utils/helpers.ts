export const createArrayFromNumberWithId = (number: number) =>
  [...Array(number)].map((_, index) => index + 1);
