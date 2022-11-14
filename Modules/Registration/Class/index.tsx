/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { findThisWeek } from "../../../Domains/findThisWeek";
import { dayFormatter } from "../../../Domains/dayFormatter";

interface DateContainerProps {
  order: number;
}

interface CheckboxContainerProps {
  isFull: boolean;
}

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  width: 80%;
  height: 100%;
`;

const ClassContainer = styled.div`
  width: 100%;
  max-width: 660px;
  min-width: 390px;
  margin-top: 2.5rem;
  margin-bottom: 2.5rem;
`;

const ClassInformation = styled.div`
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

const CalenderContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1.7rem;
  margin-top: 1.8rem;
  span {
    font-size: 1.5rem;
    color: #787878;
  }
`;

const DateContainers = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1.3rem;
  margin-top: 1.8rem;
`;

const DateContainer = styled.div<DateContainerProps>`
  color: ${(props) => props.order === 0 && "red"};

  height: 8.2rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  font-size: 2rem;
  font-weight: 400;

  div:nth-child(1) {
    padding: 1.2rem;
  }

  div:nth-child(2) {
    margin-top: 1.2rem;
  }
`;

const ClassRegistrationForm = styled.form`
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

const ClassRegistrationFormContainer = styled.div`
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

  & input[type="checkbox"] {
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

  &:hover input[type="checkbox"] ~ span {
    background-color: transparent;
    border: 1.5px solid #da0000;
  }

  & input[type="checkbox"]:checked ~ span {
    border: 1.5px solid #da0000;
    background-color: #da0000;
  }

  & input[type="checkbox"]:checked ~ span:after {
    display: block;
  }

  & input[type="checkbox"]:disabled ~ span {
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

const LabelText = styled.div<CheckboxContainerProps>`
  height: 100%;
  font-weight: 400;
  color: #a4a4a4;
  line-height: -5.2rem;
  color: ${({ isFull }) => isFull && "#787878"};
  text-decoration: ${({ isFull }) => isFull && "line-through"};
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  font-weight: 600;
  width: 100%;
  margin-top: 3.2rem;
`;

const Button = styled.button`
  background-color: transparent;
  border: 0;
  font-size: 1.7rem;
  cursor: pointer;

  span {
    margin-right: 3.4rem;
  }
`;

const index = ({ classes }: any) => {
  const router = useRouter();
  const { studio } = router.query;
  const { register, handleSubmit } = useForm();
  const week = findThisWeek();

  const sortWeek = [...week].map((day) =>
    [...classes].filter(
      (aClass) =>
        // new Date(aClass.date.seconds * 1000)
        new Date(aClass.date.seconds * 1000).getDate() === day.getDate() &&
        new Date(aClass.date.seconds * 1000).getMonth() === day.getMonth()
    )
  );

  console.log(sortWeek);

  const regularClasses = [
    {
      name: "Narae",
      genre: "왁킹",
      time: "17:00",
      isFull: false,
    },
    {
      name: "Terry",
      genre: "힙합",
      time: "18:00",
      isFull: true,
    },
    {
      name: "Hanna",
      genre: "걸스힙합",
      time: "16:00",
      isFull: false,
    },
  ];

  const popUpClasses = [
    {
      name: "Narae",
      genre: "왁킹",
      time: "17:00",
      isFull: false,
    },
    {
      name: "Luke",
      genre: "힙합",
      time: "18:00",
      isFull: true,
    },
  ];

  useEffect(() => {
    if (!router.isReady) return;
  }, [router.isReady]);

  return (
    <Container>
      <ClassContainer>
        <ClassInformation>
          {typeof studio === "string" &&
            (/studio/gi.test(studio) ? <h1>{studio.toUpperCase()}</h1> : <h1>{`${studio.toUpperCase()} STUDIO`}</h1>)}
          <h2>클래스 신청 - 클래스 선택</h2>
        </ClassInformation>
        <CalenderContainer>
          <h3>
            날짜<span>(주간 공개)</span>
          </h3>
          <DateContainers>
            {week.map((day, index) => (
              <DateContainer key={`${day}_${index}`} order={index}>
                <div>{day.getDate()}</div>
                <div>{dayFormatter(day, index)}</div>
              </DateContainer>
            ))}
          </DateContainers>
        </CalenderContainer>

        <ClassRegistrationForm>
          <ClassRegistrationFormContainer>
            <h3>정규 클래스</h3>
            {regularClasses.map(({ name, genre, time, isFull }, index) => {
              return (
                <LabelContainer key={`${name} ${index}`}>
                  {isFull ? <input type="checkbox" onClick={() => false} disabled /> : <input type="checkbox" />}
                  <span></span>
                  <LabelTextContainer>
                    <LabelText isFull={isFull}>{`${name} ${genre}`}</LabelText>
                    <LabelText isFull={isFull}>{time}</LabelText>
                  </LabelTextContainer>
                </LabelContainer>
              );
            })}
          </ClassRegistrationFormContainer>
          <ClassRegistrationFormContainer>
            <h3>팝업 클래스</h3>
            {popUpClasses.map(({ name, genre, time, isFull }, index) => {
              return (
                <LabelContainer key={`${name} ${index}`}>
                  {isFull ? <input type="checkbox" onClick={() => false} disabled /> : <input type="checkbox" />}
                  <span></span>
                  <LabelTextContainer>
                    <LabelText isFull={isFull}>{`${name} ${genre}`}</LabelText>
                    <LabelText isFull={isFull}>{time}</LabelText>
                  </LabelTextContainer>
                </LabelContainer>
              );
            })}
          </ClassRegistrationFormContainer>
        </ClassRegistrationForm>
        <ButtonContainer
          onClick={() => router.push(`/form/studios/${studio}/coupon`, `/form/studios/${studio}/coupon`)}
        >
          <Button>
            <span>다음</span>&gt;
          </Button>
        </ButtonContainer>
      </ClassContainer>
    </Container>
  );
};

export default index;
