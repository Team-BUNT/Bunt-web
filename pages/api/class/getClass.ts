import { firestore } from "../../../Domains/firebase";
import { Class } from "../../../Domains/hooks/Firestore";

const getClass = async (studioId: string) => {
  try {
    const classes = await new Class(firestore, "classes").fetchData();

    if (classes instanceof Error || classes.length === 0)
      new Error("DB와 통신할 수 없습니다.");

    if (!(classes instanceof Error)) {
      const matchClass = [...classes].filter(
        (aClass) => aClass.studioID === studioId
      );

      return matchClass.length === 0
        ? new Error("일치하는 스튜디오가 없습니다.")
        : matchClass[0];
    }
  } catch (error) {
    console.error(error);
  }
};

const handler = (req: any, res: any) => {
  const requestMethod = req.method;

  const { studioId }: { studioId: string } = req.body;

  switch (requestMethod) {
    case "POST":
      return res.status(200).json(getClass(studioId));
    default:
      break;
  }
};

export default handler;
