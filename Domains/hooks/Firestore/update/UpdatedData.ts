import FirestoreFetcher from "../FirestoreFetcher";

import { Firestore } from "firebase/firestore";

class UpdatedData extends FirestoreFetcher {
  constructor(db: Firestore, ...args: string[]) {
    super(db, ...args);
  }
}

export default UpdatedData;
