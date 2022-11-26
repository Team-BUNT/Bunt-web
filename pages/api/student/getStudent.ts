import { firestore } from "../../../Domains/firebase";
import { Student } from "../../../Domains/hooks/Firestore";

const getStudent = async (name: string, phone: string) => {
  try {
    const students = await new Student(firestore, "student").fetchData();

    if (students instanceof Error || students.length === 0)
      new Error("DB와 통신할 수 없습니다.");

    if (!(students instanceof Error)) {
      const matcedStudent = students.filter(
        (student) => student.name === name && student.phoneNumber === phone
      );

      return matcedStudent.length === 0
        ? new Error("일치하는 수강생이 없습니다.")
        : matcedStudent[0];
    }
  } catch (error) {
    console.error(error);
  }
};

const handler = (req: any, res: any) => {
  const requestMethod = req.method;

  const { name, phone }: { name: string; phone: string } = req.body;

  switch (requestMethod) {
    case "POST":
      return res.status(200).json(getStudent(name, phone));
    default:
      break;
  }
};

export default handler;
