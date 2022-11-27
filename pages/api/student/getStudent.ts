import { where } from "firebase/firestore";
import { firestore } from "../../../Domains/firebase";
import { Student } from "../../../Domains/hooks/Firestore";

const getStudent = async (phone: string) => {
  try {
    const matchedStudent: any = await new Student(
      firestore,
      "student",
      where("phoneNumber", "==", phone)
    ).fetchData();

    if (Array.isArray(matchedStudent) && matchedStudent.length === 0)
      new Error("매칭된 수강생이 없습니다.");

    return matchedStudent[0];
  } catch (error) {
    console.error(error);
  }
};

const handler = async (req: any, res: any) => {
  const requestMethod = req.method;

  const { phone }: { phone: string } = req.body;

  switch (requestMethod) {
    case "POST":
      return res.status(200).json(await getStudent(phone));
    default:
      break;
  }
};

export default handler;
