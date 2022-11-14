import { getDownloadURL, ref } from "firebase/storage";
import { firestorage, firestore } from "../../Domains/firebase";
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

export const getAllStudioBannerImageURL = async (studioNames: string[]) => {
  try {
    const array = Promise.all(
      [...studioNames].map(async (studioName) => {
        const url = await getDownloadURL(ref(firestorage, `/studios/banner/${studioName}.png`));
        return url;
      })
    );

    return array;
  } catch (error) {
    console.error(error);
  }
};
