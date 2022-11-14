import { firestore } from "../../Domains/firebase";
import { Class } from "../../Domains/hooks/Firestore";

export const getClass = async (studioId: string) => {
  try {
    const allClass = await new Class(firestore, "classes").fetchData();

    if (!(allClass instanceof Error)) {
      return [...allClass].filter((aClass) => aClass.studioID === studioId);
    }
  } catch (error) {
    console.error(error);
  }
};
