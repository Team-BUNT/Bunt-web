import { Firestore } from "firebase/firestore";
import FirestoreFetcher from "../FirestoreFetcher";

export default class Enrollment extends FirestoreFetcher {
  constructor(db: Firestore, ...args: string[]) {
    super(db, ...args);
  }
}
