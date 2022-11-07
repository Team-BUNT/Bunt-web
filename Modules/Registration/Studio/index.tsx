/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import { firestorage } from "../../../Domains/firebase";

import { getDownloadURL, getStorage, ref } from "firebase/storage";
import styled from "styled-components";
import Image from "next/image";

const Container = styled.section`
  width: 100%;

  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const index = () => {
  const [urls, setUrl] = useState<string[]>([]);

  useEffect(() => {
    const studios = ["nfstudio", "movidic", "bonafide"];

    studios.forEach((studio) => {
      const starsRef = ref(firestorage, `/studios/${studio}.png`);
      getDownloadURL(starsRef)
        .then((url) => {
          setUrl([...urls, url]);
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
  }, []);

  return (
    <Container>
      <div>클래스 신청하러 가기</div>
      <div>
        {urls.map((url, index) => (
          <div key={`${url}${index}`}>
            <Image width={50} height={50} src={url}></Image>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default index;
