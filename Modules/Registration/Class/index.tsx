/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { FieldValues, useForm } from "react-hook-form";
import styled from "styled-components";
import { findThisWeek } from "../../../Domains/findThisWeek";
import { dayFormatter } from "../../../Domains/dayFormatter";
import { Class } from "../../../Domains/hooks/Firestore";
import { firestore } from "../../../Domains/firebase";
import { Timestamp, where } from "firebase/firestore";
import { dateFormatter } from "../../../Domains/\bdateFormatter";

interface DateContainerProps {
  order: number;
}

interface CheckboxContainerProps {
  applicantsCount: number;
  capacity: number;
}

interface INotice {
  description: string;
}

interface IHall {
  name: string;
  capacity: number;
}

interface IStudio {
  ID: string;
  name?: string;
  location?: string;
  notice?: INotice;
  halls?: IHall[];
}

interface IStudioInfo {
  studioId: string | null;
  studioName: string | null;
}

interface IStudentInfo {
  studentName: string | null;
  studentPhone: string | null;
}

interface IClasses {
  ID: string;
  applicantsCount: number;
  date: Timestamp;
  hall: IHall;
  instructorName: string;
  isPopUp: boolean;
  studioID: string;
  title: string;
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
  border-radius: 1rem;
  cursor: pointer;

  div:nth-child(1) {
    padding: 1.2rem;
  }

  div:nth-child(2) {
    margin-top: 1.2rem;
  }

  &:hover {
    background-color: #4b4b4b;
    transition: 0.5s ease-in-out;
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
  h3 {
    padding-top: 3rem;
    margin-top: 3rem;
    border-top: 0.1rem solid #363636;
  }
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

const LabelText = styled.div<CheckboxContainerProps>`
  height: 100%;
  font-weight: 400;
  color: #a4a4a4;
  line-height: -5.2rem;
  color: ${({ capacity, applicantsCount }) =>
    capacity <= applicantsCount && "#787878"};
  text-decoration: ${({ capacity, applicantsCount }) =>
    capacity <= applicantsCount && "line-through"};
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

const index = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [day, setDay] = useState(0);
  const [studio, setStudioInfo] = useState<IStudioInfo>();
  const [student, setStudentInfo] = useState<IStudentInfo>();
  const [classes, setClasses] = useState<IClasses[]>([]);

  useEffect(() => {
    if (!router.isReady) return;
  }, [router.isReady]);

  useEffect(() => {
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
  }, []);

  const week = findThisWeek();
  const start = week[0];
  const end = week[week.length - 1];

  useEffect(() => {
    if (studio?.studioId) {
      new Class(firestore, "classes", [
        where("date", ">=", new Date(dateFormatter(start, "-"))),
        where("date", "<=", new Date(dateFormatter(end, "-"))),
      ])
        .fetchData()
        .then((data: any) =>
          setClasses(() => {
            return [...data];
          })
        )
        .catch((error) => console.error(error));
    }
  }, [studio?.studioId]);

  const dateOnClick = (event: React.MouseEvent, order: number) => setDay(order);

  const onSubmit = async (
    { classId }: FieldValues,
    e: React.BaseSyntheticEvent<object, any, any> | undefined
  ) => {
    e?.preventDefault();

    if (!classId) return alert("수업을 하나라도 선택해야 합니다.");

    try {
      if (studio?.studioName) {
        router.push({
          query: {
            classId,
            studioId: studio?.studioId,
            studioName: studio.studioName,
            studentName: student?.studentName,
            studentPhone: student?.studentPhone,
          },
          pathname: `/form/studios/coupon/${studio.studioName}`,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <ClassContainer>
        <ClassInformation>
          {typeof studio?.studioName === "string" &&
            (/studio/gi.test(studio?.studioName) ? (
              <h1>{studio?.studioName.toUpperCase()}</h1>
            ) : (
              <h1>{`${studio?.studioName.toUpperCase()} STUDIO`}</h1>
            ))}
          <h2>클래스 신청 - 클래스 선택</h2>
        </ClassInformation>
        <CalenderContainer>
          <h3>
            날짜<span>(주간 공개)</span>
          </h3>
          <DateContainers>
            {week.map((day, index) => (
              <DateContainer
                key={`${day}_${index}`}
                order={index}
                onClick={(event) => dateOnClick(event, index)}
              >
                <div>{day.getDate()}</div>
                <div>{dayFormatter(day, index)}</div>
              </DateContainer>
            ))}
          </DateContainers>
        </CalenderContainer>

        <ClassRegistrationForm onSubmit={handleSubmit(onSubmit)}>
          <ClassRegistrationFormContainer>
            <h3>정규 클래스</h3>
            {[...classes]
              .filter((value) => !value.isPopUp)
              .filter((value) => value.date.toDate().getDay() === day)
              .length === 0 ? (
              <LabelContainer>
                <LabelText capacity={1} applicantsCount={1}>
                  수업이 없습니다.
                </LabelText>
              </LabelContainer>
            ) : (
              [...classes]
                .filter((value) => !value.isPopUp)
                .filter((value) => value.date.toDate().getDay() === day)
                .map(
                  (
                    { ID, instructorName, title, date, applicantsCount, hall },
                    index
                  ) => {
                    return (
                      <LabelContainer key={`${instructorName} ${index}`}>
                        {hall.capacity <= applicantsCount ? (
                          <input type="radio" onClick={() => false} disabled />
                        ) : (
                          <input
                            type="radio"
                            id="dancer"
                            value={`${ID}`}
                            {...register(`classId`)}
                          />
                        )}
                        <span></span>
                        <LabelTextContainer>
                          <LabelText
                            applicantsCount={applicantsCount}
                            capacity={hall.capacity}
                          >{`${instructorName} ${title}`}</LabelText>
                          <LabelText
                            applicantsCount={applicantsCount}
                            capacity={hall.capacity}
                          >{`${String(
                            new Date(date.seconds * 1000).getHours()
                          ).padStart(2, "0")}:${String(
                            new Date(date.seconds * 1000).getMinutes()
                          ).padStart(2, "0")}`}</LabelText>
                        </LabelTextContainer>
                      </LabelContainer>
                    );
                  }
                )
            )}

            <h3>팝업 클래스</h3>
            {[...classes]
              .filter((value) => value.isPopUp)
              .filter((value) => value.date.toDate().getDay() === day)
              .length === 0 ? (
              <LabelContainer>
                <LabelText capacity={1} applicantsCount={1}>
                  수업이 없습니다.
                </LabelText>
              </LabelContainer>
            ) : (
              [...classes]
                .filter((value) => value.isPopUp)
                .filter((value) => value.date.toDate().getDay() === day)
                .map(
                  (
                    { instructorName, title, date, applicantsCount, hall },
                    index
                  ) => {
                    return (
                      <LabelContainer key={`${instructorName} ${index}`}>
                        {hall.capacity <= applicantsCount ? (
                          <input type="radio" onClick={() => false} disabled />
                        ) : (
                          <input
                            type="radio"
                            id="dancer"
                            value={`${instructorName}`}
                            {...register("classId")}
                          />
                        )}
                        <span></span>
                        <LabelTextContainer>
                          <LabelText
                            applicantsCount={applicantsCount}
                            capacity={hall.capacity}
                          >{`${instructorName} ${title}`}</LabelText>
                          <LabelText
                            applicantsCount={applicantsCount}
                            capacity={hall.capacity}
                          >{`${String(
                            new Date(date.seconds * 1000).getHours()
                          ).padStart(2, "0")}:${String(
                            new Date(date.seconds * 1000).getMinutes()
                          ).padStart(2, "0")}`}</LabelText>
                        </LabelTextContainer>
                      </LabelContainer>
                    );
                  }
                )
            )}
          </ClassRegistrationFormContainer>

          <ButtonContainer>
            <Button type="submit">
              <span>다음</span>&gt;
            </Button>
          </ButtonContainer>
        </ClassRegistrationForm>
      </ClassContainer>
    </Container>
  );
};

export default index;
