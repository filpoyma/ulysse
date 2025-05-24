export const createArrayFromNumberWithId = (number: number) =>
  [...Array(number)].map((_, index) => index + 1);

// const [items, setItems] = useState(['a', 'b', 'c']);
//
// const swapItems = (i, j) => {
//     setItems((prev) => {
//         const newItems = [...prev];
//         [newItems[i], newItems[j]] = [newItems[j], newItems[i]];
//         return newItems;
//     });
// };

export const copyToClipboard = (text: string) => {
  if (text && typeof text === 'string') navigator.clipboard.writeText(text).catch(console.error);
};
