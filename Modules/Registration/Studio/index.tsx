/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import { firestorage } from "../../../Domains/firebase";

import { getDownloadURL, ref } from "firebase/storage";
import styled from "styled-components";
import Image from "next/image";
import { GetStaticProps } from "next";

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
`;

const index = () => {
  const [urls, setUrl] = useState<string[]>([]);

  const studios = ["bunt", "nfstudio", "movidic", "bonafide"];
  const getStudiosUrls = (studios: string[]) => {
    studios.forEach((studio) => {
      const starsRef = ref(firestorage, `/studios/${studio}.png`);
      getDownloadURL(starsRef)
        .then((url) => {
          setUrl((urls) => [url, ...urls]);
        })
        .catch((error) => {
          switch (error.code) {
            case "storage/object-not-found":
              break;
            case "storage/unauthorized":
              break;
            case "storage/canceled":
              break;
            case "storage/unknown":
              break;
          }
        });
    });
  };
  //TODO: Server side prop으로 리팩토링하기
  useEffect(() => {
    getStudiosUrls(studios);
  }, []);

  return (
    <Container>
      <ClassContainer>
        <ClassTitle>
          <div>클래스 신청하러 가기</div>
        </ClassTitle>
        <ClassLogo>
          {urls
            .filter((url, i) => urls.indexOf(url) === i)
            .map((url, index) => (
              <ImageContainer key={`${url}${index}`}>
                <Image layout="responsive" objectFit="cover" width={362} height={283} src={url}></Image>
              </ImageContainer>
            ))}
        </ClassLogo>
      </ClassContainer>
    </Container>
  );
};

export async function getStaticProps() {
  const studios = ["bunt", "nfstudio", "movidic", "bonafide"];
  console.log(studios);
  const getStudiosUrls = (studios: string[]) => {
    console.log(studios);
    return studios.map((studio) => {
      const starsRef = ref(firestorage, `/studios/${studio}.png`);
      getDownloadURL(starsRef)
        .then((url) => url)
        .catch((error) => {
          switch (error.code) {
            case "storage/object-not-found":
              break;
            case "storage/unauthorized":
              break;
            case "storage/canceled":
              break;
            case "storage/unknown":
              break;
          }
        });
    });
  };

  return {
    props: {
      studios: getStudiosUrls(studios),
    },
  };
}

export default index;
