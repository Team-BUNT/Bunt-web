import { QueryConstraint } from "firebase/firestore";
import { firestore } from "../../../Domains/firebase";
import { Class } from "../../../Domains/hooks/Firestore";

const getClass = async (studioId: string, range: QueryConstraint[] = []) => {
  try {
    if (range.length === 0) {
      const matchedClass = await new Class(firestore, "classes").fetchData();

      if (Array.isArray(matchedClass) && matchedClass.length === 0)
        new Error("매칭된 클래스가 없습니다.");

      return matchedClass;
    }

    const matchedClass = await new Class(
      firestore,
      "classes",
      range
    ).fetchData();

    if (Array.isArray(matchedClass) && matchedClass.length === 0)
      new Error("매칭된 클래스가 없습니다.");

    return matchedClass;
  } catch (error) {
    console.error(error);
  }
};

const handler = async (req: any, res: any) => {
  const requestMethod = req.method;

  const { studioId, range }: { studioId: string; range: QueryConstraint[] } =
    req.body;

  switch (requestMethod) {
    case "POST":
      return res.status(200).json(await getClass(studioId, range));
    default:
      break;
  }
};

export default handler;
