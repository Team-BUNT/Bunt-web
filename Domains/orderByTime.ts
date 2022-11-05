interface IHall {
  name: string;
  capacity: number;
}

interface IClass {
  ID: string;
  studioID?: string;
  title?: string;
  instructorName?: string;
  date: string;
  durationMinute?: number;
  applicantsCount?: number;
  hall?: IHall;
  isPopUp?: boolean;
}

const orderByTime = (classes: IClass[]) => {
  let sortedByValueAsc = classes.sort((a, b) => {
    if (Number(a?.date.split(" ")[0].slice(0, 2)) < Number(b?.date.split(" ")[0].slice(0, 2))) {
      return 1;
    } else if (Number(a?.date.split(" ")[0].slice(0, 2)) > Number(b?.date.split(" ")[0].slice(0, 2))) {
      return -1;
    } else {
      return Number(a?.date.split(" ")[1].slice(0, 2)) > Number(b?.date.split(" ")[1].slice(0, 2)) ? 1 : -1;
    }
  });

  return sortedByValueAsc;
};

export { orderByTime };
