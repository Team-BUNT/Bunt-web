import { Firestore } from "firebase/firestore";

class FirestoreFetcher {
  db: Firestore;
  documentId: string;

  constructor(db: Firestore, documentId: string) {
    this.db = db;
    this.documentId = documentId;
  }
}

export default FirestoreFetcher;
