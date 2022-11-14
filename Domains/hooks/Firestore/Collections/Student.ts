import FirestoreFetcher from "../FirestoreFetcher";

import {
  addDoc,
  collection,
  collectionGroup,
  CollectionReference,
  DocumentData,
  Firestore,
  getDocs,
  Query,
  query,
  QueryConstraint,
  Timestamp,
} from "firebase/firestore";

interface ICoupon {
  studioId: string;
  expiredDate: Timestamp;
}

interface IStudent {
  ID: string;
  subPhoneNumber?: string;
  name?: string;
  enrollments?: string[];
  coupons?: ICoupon[];
}

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

  private async getStudentAll() {
    const querySnapshot = await getDocs(this.studentRef);

    if (querySnapshot.empty) return new Error("값이 없습니다.");

    return querySnapshot.docs.map((doc) => ({
      ...doc.data(),
    }));
  }

  private async getStudents() {
    if (this.condition === undefined) return new Error("조건을 입력해야 합니다.");

    const studentsRef = query(this.studentGroupRef, ...this.condition);
    const querySnapshot = await getDocs(studentsRef);

    if (querySnapshot.empty) return new Error("값이 없습니다.");

    return querySnapshot.docs.map((doc) => ({
      ...doc.data(),
    }));
  }

  async addData(data: IStudent) {
    try {
      await addDoc(this.studentRef, data);
    } catch (error) {
      console.error("Error가 발생했습니다. ", error);
    }
  }
}
