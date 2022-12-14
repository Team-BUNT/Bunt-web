/* eslint-disable react-hooks/rules-of-hooks */

import Image from "next/image";
import { useRouter } from "next/router";

import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useEffect, useState } from "react";
import useSWR from "swr";
import axios from "axios";

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
  name: string;
  url: string;
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

const index = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { studio } = router.query;

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

  const [matchedStudio, setMatchedStudio] = useState<IStudio>({
    ID: "",
    name: "",
    location: "",
    notice: { description: "" },
  });
  const [studioInfo, setStudioInfo] = useState({
    name: "",
    url: "",
  });

  //TODO: Error ????????? ??????
  useEffect(() => {
    if (!router.isReady) return;

    const fetcher = async (url: string, postData = {}) =>
      await axios.post(url, postData);

    const aStudio =
      process.env.NEXT_PUBLIC_MODE === "development"
        ? fetcher(
            `${process.env.NEXT_PUBLIC_DEVELOPMENT_URL}/api/studio/getStudio`,
            {
              studioName: studio,
            }
          )
        : fetcher(`/api/studio/getStudio`, {
            studioName: studio,
          });

    aStudio.then((data) => {
      setMatchedStudio((_) => {
        return { ...data.data };
      });

      const { name } = data.data;
      setStudioInfo((_) => {
        return {
          name,
          url: `/studios/banner/${studio}.webp`,
        };
      });
    });
  }, [router.isReady]);

  //TODO: Error Loading page ??????
  // if (error) return <h1>???????????? ???????????? ?????? ????????? ??????????????????.</h1>;
  // if (!data) return <div>loaidng</div>;

  const onSubmit = async ({ studentName, studentPhone }: any) => {
    const fetcher = async (url: string, postData = {}) =>
      await axios.post(url, postData);
    const matchedStudent =
      process.env.NEXT_PUBLIC_MODE === "development"
        ? await fetcher(
            `${process.env.NEXT_PUBLIC_DEVELOPMENT_URL}/api/student/getStudent`,
            {
              phone: studentPhone,
            }
          )
        : await fetcher(`/api/student/getStudent`, {
            phone: studentPhone,
          });

    const matchedStudio =
      process.env.NEXT_PUBLIC_MODE === "development"
        ? await fetcher(
            `${process.env.NEXT_PUBLIC_DEVELOPMENT_URL}/api/studio/getStudio`,
            {
              studioName: studioInfo.name,
            }
          )
        : await fetcher(`/api/studio/getStudio`, {
            studioName: studioInfo.name,
          });

    if (matchedStudent.data) {
      try {
        router.push(`/form/studios/class/${studioInfo.name}`, {
          query: {
            studioId: matchedStudio.data.ID,
            studioName: studio,
            studentName,
            studentPhone,
          },
          pathname: `/form/studios/class/${studioInfo.name}`,
        });
        return;
      } catch (error) {
        console.error(error);
      }
    }

    try {
      process.env.NEXT_PUBLIC_MODE === "development"
        ? await fetcher(
            `${process.env.NEXT_PUBLIC_DEVELOPMENT_URL}/api/student/addStudent`,
            {
              studioId: matchedStudio.data.ID,
              studentPhone,
              studentName,
            }
          )
        : await fetcher(`/api/student/addStudent`, {
            studioId: matchedStudio.data.ID,
            studentPhone,
            studentName,
          });

      router.push(`/form/studios/class/${studioInfo.name}`, {
        query: {
          studioName: studio,
          studentName,
          studentPhone,
        },
        pathname: `/form/studios/class/${studioInfo.name}`,
      });
      return;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <StudioContainer>
        <StudioInformation>
          {typeof studio === "string" &&
            (/studio/gi.test(studio) ? (
              <h1>{studio.toUpperCase()}</h1>
            ) : (
              <h1>{`${studio.toUpperCase()} STUDIO`}</h1>
            ))}
          <h2>????????? ?????? - ????????????</h2>
          <ImageContainer>
            {studioInfo.url && (
              <Image
                src={studioInfo.url}
                alt="Studio Image"
                objectFit="cover"
                width={660}
                height={218}
              ></Image>
            )}
          </ImageContainer>
          <StudioDescription>
            {matchedStudio.notice?.description}
          </StudioDescription>
        </StudioInformation>
        <ClassRegistrationForm onSubmit={handleSubmit(onSubmit)}>
          <LabelContainer>
            <label htmlFor="studentName">
              ??????
              <input
                type="text"
                id="studentName"
                placeholder="Ex. ?????????(?????????)"
                {...register("studentName", {
                  required: "????????? ??????????????????.",
                  minLength: {
                    value: 2,
                    message: "????????? 2?????? ???????????????.",
                  },
                  maxLength: {
                    value: 4,
                    message: "????????? 4?????? ???????????????.",
                  },
                })}
              />
            </label>
            <p>
              {errors.studentName && (errors.studentName.message as string)}
            </p>
          </LabelContainer>
          <LabelContainer>
            <label htmlFor="studentPhone">
              ?????????
              <input
                type="text"
                id="studentPhone"
                placeholder="01050946369"
                {...register("studentPhone", {
                  required: "????????? ??????????????????.",
                  minLength: {
                    value: 10,
                    message: "????????? ?????? 10?????? ???????????????.",
                  },
                  maxLength: {
                    value: 11,
                    message: "????????? ?????? 11?????? ?????????.",
                  },
                  pattern: {
                    value: /^[0-9]{10,11}$/,
                    message:
                      "????????? ???????????? ????????? ??????????????????. (Ex. 01012345678)",
                  },
                })}
              />
            </label>
            <p>{errors.phone && (errors.phone.message as string)}</p>
          </LabelContainer>
          <ButtonContainer>
            <Button type="submit">
              <span>??????</span>&gt;
            </Button>
          </ButtonContainer>
        </ClassRegistrationForm>
      </StudioContainer>
    </Container>
  );
};

export default index;
