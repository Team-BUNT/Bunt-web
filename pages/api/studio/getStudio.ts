import { where } from "firebase/firestore";
import { firestore } from "../../../Domains/firebase";
import { Studio } from "../../../Domains/hooks/Firestore";

const getStudio = async (name: string) => {
  console.log(name);
  try {
    const studios = await new Studio(
      firestore,
      "studios",
      where("name", "==", name)
    ).fetchData();

    if (studios instanceof Error || studios.length === 0)
      new Error("DB와 통신할 수 없습니다.");

    if (!(studios instanceof Error)) {
      const matchStudio = [...studios].filter(
        (aStudio) => aStudio.name === name
      );

      return matchStudio.length === 0
        ? new Error("일치하는 스튜디오가 없습니다.")
        : matchStudio[0];
    }
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
