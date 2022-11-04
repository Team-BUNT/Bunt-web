import styles from "../styles/Home.module.css";
import StudioInformation from "./components/StudioInformation";
import StudioClassCheckList from "./components/StudioClassCheckList";
import StudentInputForm from "./components/StudentInputForm";
import HeadMeta from "../Components/HeadMeta";
import firebaseDB from "../Domains/firebase";

import type { NextPage } from "next";
import { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import moment from "moment";
import "moment/locale/ko";

import { v4 as uuidv4 } from "uuid";
import { Firestore, addDoc, collection, getDocs } from "firebase/firestore";

interface IClasses {
  instructorName: string;
  classTime: string;
  classID: string;
}

const Home: NextPage = () => {
  const [enrollment, setEnrollment] = useState<IClasses[]>([]);
  const datas: IClasses[] = [];

  useEffect(() => {
    if (process.env.MODE !== "production") return;

    const higgsClasses = async (db: Firestore) => {
      const danceClasses = collection(db, "classes");
      const classSnapshot = await getDocs(danceClasses);
      const classList = classSnapshot.docs.map((doc) => doc.data());
      const higgsStudioClass = classList.filter((aClass) => aClass.studioID === process.env.NEXT_PUBLIC_STUDIO_ID);

      return higgsStudioClass;
    };

    higgsClasses(firebaseDB).then((value) => {
      value.map((e) => {
        const numberParseDay = Number(moment(e.date.toDate()).format("DD"));
        const { instructorName } = e;
        if (numberParseDay >= 17 && numberParseDay <= 23) {
          const classTime = moment(e.date.toDate()).format("MM월 DD일 (ddd) HH:mm");

          datas.push({ classID: e.ID, classTime, instructorName });
        }
      });

      let sortClass = datas.sort((a, b) => a.instructorName[0].charCodeAt(0) - b.instructorName[0].charCodeAt(0));

      setEnrollment(sortClass);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { register, handleSubmit } = useForm();

  return (
    <div className={styles.container}>
      <HeadMeta title="Bunt"></HeadMeta>

      <main className={styles.main}>
        <StudioInformation
          studioName="Bunt"
          notice={`카드결제시 현장에서 가능합니다.
사전신청 후 안내 문자로 정확한 가격 안내 해드리고 있습니다. 10/17 ~ 10/23 까지의 수업 사전 신청서입니다.`}
        ></StudioInformation>
        <form
          className={styles.chooseClass}
          onSubmit={handleSubmit(async (data) => {
            const checkedClasses = [...Object.keys(data).splice(4)].filter((checkingClassId) => data[checkingClassId]);

            try {
              checkedClasses.length !== 0 &&
                process.env.MODE === "production" &&
                checkedClasses.forEach(async (checkedClass) => {
                  const docRef = await addDoc(collection(firebaseDB, "enrollment"), {
                    ID: uuidv4(),
                    enrolledDate: new Date(),
                    classID: checkedClass,
                    userName: data.name,
                    phoneNumber: data.phone,
                    number: 1,
                    paid: false,
                  });
                });
            } catch (error) {
              console.error(error);
            }

            alert(`${data.name}님  수강신청 완료했습니다 !!`);
          })}
          method="post"
        >
          <StudioClassCheckList enrollment={enrollment} register={register}></StudioClassCheckList>

          <StudentInputForm register={register}></StudentInputForm>
          <button type="submit">신청하기</button>
        </form>
      </main>
    </div>
  );
};

export default Home;
