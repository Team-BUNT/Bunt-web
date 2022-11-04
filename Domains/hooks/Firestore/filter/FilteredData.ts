import CustomFirestore from "../FirestoreFetcher";

import { Firestore, limit, orderBy, query, where } from "firebase/firestore";

class FilteredData extends CustomFirestore {
  db: Firestore;
  args: string[];

  constructor(db: Firestore, ...args: string[]) {
    super();
    this.db = db;
    this.args = args;
  }

  async fetchData() {}
}

export default FilteredData;
