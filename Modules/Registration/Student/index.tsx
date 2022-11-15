/* eslint-disable react-hooks/rules-of-hooks */
import testImage from "../../../public/studios/BuntStudentViewTestImage.png";
import { Student, Studio } from "../../../Domains/hooks/Firestore";
import { firestore } from "../../../Domains/firebase";

import Image from "next/image";
import { useRouter } from "next/router";

import { useForm } from "react-hook-form";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { getStudio } from "../../../pages/api/studios";

interface INotice {
  bankAccount: string;
  description: string;
  imageURL: string;
}

interface IHall {
  name: string;
  capacity: number;
}

interface IStudio {
  ID: string;
  location: string;
  name: string;
  notice: INotice[];
  halls: IHall[];
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

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const StudioDescription = styled.div`
  color: #787878;
  font-size: 1.5rem;
  font-weight: 400;
  line-height: 2.2rem;
  word-break: keep-all;
  margin-top: 2rem;
`;

const ClassRegistrationForm = styled.form`
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

  input[type="number"]::-webkit-outer-spin-button,
  input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  p {
    margin-top: 2rem;
    font-size: 1.5rem;
    padding-left: 1rem;
    color: #da0000;
  }
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

const index = ({ studio, url }: any) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  /**
   * Studio
   * ID: string;
   * location: string;
   * name: string;
   * notice: {
   *  bankAccount: string;
   *  description: string;
   * };
   * halls: IHall[];
   */
  const { name } = studio;
  const { description } = studio.notice;

  return (
    <Container>
      <StudioContainer>
        <StudioInformation>
          {typeof name === "string" &&
            (/studio/gi.test(name) ? <h1>{name.toUpperCase()}</h1> : <h1>{`${name.toUpperCase()} STUDIO`}</h1>)}
          <h2>클래스 신청 - 개인정보</h2>
          <ImageContainer>
            <Image src={url} alt="Studio Image" objectFit="cover" width={660} height={218}></Image>
          </ImageContainer>
          <StudioDescription>{description}</StudioDescription>
        </StudioInformation>
        <ClassRegistrationForm
          onSubmit={handleSubmit(async ({ name, phone }) => {
            const studentClass = new Student(firestore, "student");

            const allStudent = await studentClass.fetchData();
            const allStudio = await new Studio(firestore, "studios").fetchData();

            const studioId =
              !(allStudio instanceof Error) && [...allStudio].filter((aStudio) => aStudio.name === studio)[0].ID;

            const hasStudent =
              !(allStudent instanceof Error) &&
              allStudent.filter((aStudent) => aStudent.name === name && aStudent.phoneNumber === phone).length !== 0;

            if (hasStudent) {
              try {
                router.push(`/form/studios/${name}/class`, {
                  query: {
                    name,
                    phone,
                  },
                  pathname: `/form/studios/${name}/class`,
                });
                return;
              } catch (error) {
                console.error(error);
              }
            }

            try {
              studentClass.addData({
                ID: `${studioId} ${phone}`,
                coupons: [],
                enrollments: [],
                name,
                phoneNumber: phone,
                studioID: studioId,
                subPhoneNumber: "",
              });
              router.push(`/form/studios/${name}/class`, {
                query: {
                  name,
                  phone,
                },
                pathname: `/form/studios/${name}/class`,
              });
              return;
            } catch (error) {
              console.error(error);
            }
          })}
        >
          <LabelContainer>
            <label htmlFor="studentName">
              이름
              <input
                type="text"
                id="studentName"
                placeholder="Ex. 김민수(김민수)"
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
            {errors.name && <p>{errors.name.message}</p>}
          </LabelContainer>
          <LabelContainer>
            <label htmlFor="studentPhone">
              연락처
              <input
                type="text"
                id="studentPhone"
                placeholder="01050946369"
                {...register("phone", {
                  required: "번호를 입력해주세요.",
                  minLength: {
                    value: 10,
                    message: "번호는 최소 10글자 이상입니다.",
                  },
                  maxLength: {
                    value: 11,
                    message: "번호는 최대 11글자 입니다.",
                  },
                  pattern: {
                    value: /^[0-9]{10,11}$/,
                    message: "적절한 양식으로 번호를 입력해주세요. (Ex. 01012345678)",
                  },
                })}
              />
            </label>
            {errors.phone && <p>{errors.phone.message}</p>}
          </LabelContainer>
          <ButtonContainer>
            <Button type="submit">
              <span>다음</span>&gt;
            </Button>
          </ButtonContainer>
        </ClassRegistrationForm>
      </StudioContainer>
    </Container>
  );
};

export default index;
