/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable jsx-a11y/alt-text */

import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";

import React, { useEffect, useState } from "react";

import styled from "styled-components";
import useSWR from "swr";
import HeadMeta from "../../Components/HeadMeta";

const Root = styled.main`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100vh;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  height: 12.5rem;
  margin-top: 1.2rem;
  margin-left: 1.2rem;
`;

const Section = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  text-align: center;
  position: relative;
`;

const BuntGreeting = styled.div`
  font-family: "Montserrat", sans-serif;
  width: 26.7rem;
  font-weight: 800;
  font-size: 1.8rem;
  line-height: 2.6rem;
  h3 {
    font-weight: 200;
    font-size: 1.6rem;
  }
`;

const BuntSlogan = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 3.5rem;
  font-size: 1.5rem;
  line-height: 2.6rem;
  font-family: "SF Pro Display", sans-serif;

  span:nth-child(3) {
    font-family: "Montserrat", sans-serif;
    font-weight: bold;
    color: #da0000;
  }
`;

const Button = styled.button`
  width: 26.7rem;
  color: black;
  background-color: #ffffff;
  height: 5rem;
  border-radius: 1rem;
  font-size: 1.6rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  padding: 0 4rem;
  border: 0;
  margin-top: 5.2rem;
  cursor: pointer;
  span {
    margin-right: 1.7rem;
  }

  Image {
    color: #da0000;
  }
`;

const BottomImageContainer = styled.div`
  padding: 0;
  margin: 0;
`;

const fetcher = (url: string) => axios.get(url);

const index = () => {
  const buntIconImage = `/bunt.png`;
  const danceImage = `/landingPage/Dance.png`;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();

  return (
    <Root>
      <Container>
        <HeadMeta title="Bunt"></HeadMeta>
        <Header>
          <Image
            src={buntIconImage}
            width={125}
            height={125}
            alt="Bunt logo"
          ></Image>
        </Header>
        <Section>
          <div>
            <BuntGreeting>
              <h2>Bunt</h2>
              <h3>Dance Platform Service</h3>
            </BuntGreeting>
            <BuntSlogan>
              <span>?????? ???????????? ??????</span>
              <span>BUNT?????? ?????? ????????????</span>
              <span>LIFE IS ON STAGE</span>
            </BuntSlogan>
            <Button
              onClick={() => router.push("/form/studios", "/form/studios")}
            >
              <span>????????? ???????????? ??????</span>{" "}
            </Button>
          </div>
          <BottomImageContainer>
            <Image src={danceImage} width={720} height={270}></Image>
          </BottomImageContainer>
        </Section>
      </Container>
    </Root>
  );
};

export default index;
