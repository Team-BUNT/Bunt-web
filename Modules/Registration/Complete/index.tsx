/* eslint-disable jsx-a11y/alt-text */
import Image from "next/image";
import { useRouter } from "next/router";

import React from "react";

import styled from "styled-components";
import HeadMeta from "../../../Components/HeadMeta";

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
  font-weight: 600;
  font-size: 2rem;
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
  font-weight: 400;
  letter-spacing: 0.03rem;
  font-family: "SF Pro Display", sans-serif;
`;

const Button = styled.button`
  width: 20rem;
  color: black;
  background-color: #ffffff;
  height: 5rem;
  border-radius: 1rem;
  font-size: 1.6rem;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 4rem;
  border: 0;
  margin: 0 auto;
  margin-top: 5.2rem;
  cursor: pointer;
`;

const BottomImageContainer = styled.div`
  padding: 0;
  margin: 0;
`;

const TextYellow = styled.span`
  color: #bcb628;
`;

const index = () => {
  const buntIcon = `/bunt.png`;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();
  return (
    <Root>
      <Container>
        <HeadMeta title="Bunt"></HeadMeta>
        <Header>
          <Image src={buntIcon} width={125} height={125} alt="Bunt logo"></Image>
        </Header>
        <Section>
          <div>
            <BuntGreeting>
              <h2>신청 완료</h2>
              <h3>Dance Platform Service</h3>
            </BuntGreeting>
            <BuntSlogan>
              <span>클래스 신청이 완료되었습니다.</span>
              <span>
                자세한 신청 내용은 <TextYellow>카카오 알림톡</TextYellow>을 통해
              </span>
              <span>확인해주시기 바랍니다.</span>
            </BuntSlogan>
            <Button onClick={() => router.push("/", "/")}>
              <span>처음으로 돌아가기</span>
            </Button>
          </div>
          <BottomImageContainer>
            <Image src="/landingPage/Dance.png" width={720} height={270}></Image>
          </BottomImageContainer>
        </Section>
      </Container>
    </Root>
  );
};

export default index;
