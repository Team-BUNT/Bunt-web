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

const StudioContainer = styled.div`
  width: 100%;
  max-width: 660px;
  min-width: 390px;
  margin-top: 2.5rem;
  margin-bottom: 2.5rem;
`;

const StudioInformation = styled.div`
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
    font-weight: 500;
  }
`;

const CalenderContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1.7rem;

  span {
    font-size: 1.5rem;
    color: #787878;
  }
`;

const DateContainers = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1.3rem;
`;

const DateContainer = styled.div<DateContainerProps>`
  color: ${(props) => props.order === 0 && "red"};
  text-align: center;
`;

const StudioDescription = styled.div`
  color: #787878;
  font-size: 1.5rem;
  font-weight: 400;
  line-height: 2.2rem;
  word-break: keep-all;
  margin-top: 2rem;
`;

const StudentEnrollmentForm = styled.form`
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

const LabelContainer = styled.div`
  margin-top: 3rem;

  input {
    font-size: 1.5rem;
    font-weight: 400;
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
      <StudioContainer>
        <StudioInformation>
          {typeof studio === "string" &&
            (/studio/gi.test(studio) ? <h1>{studio.toUpperCase()}</h1> : <h1>{`${studio.toUpperCase()} STUDIO`}</h1>)}
          <h2>클래스 신청 - 클래스 선택</h2>
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
          <StudioDescription>
            각 스튜디오에 해당하는 description 가져오기 각 스튜디오에 해당하는 description 가져오기 각 스튜디오에
            해당하는 description 가져오기 각 스튜디오에 해당하는 description 가져오기
          </StudioDescription>
        </StudioInformation>
        <StudentEnrollmentForm>
          <LabelContainer>
            <label htmlFor="studentName">
              이름 (입금자명)
              <input type="text" id="studentName" placeholder="Ex. 김민수(김민수)" {...register("name")} />
            </label>
          </LabelContainer>
          <LabelContainer>
            <label htmlFor="studentPhone">
              연락처
              <input type="text" id="studentPhone" placeholder="01050946369" {...register("phone")} />
            </label>
          </LabelContainer>
        </StudentEnrollmentForm>
        <ButtonContainer onClick={() => router.push(`/form/studios/${studio}/class`, `/form/studios/${studio}/class`)}>
          <Button>
            <span>다음</span>&gt;
          </Button>
        </ButtonContainer>
      </StudioContainer>
    </Container>
  );
};

export default index;
