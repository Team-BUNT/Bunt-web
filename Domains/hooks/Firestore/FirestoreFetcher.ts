import { Firestore } from "firebase/firestore";

class FirestoreFetcher {
  db: Firestore;
  args: string[];

  constructor(db: Firestore, ...args: string[]) {
    this.db = db;
    this.args = args;
  }
}

export default FirestoreFetcher;
