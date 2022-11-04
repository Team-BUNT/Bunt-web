import db from "../../../firebase";

import { collection, doc, Firestore, getDoc, getDocs } from "firebase/firestore";
import CustomFirestore from "../AbstractFirestore";

class ImportedData extends CustomFirestore {
  db: Firestore;
  args: string[];

  constructor(db: Firestore, ...args: string[]) {
    super();
    this.db = db;
    this.args = args;
  }

  async fetchData() {
    if (!this.db) return new Error("Firestore 객체가 없습니다.");

    if (this.args.length !== 1 && this.args.length !== 2)
      return new Error("collectionId 혹은 collectionId와 documentId를 인자로 줘야합니다..");

    if (this.args.some((arg) => arg.trim() === "")) return new Error("공백을 인자로 줄 수 없습니다.");

    return this.args.length === 1 ? await this.getDocs() : await this.getDoc();
  }

  async getDocs() {
    const [documentId] = this.args;
    const docRef = collection(db, documentId);
    const querySnapshot = await getDocs(docRef);

    return querySnapshot.docs.map((doc) => ({
      ...doc.data(),
    }));
  }

  async getDoc() {
    const [collectionId, documentId] = this.args;

    const docRef = doc(db, collectionId, documentId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      return new Error("해당 컬렉션의 문서가 없습니다.");
    }
  }
}

export default ImportedData;
