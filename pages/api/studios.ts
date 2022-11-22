import { firestore } from "../../Domains/firebase";
import { Studio } from "../../Domains/hooks/Firestore";

export const getStudio = async (studio: string) => {
  try {
    const allStudio = await new Studio(firestore, "studios").fetchData();

    if (!(allStudio instanceof Error)) {
      return [...allStudio].filter((aStudio) => aStudio.name === studio);
    }
  } catch (error) {
    console.error(error);
  }
};

export const getAllStudios = async () => {
  try {
    const allStudio = await new Studio(firestore, "studios").fetchData();

    if (!(allStudio instanceof Error)) {
      return allStudio.map((aStudio) => aStudio.name);
    }
  } catch (error) {
    console.error(error);
  }
};
