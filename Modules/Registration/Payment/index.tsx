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
  margin-top: 1rem;

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
  }
`;

const CouponException = styled.div`
  margin-top: 0.8rem;
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
`;

const CouponRegistrationFormContainer = styled.div`
  padding-top: 3rem;
  margin-top: 3rem;
  border-top: 0.1rem solid #363636;
`;

const LabelContainer = styled.label`
  display: block;
  position: relative;
  margin-bottom: 1.2rem;
  cursor: pointer;
  font-size: 2.2rem;
  padding-left: 3.5rem;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  & input[type="radio"] {
    position: absolute;
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
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-left: 2.6rem;
`;

const LabelInputContainer = styled.label`
  display: block;
  position: relative;
  margin-bottom: 1.2rem;
  cursor: pointer;
  font-size: 2.2rem;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  p {
    margin-top: 2rem;
    font-size: 1.5rem;
    padding-left: 1rem;
    color: #da0000;
  }
`;

const LabelText = styled.div`
  height: 100%;
  font-weight: 400;
  color: #a4a4a4;
  line-height: -5.2rem;
`;

const DepositeContainer = styled.div`
  width: 100%;
  max-width: 660px;
  min-width: 390px;

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
`;

const DepositeInformation = styled.div`
  width: 100%;
  max-width: 660px;
  min-width: 390px;

  h3 {
    font-size: 1.7rem;
    font-weight: 600;
    margin-top: 3rem;
  }

  div {
    display: flex;
    justify-content: space-between;
    margin-top: 1.8rem;

    span {
      font-size: 1.6rem;
      color: #a4a4a4;
      font-weight: 400;
      line-height: 2.4rem;
    }

    button {
      cursor: pointer;
      border-radius: 0.7rem;
      width: 6.6rem;
      height: 4.2rem;
      border: 0;
      background-color: #1c1c1e;
    }
  }
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

  span {
    display: ${({ pageActionType }) => pageActionType === "complete" && "flex"};
    justify-content: center;
    align-items: center;

    width: ${({ pageActionType }) =>
      pageActionType === "complete" && "15.5rem"};
    height: ${({ pageActionType }) => pageActionType === "complete" && "5rem"};
    border-radius: ${({ pageActionType }) =>
      pageActionType === "complete" && "0.7rem"};
    background-color: ${({ pageActionType }) =>
      pageActionType === "complete" && "#202020"};
    margin-left: ${({ pageActionType }) =>
      pageActionType === "previous" ? "3.4rem" : "0"};
  }
`;

const Cheap = styled.div`
  position: absolute;
  top: 75%;
  width: calc(50% - 2.4rem);
  padding-left: 2.4rem;
  background-color: #1c1c1e;
  max-width: 660px;
  min-width: 390px;
  height: 5rem;
  font-size: 1.4rem;
  line-height: 2.2rem;
  display: flex;
  align-items: center;
  border-radius: 1rem;
  visibility: hidden;
`;

const index = ({
  selectedClass,
  studentName,
  studentPhoneNumber,
  couponCount,
  studio,
  bankAccount,
}: any) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [deposite, setDeposite] = useState(false);

  const STUDIO_ADMIN_ACCOUNT = bankAccount;
  const COUPON_TYPE = "모든 쿠폰의 유효기간은 구매 후, 4주 입니다.";
  const CLIPBOARD_MESSAGE = "신청폼 링크가 복사되었습니다.";

  const couponType = [
    {
      type: "1회",
      price: 30_000,
      unit: "원",
    },
    {
      type: "4회",
      price: 100_000,
      unit: "원",
    },
    {
      type: "8회",
      price: 200_000,
      unit: "원",
    },
    {
      type: "12회",
      price: 280_000,
      unit: "원",
    },
    {
      type: "프리패스",
      price: 350_000,
      unit: "원",
    },
  ];

  const paymentMethod = [
    {
      type: "무통장 입금",
    },
    {
      type: "현장 카드",
    },
    {
      type: "현장 현금",
    },
  ];

  const doCopy = (text: string) => {
    const cheap = document.getElementById("cheap") as HTMLElement;
    navigator.clipboard.writeText(text);

    cheap.animate(
      {
        opacity: [1, 0],
        display: ["none", "block"],
        visibility: ["hidden", "visible"],
      },
      {
        duration: 2000,
        easing: "ease-in-out",
        iterations: 1,
      }
    );
  };

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
          <h2>클래스 신청 - 결제</h2>
          <CouponDescription>
            <h3>쿠폰 가격</h3>
            {couponType.map(({ type, price, unit }) => {
              return (
                <div key={type + price}>
                  <div>{`${type} - ${price}${unit}`}</div>
                </div>
              );
            })}
            <CouponException>{COUPON_TYPE}</CouponException>
          </CouponDescription>
        </CouponInformation>

        <CouponRegistrationForm
          onSubmit={handleSubmit(async (data, e) => {
            e?.preventDefault();
            const { coupon, payment } = data;

            const user = localStorage.getItem("user");

            // ToDo json으로 저장되는 user 리팩토링
            const { name, phone } =
              typeof user === "string" && JSON.parse(user);

            try {
              const studios = await new Studio(
                firestore,
                "studios"
              ).fetchData();
              const dancers = await new Class(firestore, "classes").fetchData();
              const studioId =
                !(studios instanceof Error) &&
                [...studios].filter((aStudio) => aStudio.name === studio)[0].ID;
              const studentId = `${studioId} ${studentPhoneNumber}`;

              const classId =
                !(dancers instanceof Error) &&
                [...dancers].filter(
                  (dance) => dance.instructorName === selectedClass
                )[0].ID;

              const enrollment = {
                ID: `${studioId} ${studentPhoneNumber}`,
                attendance: false,
                classID: classId,
                enrolledDate: new Date(),
                info: "",
                paid: true,
                paymentType: "쿠폰 사용",
                phoneNumber:
                  typeof studentPhoneNumber === "string"
                    ? studentPhoneNumber
                    : "",
                studioID: studioId,
                userName: typeof studentName === "string" ? studentName : "",
              };

              if (coupon === "프리패스") {
                await new Student(firestore, "student").updateData(
                  studentId,
                  {
                    classID: classId,
                    studioID: studioId,
                    expiredDate: new Date(
                      new Date().setDate(new Date().getDate() + 30)
                    ),
                    isFreePass: true,
                    studentID: studentId,
                  },
                  enrollment,
                  "프리패스"
                );
              } else {
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
                  enrollment,
                  coupon
                );
              }

              await new Enrollment(firestore, "enrollment").addData(enrollment);

              router.push(
                `/form/studios/${studio}/complete`,
                `/form/studios/${studio}/complete`
              );
              return;
            } catch (error) {
              console.error(error);
            }
          })}
        >
          <CouponRegistrationFormContainer>
            <h3>쿠폰 종류</h3>
            {couponType.map(({ type }, index) => {
              return (
                <LabelContainer key={type + index}>
                  <input type="radio" value={type} {...register("coupon")} />
                  <span></span>
                  <LabelTextContainer>
                    <LabelText>{type}</LabelText>
                  </LabelTextContainer>
                </LabelContainer>
              );
            })}
          </CouponRegistrationFormContainer>
          <CouponRegistrationFormContainer>
            <h3>결제방법</h3>
            {paymentMethod.map(({ type }, index) => {
              return (
                <LabelContainer key={type + index}>
                  <input
                    type="radio"
                    value={type}
                    id={type}
                    onClick={() => {
                      const depositeElement = document.getElementById(
                        "무통장 입금"
                      ) as HTMLInputElement;
                      setDeposite(depositeElement.checked);
                    }}
                    {...register("payment")}
                  />
                  <span></span>
                  <LabelTextContainer>
                    <LabelText>{type}</LabelText>
                  </LabelTextContainer>
                </LabelContainer>
              );
            })}
          </CouponRegistrationFormContainer>
          {deposite && (
            <DepositeContainer>
              <LabelInputContainer>
                <label htmlFor="studentName">
                  입금자명
                  <input
                    type="text"
                    id="studentName"
                    placeholder="Ex. 김민수"
                    {...register("name", {
                      required: "이름을 입력해주세요.",
                      minLength: {
                        value: 2,
                        message: "이름은 2글자 이상입니다.",
                      },
                      maxLength: {
                        value: 4,
                        message: "이름은 4글자 이하입니다.",
                      },
                    })}
                  />
                </label>
                <p>{errors.name && (errors.name.message as string)}</p>
              </LabelInputContainer>
              <DepositeInformation>
                <h3>계좌 정보</h3>
                <div>
                  <span>{STUDIO_ADMIN_ACCOUNT}</span>
                  <button onClick={() => doCopy(STUDIO_ADMIN_ACCOUNT)}>
                    복사
                  </button>
                </div>
              </DepositeInformation>
            </DepositeContainer>
          )}
          <PreviousNextButtonClass>
            <ButtonContainer
              onClick={() => {
                const user = localStorage.getItem("user");
                const { name, phone } =
                  typeof user === "string" && JSON.parse(user);
                router.push(`/form/studios/${studio}/coupon`, {
                  query: {
                    name,
                    phone,
                  },
                  pathname: `/form/studios/${studio}/coupon`,
                });
              }}
            >
              <Button pageActionType="previous">
                &lt;<span>이전</span>
              </Button>
            </ButtonContainer>
            <ButtonContainer>
              <Button pageActionType="complete" type="submit">
                <span>신청완료</span>
              </Button>
            </ButtonContainer>
          </PreviousNextButtonClass>
        </CouponRegistrationForm>
      </CouponContainer>
      <Cheap id="cheap">
        <div>{CLIPBOARD_MESSAGE}</div>
      </Cheap>
    </Container>
  );
};

export default index;
