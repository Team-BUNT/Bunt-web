import FirestoreFetcher from "../FirestoreFetcher";

import {
  collection,
  collectionGroup,
  CollectionReference,
  DocumentData,
  Firestore,
  getDocs,
  Query,
  query,
  QueryConstraint,
} from "firebase/firestore";

export default class Class extends FirestoreFetcher {
  condition?: QueryConstraint[];
  classRef: CollectionReference<DocumentData>;
  classGroupRef: Query<DocumentData>;

  constructor(db: Firestore, documentId: string, condition?: QueryConstraint[]) {
    super(db, documentId);
    this.condition = condition;
    this.classRef = collection(this.db, "classes");
    this.classGroupRef = collectionGroup(this.db, "classes");
  }

  async fetchData() {
    if (!this.db) return new Error("Firestore 객체가 없습니다.");

    if (this.documentId === undefined || this.documentId.trim() === "")
      return new Error("documentId를 인자로 줘야합니다.");

    return this.condition !== undefined && this.condition.length !== 0
      ? await this.getclasses()
      : await this.getclassAll();
  }

  async getclassAll() {
    const querySnapshot = await getDocs(this.classRef);

    return querySnapshot.docs.map((doc) => ({
      ...doc.data(),
    }));
  }

  async getclasses() {
    if (this.condition === undefined) return new Error("조건을 입력해야 합니다.");

    const classesRef = query(this.classGroupRef, ...this.condition);
    const querySnapshot = await getDocs(classesRef);

    return querySnapshot.docs.map((doc) => ({
      ...doc.data(),
    }));
  }
}
