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

export default class Student extends FirestoreFetcher {
  condition?: QueryConstraint[];
  studentRef: CollectionReference<DocumentData>;
  studentGroupRef: Query<DocumentData>;

  constructor(db: Firestore, documentId: string, condition?: QueryConstraint[]) {
    super(db, documentId);
    this.condition = condition;
    this.studentRef = collection(this.db, "students");
    this.studentGroupRef = collectionGroup(this.db, "students");
  }

  async fetchData() {
    if (!this.db) return new Error("Firestore 객체가 없습니다.");

    if (this.documentId === undefined || this.documentId.trim() === "")
      return new Error("documentId를 인자로 줘야합니다.");

    return this.condition !== undefined && this.condition.length !== 0
      ? await this.getStudents()
      : await this.getStudentAll();
  }

  async getStudentAll() {
    const querySnapshot = await getDocs(this.studentRef);

    return querySnapshot.docs.map((doc) => ({
      ...doc.data(),
    }));
  }

  async getStudents() {
    if (this.condition === undefined) return new Error("조건을 입력해야 합니다.");

    const studentsRef = query(this.studentGroupRef, ...this.condition);
    const querySnapshot = await getDocs(studentsRef);

    return querySnapshot.docs.map((doc) => ({
      ...doc.data(),
    }));
  }
}
