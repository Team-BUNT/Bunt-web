import { firestore } from "../../../Domains/firebase";
import { Enrollment } from "../../../Domains/hooks/Firestore";

interface IStudent {
  classId: string;
  studioId: string;
  studentPhone: string;
  studentName: string;
}

const addEnrollment = async ({
  classId,
  studioId,
  studentPhone,
  studentName,
}: IStudent) => {
  try {
    const result = await new Enrollment(firestore, "enrollment").addData({
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
    });

    return result;
  } catch (error) {
    console.error(error);
  }
};

const handler = async (req: any, res: any) => {
  const requestMethod = req.method;

  switch (requestMethod) {
    case "POST":
      return res.status(200).json(await addEnrollment(req.body));
    default:
      break;
  }
};

export default handler;
