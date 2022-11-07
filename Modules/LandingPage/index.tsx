/* eslint-disable jsx-a11y/alt-text */
import Image from "next/image";
import { useRouter } from "next/router";

import React from "react";

import styled from "styled-components";
import HeadMeta from "../../Components/HeadMeta";

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

const index = () => {
  const buntIcon = `/bunt.png`;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();
  return (
    <Container>
      <HeadMeta title="Bunt"></HeadMeta>
      <Header>
        <Image src={buntIcon} width={125} height={125} alt="Bunt logo"></Image>
      </Header>
      <Section>
        <div>
          <BuntGreeting>
            <h2>Bunt</h2>
            <h3>Dance Platform Service</h3>
          </BuntGreeting>
          <BuntSlogan>
            <span>댄스 스튜디오 운영</span>
            <span>BUNT에서 쉽고 간편하게</span>
            <span>LIFE IS ON STAGE</span>
          </BuntSlogan>
          <Button onClick={() => router.push("/form/studios", "/form/studios")}>
            <span>클래스 신청하러 가기</span> <Image src="/landingPage/ButtonArrow.png" width={18} height={17}></Image>
          </Button>
        </div>
        <BottomImageContainer>
          <Image src="/landingPage/Dance.png" width={720} height={270}></Image>
        </BottomImageContainer>
      </Section>
    </Container>
  );
};

export default index;
