/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import {
  Class,
  Enrollment,
  Student,
  Studio,
} from "../../../Domains/hooks/Firestore";
import { firestore } from "../../../Domains/firebase";
import { getClass } from "../../../pages/api/classes";
import { useFirebaseFunction } from "../../../Domains/hooks/useFirebaseFunction";
import { dateFormatter } from "../../../Domains/\bdateFormatter";
import { Timestamp } from "firebase/firestore";

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

const index = ({
  name,
  phone,
  couponCount,
  selectedClass,
}: {
  name: string;
  phone: string;
  couponCount: number;
  selectedClass: string;
}) => {
  const router = useRouter();
  const { studio } = router.query;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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
  }, [router.isReady]);

  return (
    <Container>
      <CouponContainer>
        <CouponInformation>
          {typeof studio === "string" &&
            (/studio/gi.test(studio) ? (
              <h1>{studio.toUpperCase()}</h1>
            ) : (
              <h1>{`${studio.toUpperCase()} STUDIO`}</h1>
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

        <CouponRegistrationForm
          onSubmit={handleSubmit(async (data, e) => {
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
                target !== null &&
                target.submitter !== null &&
                target.submitter.textContent === "수강완료"
              ) {
                const studios = await new Studio(
                  firestore,
                  "studios"
                ).fetchData();
                const dancers = await new Class(
                  firestore,
                  "classes"
                ).fetchData();
                const studioId =
                  !(studios instanceof Error) &&
                  [...studios].filter((aStudio) => aStudio.name === studio)[0]
                    .ID;
                const studentId = `${studioId} ${phone}`;
                // 선택된 클래스가 하나일 때
                const classId =
                  !(dancers instanceof Error) &&
                  [...dancers].filter(
                    (dance) => dance.instructorName === selectedClass
                  )[0].ID;
                const enrollment = {
                  ID: `${classId} ${phone}`,
                  attendance: false,
                  classID: classId,
                  enrolledDate: new Date(),
                  info: "",
                  paid: true,
                  paymentType: "쿠폰 사용",
                  phoneNumber: typeof phone === "string" ? phone : "",
                  studioID: studioId,
                  userName: typeof name === "string" ? name : "",
                };
                await new Student(firestore, "student").updateData(
                  studentId,
                  {
                    classID: classId,
                    studioID: studioId,
                    expiredDate: new Date(
                      new Date().setDate(new Date().getDate() + 30)
                    ),
                    isFreePass: false,
                    studentID: studentId,
                  },
                  enrollment
                );
                // 쿠폰으로 수강했을 경우 enrollment에 등록
                await new Enrollment(firestore, "enrollment").addData(
                  enrollment
                );

                // 알림톡
                const studioAddress =
                  !(studios instanceof Error) &&
                  [...studios].filter((aStudio) => aStudio.name === studio)[0]
                    .location;
                const dancer: any =
                  !(dancers instanceof Error) &&
                  [...dancers]
                    .filter((dance) => dance.instructorName === selectedClass)
                    .filter((schedule) => {
                      const today = new Date().getDate();
                      const nextSevenDaysAfter = new Date().setDate(
                        new Date().getDate() + 7
                      );
                      return (
                        today <= new Date(schedule.date.toDate()).getDate() &&
                        nextSevenDaysAfter >=
                          new Date(schedule.date.toDate()).getDate()
                      );
                    })[0];

                const { title, date } = dancer;

                useFirebaseFunction({
                  to: phone,
                  studioName: typeof studio === "string" ? studio : "",
                  studioAddress: studioAddress,
                  instructorName: selectedClass,
                  genre: title,
                  time: dateFormatter(new Date(date.toDate())),
                  payment: "쿠폰 사용",
                });

                router.push(
                  `/form/studios/${studio}/complete`,
                  `/form/studios/${studio}/complete`
                );
                return;
              }

              // 쿠폰 구매를 누르고 다음 버튼을 누를 시
              router.push(`/form/studios/${studio}/payment`, {
                query: {
                  selectedClass,
                  name,
                  phone,
                  couponCount,
                },
                pathname: `/form/studios/${studio}/payment`,
              });
            } catch (error) {
              console.error(error);
            }
          })}
        >
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
                onClick={() =>
                  router.push(`/form/studios/${studio}/class`, {
                    query: {
                      name,
                      phone,
                    },
                    pathname: `/form/studios/${studio}/class`,
                  })
                }
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
