import { DocumentData, orderBy, where } from "firebase/firestore";

import moment from "moment";
import "moment/locale/ko";

//TODO: Time 객체로 리팩토링
const timeChecker = () => {};

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
