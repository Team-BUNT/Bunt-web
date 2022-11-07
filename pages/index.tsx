import styles from "../styles/Home.module.css";

import StudioInformation from "./components/StudioInformation";
import StudioClassCheckList from "./components/StudioClassCheckList";
import StudentInputForm from "./components/StudentInputForm";
import HeadMeta from "../Components/HeadMeta";

import { timeFormatter } from "../Domains/timeFormatter";
import { Class, Enrollment } from "../Domains/hooks/Firestore";
import { orderByTime } from "../Domains/orderByTime";
import LandingPage from "../Modules/LandingPage/index";

import type { NextPage } from "next";
import { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";

interface IHall {
  name: string;
  capacity: number;
}
interface IClass {
  ID: string;
  studioID: string;
  title: string;
  instructorName: string;
  date: Date;
  durationMinute: number;
  applicantsCount: number;
  hall: IHall;
  isPopUp: boolean;
}

const Home: NextPage = () => {
  const [enrollment, setEnrollment] = useState<IClass[]>([]);

  const Root = styled.main`
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100vh;
  `;

  // useEffect(() => {
  //   const classList = new Class(firebaseDB, "classes");

  //   try {
  //     classList.fetchData().then((value) => {
  //       //MEMO: value 타입 체크
  //       // Type 'Error' is missing the following properties from type
  //       const formattedClass = [...timeFormatter(value)].filter((aClass) => aClass !== undefined);

  //       setEnrollment(orderByTime(formattedClass));
  //     });
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }, []);

  const { register, handleSubmit } = useForm();

  return (
    <Root>
      <LandingPage></LandingPage>

      {/* <StudioInformation
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
                  await new Enrollment(firebaseDB, "enrollment").addData({
                    ID: uuidv4(),
                    enrolledDate: new Date(),
                    classID: checkedClass,
                    userName: data.name,
                    phoneNumber: data.phone,
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
        </form> */}
    </Root>
  );
};

export default Home;
