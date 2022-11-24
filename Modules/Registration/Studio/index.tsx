/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/rules-of-hooks */

import { useRouter } from "next/router";
import Image from "next/image";

import styled from "styled-components";
import { useEffect } from "react";

interface IClass {
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

const index = ({ studioNames }: any) => {
  const router = useRouter();

  const studioInfo = Array.from({ length: studioNames.length }).map(
    (_, index) => {
      return {
        name: studioNames[index],
        url: `/studios/${studioNames[index]}.webp`,
      };
    }
  );

  return (
    <Container>
      <ClassContainer>
        <ClassTitle>
          <div>클래스 신청하러 가기</div>
        </ClassTitle>
        <ClassLogo>
          {studioInfo.map(({ name, url }, index) => (
            <ImageContainer
              key={`${name}${index}`}
              onClick={() => router.push(`/form/studios/${name}/login`)}
            >
              <Image
                layout="responsive"
                objectFit="cover"
                width={362}
                height={283}
                src={url}
              ></Image>
            </ImageContainer>
          ))}
        </ClassLogo>
      </ClassContainer>
    </Container>
  );
};

export default index;
