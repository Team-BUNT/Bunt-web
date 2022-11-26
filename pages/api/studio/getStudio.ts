import { where } from "firebase/firestore";
import { firestore } from "../../../Domains/firebase";
import { Studio } from "../../../Domains/hooks/Firestore";

const getStudio = async (name: string) => {
  try {
    const matchedStudio: any = await new Studio(
      firestore,
      "studios",
      where("name", "==", name)
    ).fetchData();

    if (Array.isArray(matchedStudio) && matchedStudio.length === 0)
      new Error("매칭된 스튜디오가 없습니다.");

    return matchedStudio[0];
  } catch (error) {
    console.error(error);
  }
};

const handler = async (req: any, res: any) => {
  const requestMethod = req.method;

  const { studioName }: { studioName: string } = req.body;

  switch (requestMethod) {
    case "POST":
      return res.status(200).json(await getStudio(studioName));
    default:
      break;
  }
};

export default handler;
