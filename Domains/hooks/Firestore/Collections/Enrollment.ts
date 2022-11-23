import FirestoreFetcher from "../FirestoreFetcher";

import {
  addDoc,
  collection,
  collectionGroup,
  CollectionReference,
  doc,
  DocumentData,
  Firestore,
  getDocs,
  Query,
  query,
  QueryConstraint,
  setDoc,
  Timestamp,
} from "firebase/firestore";

interface IEnrollment {
  ID: string;
  classID: string;
  userName?: string;
  phoneNumber?: string;
  enrolledDate?: Date;
  paid?: Boolean;
  paymentType?: string;
  attendance?: Boolean;
  info?: string;
  studioID?: string;
}

export default class Enrollment extends FirestoreFetcher {
  condition?: QueryConstraint[];
  enrollmentRef: CollectionReference<DocumentData>;
  enrollmentGroupRef: Query<DocumentData>;

  constructor(
    db: Firestore,
    documentId: string,
    condition?: QueryConstraint[]
  ) {
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

  private async getEnrollmentAll() {
    const querySnapshot = await getDocs(this.enrollmentRef);

    if (querySnapshot.empty) return new Error("값이 없습니다.");

    return querySnapshot.docs.map((doc) => ({
      ...doc.data(),
    }));
  }

  private async getEnrollments() {
    if (this.condition === undefined)
      return new Error("조건을 입력해야 합니다.");

    const enrollmentsRef = query(this.enrollmentGroupRef, ...this.condition);
    const querySnapshot = await getDocs(enrollmentsRef);

    if (querySnapshot.empty) return new Error("값이 없습니다.");

    return querySnapshot.docs.map((doc) => ({
      ...doc.data(),
    }));
  }

  async addData(data: IEnrollment) {
    try {
      const enrollmentDocRef = doc(this.db, "enrollment", data.ID);

      await setDoc(enrollmentDocRef, data);
    } catch (error) {
      console.error("Error가 발생했습니다. ", error);
    }
  }
}
