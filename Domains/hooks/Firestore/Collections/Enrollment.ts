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

export default class Enrollment extends FirestoreFetcher {
  condition?: QueryConstraint[];
  enrollmentRef: CollectionReference<DocumentData>;
  enrollmentGroupRef: Query<DocumentData>;

  constructor(db: Firestore, documentId: string, condition?: QueryConstraint[]) {
    super(db, documentId);
    this.condition = condition;
    this.enrollmentRef = collection(this.db, "enrollment");
    this.enrollmentGroupRef = collectionGroup(this.db, "enrollment");
  }

  async fetchData() {
    if (!this.db) return new Error("Firestore 객체가 없습니다.");

    if (this.documentId === undefined || this.documentId.trim() === "")
      return new Error("documentId를 인자로 줘야합니다.");

    return this.condition !== undefined && this.condition.length !== 0
      ? await this.getEnrollments()
      : await this.getEnrollmentAll();
  }

  async getEnrollmentAll() {
    const querySnapshot = await getDocs(this.enrollmentRef);

    return querySnapshot.docs.map((doc) => ({
      ...doc.data(),
    }));
  }

  async getEnrollments() {
    if (this.condition === undefined) return new Error("조건을 입력해야 합니다.");

    const enrollmentsRef = query(this.enrollmentGroupRef, ...this.condition);
    const querySnapshot = await getDocs(enrollmentsRef);

    return querySnapshot.docs.map((doc) => ({
      ...doc.data(),
    }));
  }
}
