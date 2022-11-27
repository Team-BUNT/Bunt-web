import { firestore } from "../../../Domains/firebase";
import { Studio } from "../../../Domains/hooks/Firestore";

const getAllStudio = async () => {
  try {
    const studios = await new Studio(firestore, "studios").fetchData();

    if (studios instanceof Error || studios.length === 0)
      new Error("DB와 통신할 수 없습니다.");

    if (!(studios instanceof Error)) {
      return studios;
    }
  } catch (error) {
    console.error(error);
  }
};

const handler = async (req: any, res: any) => {
  const requestMethod = req.method;

  const studios = await getAllStudio();

  switch (requestMethod) {
    case "GET":
      return res.status(200).json(studios);
    default:
      break;
  }
};

export default handler;
