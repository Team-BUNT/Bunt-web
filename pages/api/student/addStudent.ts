import { firestore } from "../../../Domains/firebase";
import { Student } from "../../../Domains/hooks/Firestore";

interface IStudent {
  studioId: string;
  studentPhone: string;
  studentName: string;
}

const addStudent = async ({
  studioId,
  studentPhone,
  studentName,
}: IStudent) => {
  try {
    const result = await new Student(firestore, "student").addData({
      ID: `${studioId} ${studentPhone}`,
      coupons: [],
      enrollments: [],
      name: studentName,
      phoneNumber: studentPhone,
      studioID: studioId,
      subPhoneNumber: "",
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
      return res.status(200).json(await addStudent(req.body));
    default:
      break;
  }
};

export default handler;
