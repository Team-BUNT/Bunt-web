import { where } from "firebase/firestore";
import { firestore } from "../../../Domains/firebase";
import { Student } from "../../../Domains/hooks/Firestore";

interface IStudent {
  classId: string;
  studioId: string;
  studentId: string;
  studentName: string;
  studentPhone: string;
}

const updateStudent = async ({
  classId,
  studioId,
  studentId,
  studentName,
  studentPhone,
}: IStudent) => {
  try {
    await new Student(
      firestore,
      "student",
      where("phoneNumber", "==", studentPhone)
    ).updateData(
      studentId,
      {
        classID: classId,
        studioID: studioId,
        expiredDate: new Date(new Date().setDate(new Date().getDate() + 30)),
        isFreePass: false,
        studentID: studentId,
      },
      {
        ID: `${classId} ${studentPhone}`,
        attendance: false,
        classID: classId,
        enrolledDate: new Date(),
        info: "",
        paid: true,
        paymentType: "쿠폰 사용",
        phoneNumber: studentPhone,
        studioID: studioId,
        userName: studentName,
      }
    );
  } catch (error) {
    console.error(error);
  }
};

const handler = async (req: any, res: any) => {
  const requestMethod = req.method;

  switch (requestMethod) {
    case "POST":
      return res.status(200).json(await updateStudent(req.body));
    default:
      break;
  }
};

export default handler;
