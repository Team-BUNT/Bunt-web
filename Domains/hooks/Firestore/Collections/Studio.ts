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

export default class Studio extends FirestoreFetcher {
  condition?: QueryConstraint[];
  studioRef: CollectionReference<DocumentData>;
  studioGroupRef: Query<DocumentData>;

  constructor(db: Firestore, documentId: string, condition?: QueryConstraint[]) {
    super(db, documentId);
    this.condition = condition;
    this.studioRef = collection(this.db, "studios");
    this.studioGroupRef = collectionGroup(this.db, "studios");
  }

  async fetchData() {
    if (!this.db) return new Error("Firestore 객체가 없습니다.");

    if (this.documentId === undefined || this.documentId.trim() === "")
      return new Error("documentId를 인자로 줘야합니다.");

    return this.condition !== undefined && this.condition.length !== 0
      ? await this.getStudios()
      : await this.getStudioAll();
  }

  async getStudioAll() {
    const querySnapshot = await getDocs(this.studioRef);

    return querySnapshot.docs.map((doc) => ({
      ...doc.data(),
    }));
  }

  async getStudios() {
    if (this.condition === undefined) return new Error("조건을 입력해야 합니다.");

    const studiosRef = query(this.studioGroupRef, ...this.condition);
    const querySnapshot = await getDocs(studiosRef);

    return querySnapshot.docs.map((doc) => ({
      ...doc.data(),
    }));
  }
}
