export const formatToLocalDate = (date: string) => {
  const localDate = new Date(date).toLocaleDateString();
  return localDate;
};
