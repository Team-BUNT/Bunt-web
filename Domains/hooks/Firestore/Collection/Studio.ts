import { Firestore } from "firebase/firestore";
import FirestoreFetcher from "../FirestoreFetcher";

export default class Studio extends FirestoreFetcher {
  constructor(db: Firestore, ...args: string[]) {
    super(db, ...args);
  }
}
