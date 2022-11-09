export const dayFormatter = (date: Date, index: number) => {
  if (index === 0) return "오늘";
  if (index === 1) return "내일";

  switch (date.getDay()) {
    case 0:
      return "일";
    case 1:
      return "월";
    case 2:
      return "화";
    case 3:
      return "수";
    case 4:
      return "목";
    case 5:
      return "금";
    case 6:
      return "토";
  }
};
