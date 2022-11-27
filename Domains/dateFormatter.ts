export const dateFormatter = (classDate: Date, delimiter = " / ") => {
  const year = classDate.getFullYear();
  const month = String(classDate.getMonth() + 1).padStart(2, "0");
  const day = String(classDate.getDate()).padStart(2, "0");

  return [year, month, day].join(delimiter);
};
