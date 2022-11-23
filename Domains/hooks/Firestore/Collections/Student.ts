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
  classID: null | string;
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
  phoneNumber: string;
  subPhoneNumber?: string;
  name?: string;
  enrollments?: string[];
  studioID: string;
  coupons?: ICoupon[];
}

export default class Student extends FirestoreFetcher {
  condition?: QueryConstraint[];
  studentRef: CollectionReference<DocumentData>;
  studentGroupRef: Query<DocumentData>;

  constructor(
    db: Firestore,
    documentId: string,
    condition?: QueryConstraint[]
  ) {
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
    if (this.condition === undefined)
      return new Error("조건을 입력해야 합니다.");

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

  async updateData(
    studentId: string,
    newCoupons: ICoupon[] | ICoupon,
    newEnrollments: IEnrollment[] | IEnrollment,
    couponType = "쿠폰 사용"
  ) {
    if (couponType === "쿠폰 사용") {
      const studentRef = doc(this.db, "student", studentId);
      const tempStudentAll = await this.getStudentAll();

      const { coupons, enrollments }: any =
        !(tempStudentAll instanceof Error) &&
        Array.from(tempStudentAll).filter(
          (student) => student.ID === studentId
        )[0];

      if (!Array.isArray(newCoupons) && !Array.isArray(newEnrollments)) {
        if (coupons.some((coupon: ICoupon) => coupon.isFreePass === true))
          return await updateDoc(studentRef, {
            enrollments: [...enrollments, newEnrollments],
          });

        const noneClassIdCoupons = [...coupons].filter(
          (coupon) => !coupon.classID
        );
        const haveClassIdCoupons = [...coupons].filter(
          (coupon) => coupon.classID
        );

        const sortedCoupons = [...noneClassIdCoupons]
          .filter((coupon) => !coupon.classID)
          .sort((a, b) => b.expiredDate - a.expiredDate);
        Array.isArray(sortedCoupons) &&
          sortedCoupons.length !== 0 &&
          (sortedCoupons[0].classID = newEnrollments.classID);

        await updateDoc(studentRef, {
          coupons: [...haveClassIdCoupons, ...sortedCoupons],
          enrollments: [...enrollments, newEnrollments],
        });
        return "Done";
      }
    } else {
      const studentRef = doc(this.db, "student", studentId);
      const tempStudentAll = await this.getStudentAll();
      const parseCoupon = parseInt(couponType);

      const { coupons, enrollments }: any =
        !(tempStudentAll instanceof Error) &&
        Array.from(tempStudentAll).filter(
          (student) => student.ID === studentId
        )[0];

      if (!Array.isArray(newCoupons) && !Array.isArray(newEnrollments)) {
        if (coupons.some((coupon: ICoupon) => coupon.isFreePass === true))
          return await updateDoc(studentRef, {
            enrollments: [...enrollments, newEnrollments],
          });

        if (couponType === "프리패스") {
          const freePassCoupon = { ...newCoupons };
          freePassCoupon.isFreePass = true;
          return await updateDoc(studentRef, {
            enrollments: [...enrollments, newEnrollments],
            coupons: [...coupons, newCoupons],
          });
        }

        const noneClassIdCoupons = [...coupons].filter(
          (coupon) => !coupon.classID
        );
        const haveClassIdCoupons = [...coupons].filter(
          (coupon) => coupon.classID
        );

        const sortedCoupons = [...noneClassIdCoupons]
          .filter((coupon) => !coupon.classID)
          .sort((a, b) => b.expiredDate - a.expiredDate);

        const unusedCoupon = { ...newCoupons };
        unusedCoupon.classID = "";

        await updateDoc(studentRef, {
          coupons: [
            ...sortedCoupons,
            ...haveClassIdCoupons,
            newCoupons,
            ...Array.from({
              length: parseCoupon - 1,
            }).fill(unusedCoupon),
          ],
          enrollments: [...enrollments, newEnrollments],
        });
        return "Done";
      }
    }
  }
}
