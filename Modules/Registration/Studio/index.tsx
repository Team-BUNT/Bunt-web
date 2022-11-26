/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/rules-of-hooks */

import { useRouter } from "next/router";
import Image from "next/image";
import userSWR from "swr";

import styled from "styled-components";
import { useEffect, useState } from "react";
import axios from "axios";
import useSWR from "swr";

interface IStudioInfo {
  name: string;
  url: string;
}

const Container = styled.section`
  width: 100%;
  margin: 0 auto;
  height: auto;
  display: flex;
  justify-content: center;
`;

const ClassContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 76.2rem;
`;

const ClassTitle = styled.div`
  display: flex;
  font-size: 1.6rem;
  font-weight: bold;
  margin-left: 2rem;
  margin-top: 1.1rem;
`;

const ClassLogo = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 1.1rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: repeat(1fr);
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 100%;
  cursor: pointer;
`;

const index = () => {
  const router = useRouter();
  const [studios, setStudios] = useState<IStudioInfo[]>([]);

  const fetcher = async (url: string) => await axios.get(url);
  const { data, error } =
    process.env.NEXT_PUBLIC_MODE === "development"
      ? useSWR(
          `${process.env.NEXT_PUBLIC_DEVELOPMENT_URL}/api/studio/getAllStudio`,
          fetcher
        )
      : useSWR(
          `${process.env.NEXT_PUBLIC_PRODUCTION_URL}/api/studio/getAllStudio`,
          fetcher
        );

  //TODO: Error 페이지 구현
  if (error) return <h1>데이터를 가져오지 못해 에러가 발생했습니다.</h1>;

  useEffect(() => {
    if (data) {
      setStudios((state: IStudioInfo[]) => {
        const studioInfo = [...data.data].map(({ name }) => {
          return {
            name,
            url: `/studios/${name}.webp`,
          };
        });

        return [...state, ...studioInfo];
      });
    }
  }, [data]);

  //TODO: Loading page 구현
  // if (!data) return <div>loaidng</div>;

  return (
    <Container>
      <ClassContainer>
        <ClassTitle>
          <div>클래스 신청하러 가기</div>
        </ClassTitle>
        <ClassLogo>
          {studios.map(({ name, url }, index) => (
            <ImageContainer
              key={`${name}${index}`}
              onClick={() => router.push(`/form/studios/login/${name}`)}
            >
              <Image
                layout="responsive"
                objectFit="cover"
                width={362}
                height={283}
                src={url}
                priority
              ></Image>
            </ImageContainer>
          ))}
        </ClassLogo>
      </ClassContainer>
    </Container>
  );
};

export default index;
