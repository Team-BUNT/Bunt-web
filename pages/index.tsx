import styles from "../styles/Home.module.css";
import StudioInformation from "./components/StudioInformation";
import StudioClassCheckList from "./components/StudioClassCheckList";
import StudentInputForm from "./components/StudentInputForm";
import HeadMeta from "../Components/HeadMeta";
import firebaseDB from "../Domains/firebase";

import type { NextPage } from "next";
import { useEffect, useState } from "react";

import { useForm } from "react-hook-form";

import { v4 as uuidv4 } from "uuid";
import { addDoc, collection } from "firebase/firestore";
import timeFormatter from "../Domains/timeFormatter";
import Class from "../Domains/hooks/Firestore/Collections/Class";

interface IClasses {
  instructorName: string;
  classTime: string;
  classID: string;
}

const Home: NextPage = () => {
  const [enrollment, setEnrollment] = useState<IClasses[]>([]);

  useEffect(() => {
    const classList = new Class(firebaseDB, "classes");

    classList.fetchData().then((value) => {
      try {
        setEnrollment(timeFormatter(value));
      } catch (error) {
        console.error(error);
      }
    });
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
