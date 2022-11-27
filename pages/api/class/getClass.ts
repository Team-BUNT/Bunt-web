import { QueryConstraint, where } from "firebase/firestore";
import { firestore } from "../../../Domains/firebase";
import { Class } from "../../../Domains/hooks/Firestore";

const getClass = async (ID: string) => {
  try {
    const matchedClass = await new Class(firestore, "classes", ID).fetchData();

    if (Array.isArray(matchedClass) && matchedClass.length === 0)
      new Error("매칭된 클래스가 없습니다.");

    return matchedClass;
  } catch (error) {
    console.error(error);
  }
};

const handler = async (req: any, res: any) => {
  const requestMethod = req.method;

  const { ID }: { ID: string; range: QueryConstraint[] | string } = req.body;

  switch (requestMethod) {
    case "POST":
      return res.status(200).json(await getClass(ID));
    default:
      break;
  }
};

export default handler;
