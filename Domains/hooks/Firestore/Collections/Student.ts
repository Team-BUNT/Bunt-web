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
  Timestamp,
  updateDoc,
} from "firebase/firestore";

interface ICoupon {
  studioID: string;
  expiredDate: Date;
  isFreePass: boolean;
  studentID: string;
}

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
    this.studentRef = collection(this.db, "student");
    this.studentGroupRef = collectionGroup(this.db, "student");
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
      return "Done";
    } catch (error) {
      console.error("Error가 발생했습니다. ", error);
    }
  }

  async updateData(studentId: string, newCoupons: ICoupon[] | ICoupon, newEnrollments: IEnrollment[] | IEnrollment) {
    console.log(this.db, studentId);
    const studentRef = doc(this.db, "student", studentId);
    const tempStudentAll = await this.getStudentAll();
    const { coupons, enrollments } = Array.from(tempStudentAll).filter((student) => student.ID === studentId)[0];

    // 쿠폰을 추가하는 형태가 아닌 제거하는 형태
    if (!Array.isArray(newCoupons) && !Array.isArray(newEnrollments)) {
      await updateDoc(studentRef, {
        coupons: [...coupons, newCoupons],
        enrollments: [...enrollments, newEnrollments],
      });
      return "Done";
    }

    if (Array.isArray(newCoupons) && Array.isArray(newEnrollments)) {
      await updateDoc(studentRef, {
        coupons: [...coupons, ...newCoupons],
        enrollments: [...enrollments, ...newEnrollments],
      });
      return "Done";
    }
  }
}
