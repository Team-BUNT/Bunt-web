import { DocumentData } from "firebase/firestore";

import moment from "moment";
import "moment/locale/ko";

//TODO: Time 객체로 리팩토링
const timeChecker = (danceClass: DocumentData) => {
  const today = {
    month: moment().month() + 1,
    day: moment().date(),
    endOfDay: moment().daysInMonth(),
  };

  const afterSevenDays = {
    month: moment().add(7, "days").month() + 1,
    day: moment().add(7, "days").date(),
    endOfDay: moment().add(7, "days").daysInMonth(),
  };

  const classDate = {
    month: moment(danceClass.date.toDate()).month() + 1,
    day: moment(danceClass.date.toDate()).date(),
    endOfDay: moment(danceClass.date.toDate()).daysInMonth(),
  };

  return true;
};

const timeFormatter = (datas: DocumentData[]) => {
  return [...datas].map((data: any) => {
    const { instructorName } = data;
    const classTime = moment(data.date.toDate()).format("MM월 DD일 (ddd) HH:mm");

    return {
      classID: data.ID,
      classTime: classTime,
      instructorName: instructorName,
    };
  });
};

export default timeFormatter;
