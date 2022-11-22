import { firestore } from "../../Domains/firebase";
import { Student } from "../../Domains/hooks/Firestore";

export const getStudent = async (name: string, phone: string) => {
  try {
    const students = await new Student(firestore, "student").fetchData();

    if (!(students instanceof Error)) {
      return students.filter(
        (student) => student.name === name && student.phoneNumber === phone
      );
    }
  } catch (error) {
    console.error(error);
  }
};
