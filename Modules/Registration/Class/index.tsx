/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { findThisWeek } from "../../../Domains/findThisWeek";
import { dayFormatter } from "../../../Domains/dayFormatter";

interface DateContainerProps {
  order: number;
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

{
  /*
    <label className={styles.checkBoxContainer}>
      <input type="checkbox" {...register(classID)} onChange={checkHandler} />
      <span className={styles.checkmark}></span>
    </label> 
*/
}

const ClassRegistrationForm = styled.form`
  width: 100%;
  max-width: 660px;
  min-width: 390px;
  padding-top: 3rem;
  margin-top: 3rem;
  border-top: 0.1rem solid #363636;

  h3 {
    font-size: 1.7rem;
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

const LabelContainer = styled.label`
  display: block;
  position: relative;
  padding-left: 35px;
  margin-bottom: 12px;
  cursor: pointer;
  font-size: 22px;
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

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;

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

const index = () => {
  const router = useRouter();
  const { studio } = router.query;
  const { register, handleSubmit } = useForm();
  const week = findThisWeek();

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
          <h3>정규 클래스</h3>
          <LabelContainer>
            <input type="checkbox" />
            <span></span>
          </LabelContainer>
        </ClassRegistrationForm>
        <ButtonContainer onClick={() => router.push(`/form/studios/${studio}/class`, `/form/studios/${studio}/class`)}>
          <Button>
            <span>다음</span>&gt;
          </Button>
        </ButtonContainer>
      </ClassContainer>
    </Container>
  );
};

export default index;
