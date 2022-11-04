import CustomFirestore from "../AbstractFirestore";

import { Firestore } from "firebase/firestore";

class FilteredData extends CustomFirestore {
  db: Firestore;
  args: string[];

  constructor(db: Firestore, ...args: string[]) {
    super();
    this.db = db;
    this.args = args;
  }

  async fetchData() {
    if (!db) return new Error("Firestore 객체가 없습니다.");

    if (this.args.length !== 1 && this.args.length !== 2)
      return new Error("collectionId 혹은 collectionId와 documentId를 인자로 줘야합니다..");

    if (this.args.some((arg) => arg.trim() === "")) return new Error("공백을 인자로 줄 수 없습니다.");

    return this.args.length === 1 ? await this.getDocs() : await this.getDoc();
  }

  async getDocs() {}

  async getDoc() {}
}

export default FilteredData;
