import CustomFirestore from "../FirestoreFetcher";

import { Firestore } from "firebase/firestore";

class AddedData extends CustomFirestore {
  constructor(db: Firestore, ...args: string[]) {
    super(db, ...args);
  }
}

export default AddedData;
