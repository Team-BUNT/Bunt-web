/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { FieldValues, useForm } from "react-hook-form";
import styled from "styled-components";
import axios from "axios";
import { useFirebaseFunction } from "../../../Domains/hooks/useFirebaseFunction";
import { dateFormatter } from "../../../Domains/\bdateFormatter";

interface IStudioInfo {
  studioId: string | null;
  studioName: string | null;
}

interface IStudentInfo {
  studentName: string | null;
  studentPhone: string | null;
}
interface ButtonProps {
  pageActionType: string;
}

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  width: 80%;
  height: 100%;
`;

const CouponContainer = styled.div`
  width: 100%;
  max-width: 660px;
  min-width: 390px;
  margin-top: 2.5rem;
  margin-bottom: 2.5rem;
`;

const CouponInformation = styled.div`
  width: 100%;
  height: auto;
  line-height: 3.2rem;

  h1 {
    font-family: "Montserrat", sans-serif;
    font-size: 2.4rem;
    font-weight: 600;
  }

  h2 {
    font-size: 1.7rem;
    color: #787878;
  }
`;

const CouponDescription = styled.div`
  line-height: 2.2rem;
  margin-top: 1.8rem;

  h3 {
    font-size: 1.7rem;
    font-weight: 600;
  }

  div {
    color: #a4a4a4;
    word-break: break-all;
    font-weight: 400;
    line-height: 2.7rem;
    font-size: 1.5rem;
    margin-top: 1.5rem;
  }
`;

const CouponRegistrationForm = styled.form`
  width: 100%;
  max-width: 660px;
  min-width: 390px;

  h3 {
    font-size: 1.7rem;
    font-weight: 600;
  }

  label {
    font-size: 1.7rem;
    font-weight: 600;
    margin-top: 3rem;
  }

  input {
    width: calc(100% - 3.8rem);
    margin-top: 1.5rem;
    padding: 1.5rem 1.9rem;
    border: 0;
    color: #787878;
    background-color: #1c1c1e;
    border-radius: 1rem;
  }

  p {
    margin-left: 2rem;
    margin-top: 2rem;
    font-size: 1.4rem;
    color: #da0000;
  }
`;

const CouponRegistrationFormContainer = styled.div`
  padding-top: 3rem;
  margin-top: 3rem;
  border-top: 0.1rem solid #363636;
`;

const LabelContainer = styled.label`
  display: block;
  position: relative;
  padding-left: 3.5rem;
  margin-bottom: 1.2rem;
  cursor: pointer;
  font-size: 2.2rem;

  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  & input[type="radio"] {
    position: absolute;
    -webkit-appearance: radio;
    opacity: 0;
    border-radius: 50%;
    cursor: pointer;
    height: 0;
    width: 0;
  }

  & span {
    position: absolute;
    top: -5px;
    left: 5px;
    height: 18px;
    width: 18px;
    background-color: transparent;
    border: 1.5px solid gray;
    border-radius: 5px;
  }

  &:hover input[type="radio"] ~ span {
    background-color: transparent;
    border: 1.5px solid #da0000;
  }

  & input[type="radio"]:checked ~ span {
    border: 1.5px solid #da0000;
    background-color: #da0000;
  }

  & input[type="radio"]:checked ~ span:after {
    display: block;
  }

  & input[type="radio"]:disabled ~ span {
    background-color: #4b4b4b;
    border-color: #4b4b4b;
  }

  span:after {
    content: "";
    position: absolute;
    display: none;
  }

  & span:after {
    left: 5px;

    width: 5px;
    height: 11px;
    border: solid black;

    border-width: 0px 2px 2.3px 0px;
    -webkit-transform: rotate(30deg);
    -ms-transform: rotate(30deg);
    transform: skewY(15deg) scaleY(1.2) rotate(30deg);
  }
`;

const LabelTextContainer = styled.div`
  width: calc(100% - 2.6rem);
  display: flex;
  justify-content: space-between;
  margin-left: 2.6rem;
`;

const LabelText = styled.div`
  height: 100%;
  font-weight: 400;
  color: #a4a4a4;
  line-height: -5.2rem;
`;
const PreviousNextButtonClass = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  font-weight: 600;
  margin-top: 3.2rem;
`;

const Button = styled.button<ButtonProps>`
  background-color: ${({ pageActionType }) =>
    pageActionType === "complete" ? "#202020" : "transparent"};
  border-radius: ${({ pageActionType }) =>
    pageActionType === "complete" ? "0.7rem" : "0"};
  width: ${({ pageActionType }) =>
    pageActionType === "complete" ? "15.5rem" : "auto"};
  height: ${({ pageActionType }) =>
    pageActionType === "complete" ? "5rem" : "auto"};
  border: 0;
  font-size: 1.7rem;
  cursor: pointer;
  /* complete */
  span {
    margin-right: ${({ pageActionType }) =>
      pageActionType === "next" ? "3.4rem" : "0"};
    margin-left: ${({ pageActionType }) =>
      pageActionType === "previous" ? "3.4rem" : "0"};
  }
`;

const index = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [studio, setStudioInfo] = useState<IStudioInfo>();
  const [student, setStudentInfo] = useState<IStudentInfo>();
  const [classId, setClassId] = useState<string>("");
  const [couponCount, setCouponCount] = useState(0);
  const [buy, setBuy] = useState(false);
  const [use, setUse] = useState(false);

  const couponType = [
    {
      name: `쿠폰 사용 (${couponCount}회 남음)`,
      type: "use",
    },
    {
      name: "쿠폰 구매",
      type: "buy",
    },
  ];

  useEffect(() => {
    if (!router.isReady) return;
  }, [router.isReady, router.query]);

  useEffect(() => {
    if (!router.isReady) return;
    const urlSearchParams = new URLSearchParams(window.location.search);

    const studioInfo = {
      studioId: urlSearchParams.get("studioId"),
      studioName: urlSearchParams.get("studioName"),
    };

    const studentInfo = {
      studentName: urlSearchParams.get("studentName"),
      studentPhone: urlSearchParams.get("studentPhone"),
    };

    setStudioInfo(() => {
      if (studioInfo !== undefined) {
        return { ...studioInfo };
      }
    });

    setStudentInfo(() => {
      if (studentInfo !== undefined) {
        return { ...studentInfo };
      }
    });

    const classId = urlSearchParams.get("classId");
    classId !== null && setClassId(classId);
  }, [router.isReady, router.query]);

  useEffect(() => {
    if (!router.isReady) return;

    const { studentPhone } = router.query;
    const fetcher = async (url: string, postData = {}) =>
      await axios.post(url, postData);
    const matchedStudent =
      process.env.NEXT_PUBLIC_MODE === "development"
        ? fetcher(
            `${process.env.NEXT_PUBLIC_DEVELOPMENT_URL}/api/student/getStudent`,
            {
              phone: studentPhone,
            }
          )
        : fetcher(`/api/student/getStudent`, {
            phone: studentPhone,
          });

    matchedStudent.then((student) => {
      setCouponCount(
        student.data.coupons.filter(
          ({ classID }: { classID: string }) => !classID
        ).length
      );
    });
  }, [router.isReady]);

  const onSubmit = async (
    data: FieldValues,
    e: React.BaseSyntheticEvent<object, any, any> | undefined
  ) => {
    e?.preventDefault();

    try {
      if (!buy && !use) {
        return alert("쿠폰 여부를 하나라도 눌러야 합니다.");
      }

      if (data.coupon === "use") {
        if (couponCount === 0) {
          return alert("쿠폰이 부족합니다.");
        }
      }

      const target = e?.nativeEvent as SubmitEvent;
      if (
        student &&
        studio &&
        classId &&
        student.studentPhone &&
        studio.studioName
      ) {
        /**
         * 수강완료
         * 1. enrollment에 현재 상황 등록
         * 2. updateData에 쿠폰 넘김
         */

        // 알림톡
        if (
          target !== null &&
          target.submitter !== null &&
          target.submitter.textContent === "수강완료"
        ) {
          // if (
          //   !confirm(
          //     `${student.studentName}님 수강신청 감사합니다. ${student.studentPhone}번호로 수강신청 알람이 갑니다. 번호가 일치하나요?`
          //   )
          // )
          //   return;

          const fetcher = async (url: string, type = "GET", postData = {}) =>
            type === "GET" ? axios.post(url) : axios.post(url, postData);

          process.env.NEXT_PUBLIC_MODE === "development"
            ? await fetcher(
                `${process.env.NEXT_PUBLIC_DEVELOPMENT_URL}/api/enrollment/addEnrollment`,
                "POST",
                {
                  classId,
                  studioId: studio?.studioId,
                  studentPhone: student?.studentPhone,
                  studentName: student?.studentName,
                }
              )
            : await fetcher(`/api/enrollment/addEnrollment`, "POST", {
                classId,
                studioId: studio?.studioId,
                studentPhone: student?.studentPhone,
                studentName: student?.studentName,
              });

          process.env.NEXT_PUBLIC_MODE === "development"
            ? await fetcher(
                `${process.env.NEXT_PUBLIC_DEVELOPMENT_URL}/api/student/updateStudent`,
                "POST",
                {
                  classId,
                  studioId: studio?.studioId,
                  studentId: `${studio?.studioId} ${student?.studentPhone}`,
                  studentPhone: student?.studentPhone,
                  studentName: student?.studentName,
                }
              )
            : await fetcher(`/api/student/updateStudent`, "POST", {
                classId,
                studioId: studio?.studioId,
                studentId: `${studio?.studioId} ${student?.studentPhone}`,
                studentPhone: student?.studentPhone,
                studentName: student?.studentName,
              });

          const matchedStudio =
            process.env.NEXT_PUBLIC_MODE === "development"
              ? await fetcher(
                  `${process.env.NEXT_PUBLIC_DEVELOPMENT_URL}/api/studio/getStudio`,
                  "POST",
                  {
                    studioName: studio.studioName,
                  }
                )
              : await fetcher(`/api/studio/getStudio`, "POST", {
                  studioName: studio.studioName,
                });

          const matchedClass =
            process.env.NEXT_PUBLIC_MODE === "development"
              ? await fetcher(
                  `${process.env.NEXT_PUBLIC_DEVELOPMENT_URL}/api/class/getClass`,
                  "POST",
                  {
                    ID: classId,
                  }
                )
              : await fetcher(`/api/class/getClass`, "POST", {
                  ID: classId,
                });

          useFirebaseFunction({
            to: student?.studentPhone,
            studioName: studio?.studioName,
            studioAddress: matchedStudio.data.location,
            instructorName: matchedClass.data.instructorName,
            genre: matchedClass.data.title,
            time: dateFormatter(
              new Date(matchedClass.data.date.seconds * 1000)
            ),
            payment: "쿠폰 사용",
          });

          router.push(`/complete`, `/complete`);
          return;
        }

        // 쿠폰 구매를 누르고 다음 버튼을 누를 시
        router.push(`/form/studios/payment/${studio?.studioName}`, {
          query: {
            classId,
            studioId: studio?.studioId,
            studioName: studio?.studioName,
            studentName: student?.studentName,
            studentPhone: student?.studentPhone,
          },
          pathname: `/form/studios/payment/${studio?.studioName}`,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <CouponContainer>
        <CouponInformation>
          {typeof studio?.studioName === "string" &&
            (/studio/gi.test(studio?.studioName) ? (
              <h1>{studio?.studioName.toUpperCase()}</h1>
            ) : (
              <h1>{`${studio?.studioName.toUpperCase()} STUDIO`}</h1>
            ))}
          <h2>클래스 신청 - 클래스 선택</h2>
          <CouponDescription>
            <h3>공지사항</h3>
            <div>
              사전 신청 후. 당일 취소는 환불 및 양도불가, 기존 쿠폰 사용 시,
              당일취소 및 노쇼는 자동 차감 되니 사전신청시 자신의 스케줄과
              상황을 확인하여 신중하게 신청해 주시길 바랍니다.
            </div>
          </CouponDescription>
        </CouponInformation>

        <CouponRegistrationForm onSubmit={handleSubmit(onSubmit)}>
          <CouponRegistrationFormContainer>
            <h3>쿠폰</h3>
            {couponType.map(({ name, type }, index) => {
              return (
                <LabelContainer key={`${name})_${type}_${index}`}>
                  {couponCount === 0 && type === "use" ? (
                    <input
                      type="radio"
                      value={type}
                      {...register("coupon")}
                      onClick={() => false}
                      disabled
                    />
                  ) : (
                    <input
                      type="radio"
                      value={type}
                      {...register("coupon")}
                      onChange={(e) => {
                        e.target.value === "buy" ? setBuy(true) : setBuy(false);
                        e.target.value === "use" ? setUse(true) : setUse(false);
                      }}
                    />
                  )}
                  <span></span>
                  <LabelTextContainer>
                    <LabelText>{name}</LabelText>
                  </LabelTextContainer>
                </LabelContainer>
              );
            })}
          </CouponRegistrationFormContainer>
          <PreviousNextButtonClass>
            <ButtonContainer>
              <Button
                pageActionType="previous"
                onClick={() => router.back()}
                type="button"
              >
                &lt;<span>이전</span>
              </Button>
            </ButtonContainer>
            {!use ? (
              <ButtonContainer>
                <Button pageActionType="next" type="submit">
                  <span>다음</span>&gt;
                </Button>
              </ButtonContainer>
            ) : (
              <ButtonContainer>
                <Button pageActionType="complete" type="submit">
                  <span>수강완료</span>
                </Button>
              </ButtonContainer>
            )}
          </PreviousNextButtonClass>
        </CouponRegistrationForm>
      </CouponContainer>
    </Container>
  );
};

export default index;
