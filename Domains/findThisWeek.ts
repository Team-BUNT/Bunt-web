export const findThisWeek = () => {
  return Array.from({ length: 7 })
    .fill(new Date(new Date().setDate(new Date().getDate() - 1)))
    .map((dayNext: any) => new Date(dayNext.setDate(dayNext.getDate() + 1)));
};
