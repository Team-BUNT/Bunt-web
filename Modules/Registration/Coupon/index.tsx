/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import styled from "styled-components";

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
  background-color: transparent;
  border: 0;
  font-size: 1.7rem;
  cursor: pointer;

  span {
    margin-right: ${({ pageActionType }) => (pageActionType === "next" ? "3.4rem" : "0")};
    margin-left: ${({ pageActionType }) => (pageActionType === "previous" ? "3.4rem" : "0")};
  }
`;

const index = () => {
  const router = useRouter();
  const { studio } = router.query;
  const { register, handleSubmit } = useForm();

  const user = {
    name: "레이븐",
    coupons: ["쿠폰1", "쿠폰2", "쿠폰3"],
  };

  const couponType = [
    {
      name: `쿠폰 사용 (${user.coupons.length}회 남음)`,
      type: "use",
    },
    {
      name: "쿠폰 구매",
      type: "buy",
    },
  ];

  return (
    <Container>
      <CouponContainer>
        <CouponInformation>
          {typeof studio === "string" &&
            (/studio/gi.test(studio) ? <h1>{studio.toUpperCase()}</h1> : <h1>{`${studio.toUpperCase()} STUDIO`}</h1>)}
          <h2>클래스 신청 - 클래스 선택</h2>
          <CouponDescription>
            <h3>공지사항</h3>
            <div>
              사전 신청 후. 당일 취소는 환불 및 양도불가, 기존 쿠폰 사용 시, 당일취소 및 노쇼는 자동 차감 되니
              사전신청시 자신의 스케줄과 상황을 확인하여 신중하게 신청해 주시길 바랍니다.
            </div>
          </CouponDescription>
        </CouponInformation>

        <CouponRegistrationForm>
          <CouponRegistrationFormContainer>
            <h3>쿠폰</h3>
            {couponType.map(({ name, type }, index) => {
              return (
                <LabelContainer key={`${name})_${type}_${index}`}>
                  <input type="radio" name="coupon" />
                  <span></span>
                  <LabelTextContainer>
                    <LabelText>{name}</LabelText>
                  </LabelTextContainer>
                </LabelContainer>
              );
            })}
          </CouponRegistrationFormContainer>
        </CouponRegistrationForm>
        <PreviousNextButtonClass>
          <ButtonContainer
            onClick={() => router.push(`/form/studios/${studio}/class`, `/form/studios/${studio}/class`)}
          >
            <Button pageActionType="previous">
              &lt;<span>이전</span>
            </Button>
          </ButtonContainer>
          <ButtonContainer
            onClick={() => router.push(`/form/studios/${studio}/payment`, `/form/studios/${studio}/payment`)}
          >
            <Button pageActionType="next">
              <span>다음</span>&gt;
            </Button>
          </ButtonContainer>
        </PreviousNextButtonClass>
      </CouponContainer>
    </Container>
  );
};

export default index;
