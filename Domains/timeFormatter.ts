import { DocumentData } from "firebase/firestore";

import moment from "moment";
import "moment/locale/ko";

//TODO: Time 객체로 리팩토링
const timeChecker = (classDate: moment.Moment) => {
  const now = new Date();
  const addSevenDays = new Date(new Date().setDate(now.getDate() + 7));

  /** new Date()
   * getMonth: 1월: 0, 2월: 1
   * getDay: 일요일: 0, 월요일: 1
   */
  const today = {
    year: now.getFullYear(),
    month: now.getMonth() + 1,
    date: now.getDate(),
    day: now.getDay(),
  };

  const sevenDaysAfter = {
    year: addSevenDays.getFullYear(),
    month: addSevenDays.getMonth() + 1,
    date: addSevenDays.getDate(),
    day: addSevenDays.getDay(),
  };

  if (today.month === sevenDaysAfter.month) {
    if (classDate.date() >= today.date && classDate.date() <= sevenDaysAfter.date) {
      return true;
    }
  } else if (today.month + 1 === sevenDaysAfter.month) {
    if (1 <= classDate.date() && classDate.date() <= sevenDaysAfter.date) {
      return true;
    }
  } else {
    return false;
  }

  // console.log(classDate.year(), classDate.month() + 1, classDate.date(), classDate.day());
  //MEMO: 해 넘어갈 때의 로직 추가
};

const timeFormatter = (datas: DocumentData[]) => {
  return [...datas].map((data) => {
    const { instructorName } = data;
    const classTime = moment(data.date.toDate()).format("MM월 DD일 (ddd) HH:mm");

    const classDate = moment(data.date.toDate());

    if (!timeChecker(classDate)) return undefined;

    return {
      classID: data.ID,
      classTime: classTime,
      instructorName: instructorName,
    };
  });
};

export { timeFormatter, timeChecker };
