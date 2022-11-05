import FirestoreFetcher from "../FirestoreFetcher";

import { Firestore } from "firebase/firestore";

export default class Class extends FirestoreFetcher {
  constructor(db: Firestore, documentId: string) {
    super(db, documentId);
  }
}
