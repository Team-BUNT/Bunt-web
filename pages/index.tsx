import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useForm } from "react-hook-form";
import type { UseFormRegisterReturn } from "react-hook-form";

import firebase from "firebase/compat/app";
import { FirebaseApp, initializeApp } from "firebase/app";
import {
  Firestore,
  addDoc,
  getFirestore,
  collection,
  getDocs,
  DocumentReference,
} from "firebase/firestore";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";

import moment from "moment";
import "moment/locale/ko";

import styles from "../styles/Home.module.css";
import BuntImage from "public/buntLogo.png";
import DanceClass from "./components/DanceClass";
import { useEffect, useState } from "react";

interface IClass {
  instructorName: string;
  classTime: string;
  classID: string;
}

interface IEnrollment {
  name: string;
  phone: string;
}

const Home: NextPage = () => {
  // Firebase

  const [enrollment, setEnrollment] = useState<IClass[]>([]);
  const datas: IClass[] = [];

  const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_MERASUREMENT_ID,
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  useEffect(() => {
    // const classList = enrollment.map((v) => (
    //   // eslint-disable-next-line react/jsx-key
    //   <DanceClass
    //     key={v.classID}
    //     classTime={v.classTime}
    //     instructorName={v.instructorName}
    //   />
    // ));

    const higgsClasses = async (db: Firestore) => {
      const danceClasses = collection(db, "classes");
      const classSnapshot = await getDocs(danceClasses);
      const classList = classSnapshot.docs.map((doc) => doc.data());
      const higgsStudioClass = classList.filter(
        (aClass) => aClass.studioID === process.env.NEXT_PUBLIC_STUDIO_ID
      );

      return higgsStudioClass;
    };

    higgsClasses(db).then((value) => {
      value.map((e) => {
        const numberParseDay = Number(moment(e.date.toDate()).format("DD"));
        const { instructorName } = e;
        if (numberParseDay >= 17 && numberParseDay <= 23) {
          const classTime = moment(e.date.toDate()).format(
            "MM월 DD일 (ddd) HH:mm"
          );

          datas.push({ classID: e.ID, classTime, instructorName });
        }
      });

      let sortClass = datas.sort(
        (a, b) =>
          a.instructorName[0].charCodeAt(0) - b.instructorName[0].charCodeAt(0)
      );

      setEnrollment(sortClass);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //TODO: Register DanceClass에 상속
  const { register, handleSubmit } = useForm();

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <section className={styles.header}>
          <h1> BUNT STUDIO 사전 신청 </h1>
          <h2> 신청 안내</h2>
          <div className={styles.description}>
            <div>카드결제시 현장에서 가능합니다.</div>
            <div>
              사전신청 후 안내 문자로 정확한 가격 안내 해드리고 있습니다. 10/17
              ~ 10/23 까지의 수업 사전 신청서입니다.
            </div>
          </div>

          <Image
            src={BuntImage}
            alt="Bunt logo image"
            width={350}
            height={197}
            objectFit="cover"
          ></Image>
        </section>
        <form
          className={styles.chooseClass}
          onSubmit={handleSubmit(async (data) => {
            const classesId = Object.keys(data)
              .splice(4)
              .filter((el) => data[el] === true)[0];

            try {
              const docRef = await addDoc(collection(db, "enrollment"), {
                enrolledDate: moment().format(),
                userName: data.name,
                phoneNumber: data.phone,
              });
              console.log("Document written with ID: ", docRef.id);
            } catch (error) {
              console.log(error);
            }

            alert(`${data.name}님  수강신청 완료했습니다 !!`);
          })}
          method="post"
        >
          <section className={styles.formField}>
            <h2>클래스 선택</h2>
            <>
              {enrollment.map((aClass) => (
                <>
                  <div className={styles.classSelectForm}>
                    <div className={styles.classSelectCheckBox}>
                      <label className={styles.checkBoxContainer}>
                        <input type="checkbox" {...register(aClass.classID)} />
                        <span className={styles.checkmark}></span>
                      </label>
                      <span>{aClass.classTime}</span>
                    </div>
                    <div className={styles.formDetail}>
                      {aClass.instructorName}
                    </div>
                  </div>
                </>
              ))}
            </>
          </section>
          <section className={styles.classSelectStudentInfo}>
            <h2>이름 (입금자명) </h2>
            <input
              type="text"
              id=""
              placeholder="ex. 김민수(김민수)"
              {...register("name")}
            />
          </section>
          <section className={styles.classSelectStudentInfo}>
            <h2>연락처</h2>
            <input
              type="text"
              id=""
              placeholder="01050946369"
              {...register("phone")}
            />
          </section>
          <section className={styles.formField}>
            <div className={styles.chooseClass}>
              <h2>쿠폰</h2>
              <div className={styles.classSelectForm}>
                <div className={styles.classSelectCheckBox}>
                  <label className={styles.checkBoxContainer}>
                    <input type="checkbox" {...register("ticket1")} />
                    <span className={styles.checkmark}></span>
                  </label>
                  <span>1회</span>
                </div>
                <div className={styles.formDetail}>30,000 KRW</div>
              </div>

              <div className={styles.classSelectForm}>
                <div className={styles.classSelectCheckBox}>
                  <label className={styles.checkBoxContainer}>
                    <input type="checkbox" {...register("ticket2")} />
                    <span className={styles.checkmark}></span>
                  </label>
                  <span>4회</span>
                </div>
                <div className={styles.formDetail}>120,000 KRW</div>
              </div>
            </div>
          </section>
          <button type="submit">신청하기</button>
        </form>
      </main>
    </div>
  );
};

export default Home;
