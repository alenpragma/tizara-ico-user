// convart date to day for  Received	Remaining field
export const getPasDay = (dateString: string) => {
  // Convert the provided date string to a Date object
  const providedDate = new Date(dateString);

  const currentDate = new Date();
  // Calculate the difference in milliseconds
  const differenceMs = currentDate.getTime() - providedDate.getTime();
  // Convert milliseconds to days
  const differenceDays = Math.floor(differenceMs / (1000 * 60 * 60 * 24));
  return differenceDays;
};
