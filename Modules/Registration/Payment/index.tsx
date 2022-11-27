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

const index = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [studio, setStudioInfo] = useState<IStudioInfo>();
  const [student, setStudentInfo] = useState<IStudentInfo>();
  const [classId, setClassId] = useState<string | null>("");
  const [deposite, setDeposite] = useState(false);
  const [account, setAccount] = useState("");
  // const STUDIO_ADMIN_ACCOUNT = bankAccount;
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

    urlSearchParams.get("classId") &&
      setClassId(urlSearchParams.get("classId"));

    const fetcher = async (url: string, postData = {}) =>
      await axios.post(url, postData);
    const matchedStudio =
      process.env.NEXT_PUBLIC_MODE === "development"
        ? fetcher(
            `${process.env.NEXT_PUBLIC_DEVELOPMENT_URL}/api/studio/getStudio`,
            {
              studioName: studioInfo.studioName,
            }
          )
        : fetcher(
            `${process.env.NEXT_PUBLIC_PRODUCTION_URL}/api/studio/getStudio`,
            {
              studioName: studioInfo.studioName,
            }
          );

    matchedStudio.then((student) => {
      setAccount(student.data.notice.bankAccount);
    });
  }, [router.isReady, router.query]);

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

  const onSubmit = async (
    data: FieldValues,
    e: React.BaseSyntheticEvent<object, any, any> | undefined
  ) => {
    e?.preventDefault();

    try {
      /**
       * coupon: 1회 | 2회 | 프리패스
       * payment: 현장카드 | 무통장 입금
       */
      const { coupon, payment } = data;

      if (!coupon && !payment)
        return alert("쿠폰 종류와 결제 방법을 체크해주세요.");
      if (!coupon && payment) return alert("쿠폰 종류를 체크해주세요.");
      if (coupon && !payment) return alert("결제 방법을 체크해주세요.");
      console.log(student);
      console.log(classId);
      console.log(studio);
      if (
        student &&
        studio &&
        classId &&
        student.studentPhone &&
        studio.studioName
      ) {
        if (
          !confirm(
            `${student.studentName}님 수강신청 감사합니다. ${student.studentPhone}번호로 수강신청 알람이 갑니다. 번호가 일치하나요?`
          )
        )
          return;

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
          : await fetcher(
              `${process.env.NEXT_PUBLIC_PRODUCTION_URL}/api/enrollment/addEnrollment`,
              "POST",
              {
                classId,
                studioId: studio?.studioId,
                studentPhone: student?.studentPhone,
                studentName: student?.studentName,
              }
            );

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
                isFreePass: coupon === "프리패스" ? true : false,
                couponType: coupon === "프리패스" ? "프리패스" : coupon,
              }
            )
          : await fetcher(
              `${process.env.NEXT_PUBLIC_PRODUCTION_URL}/api/student/updateStudent`,
              "POST",
              {
                classId,
                studioId: studio?.studioId,
                studentId: `${studio?.studioId} ${student?.studentPhone}`,
                studentPhone: student?.studentPhone,
                studentName: student?.studentName,
                isFreePass: coupon === "프리패스" ? true : false,
                couponType: coupon === "프리패스" ? "프리패스" : coupon,
              }
            );

        const matchedStudio =
          process.env.NEXT_PUBLIC_MODE === "development"
            ? await fetcher(
                `${process.env.NEXT_PUBLIC_DEVELOPMENT_URL}/api/studio/getStudio`,
                "POST",
                {
                  studioName: studio.studioName,
                }
              )
            : await fetcher(
                `${process.env.NEXT_PUBLIC_PRODUCTION_URL}/api/studio/getStudio`,
                "POST",
                {
                  studioName: studio.studioName,
                }
              );

        const matchedClass =
          process.env.NEXT_PUBLIC_MODE === "development"
            ? await fetcher(
                `${process.env.NEXT_PUBLIC_DEVELOPMENT_URL}/api/class/getClass`,
                "POST",
                {
                  ID: classId,
                }
              )
            : await fetcher(
                `${process.env.NEXT_PUBLIC_PRODUCTION_URL}/api/class/getClass`,
                "POST",
                {
                  ID: classId,
                }
              );

        payment === "무통장 입금"
          ? useFirebaseFunction({
              to: student?.studentPhone,
              studioName: studio?.studioName,
              studioAddress: matchedStudio.data.location,
              instructorName: matchedClass.data.instructorName,
              genre: matchedClass.data.title,
              time: dateFormatter(
                new Date(matchedClass.data.date.seconds * 1000)
              ),
              studioAccountNumber: matchedStudio.data.notice.bankAccount,
            })
          : useFirebaseFunction({
              to: student?.studentPhone,
              studioName: studio?.studioName,
              studioAddress: matchedStudio.data.location,
              instructorName: matchedClass.data.instructorName,
              genre: matchedClass.data.title,
              time: dateFormatter(
                new Date(matchedClass.data.date.seconds * 1000)
              ),
              payment,
            });

        router.push(`/complete`, `/complete`);
        return;
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

        <CouponRegistrationForm onSubmit={handleSubmit(onSubmit)}>
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
                  <span>{account}</span>
                  <button onClick={() => doCopy(account)}>복사</button>
                </div>
              </DepositeInformation>
            </DepositeContainer>
          )}
          <PreviousNextButtonClass>
            <ButtonContainer
              onClick={() => {
                router.back();
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
