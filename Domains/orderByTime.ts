const orderByTime = (classArray: ({ classID: any; classTime: string; instructorName: any } | undefined)[]) => {
  let sortedByValueAsc = classArray.sort((a, b) => {
    if (Number(a?.classTime.split(" ")[0].slice(0, 2)) < Number(b?.classTime.split(" ")[0].slice(0, 2))) {
      return 1;
    } else if (Number(a?.classTime.split(" ")[0].slice(0, 2)) > Number(b?.classTime.split(" ")[0].slice(0, 2))) {
      return -1;
    } else {
      return Number(a?.classTime.split(" ")[1].slice(0, 2)) > Number(b?.classTime.split(" ")[1].slice(0, 2)) ? 1 : -1;
    }
  });

  return sortedByValueAsc;
};

export { orderByTime };
