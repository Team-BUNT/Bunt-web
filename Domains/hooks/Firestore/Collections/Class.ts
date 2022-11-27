import FirestoreFetcher from "../FirestoreFetcher";

import {
  addDoc,
  collection,
  collectionGroup,
  CollectionReference,
  doc,
  DocumentData,
  Firestore,
  getDoc,
  getDocs,
  Query,
  query,
  QueryConstraint,
  Timestamp,
  where,
} from "firebase/firestore";

interface IHall {
  name: string;
  capacity: number;
}
interface IClass {
  ID: string;
  studioId: string;
  title?: string;
  instructorName?: string;
  date?: Timestamp;
  durationMinute?: number;
  applicantsCount?: number;
  hall?: IHall;
  isPopUp?: boolean;
}

export default class Class extends FirestoreFetcher {
  condition?: QueryConstraint[] | string;
  classRef: CollectionReference<DocumentData>;
  classGroupRef: Query<DocumentData>;

  constructor(
    db: Firestore,
    documentId: string,
    condition?: QueryConstraint[] | string
  ) {
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

  private async getclassAll() {
    const querySnapshot = await getDocs(this.classRef);

    return !querySnapshot.empty
      ? querySnapshot.docs.map((doc) => ({
          ...doc.data(),
        }))
      : new Error("값이 없습니다.");
  }

  private async getclasses() {
    if (this.condition === undefined)
      return new Error("조건을 입력해야 합니다.");

    if (typeof this.condition === "string") {
      const classRef = doc(this.db, "classes", this.condition);
      const docSnap = await getDoc(classRef);
      if (!docSnap.exists()) new Error("동일한 id값을 가진 class가 없습니다.");

      return docSnap.data();
    }

    if (Array.isArray(this.condition)) {
      const classesRef = query(this.classGroupRef, ...this.condition);

      const querySnapshot = await getDocs(classesRef);

      if (querySnapshot.empty) return new Error("값이 없습니다.");

      return querySnapshot.docs.map((doc) => ({
        ...doc.data(),
      }));
    }
  }

  async addData(data: IClass) {
    try {
      await addDoc(this.classRef, data);
    } catch (error) {
      console.error("Error가 발생했습니다. ", error);
    }
  }
}
