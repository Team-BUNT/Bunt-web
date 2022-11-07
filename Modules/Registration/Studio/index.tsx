/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import { firestorage } from "../../../Domains/firebase";

import { getDownloadURL, getStorage, ref } from "firebase/storage";
import styled from "styled-components";

const Container = styled.section`
  width: 100%;

  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const index = () => {
  const [url, setUrl] = useState("");

  // useEffect(() => {
  //   const starsRef = ref(firestorage, "/studios/nfstudio.png");
  //   getDownloadURL(starsRef)
  //     .then((url) => {
  //       console.log(url);
  //       setUrl(url);
  //     })
  //     .catch((error) => {
  //       switch (error.code) {
  //         case "storage/object-not-found":
  //           break;
  //         case "storage/unauthorized":
  //           break;
  //         case "storage/canceled":
  //           break;
  //         case "storage/unknown":
  //           break;
  //       }
  //     });
  // }, []);

  return (
    <Container>
      <div>클래스 신청하러 가기</div>
      <div>div</div>
    </Container>
  );
};

export default index;
