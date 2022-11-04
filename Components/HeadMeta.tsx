import Head from "next/head";
import React from "react";

interface IMeta {
  title: string;
  studio?: string;
}

const HeadMeta = ({ title }: IMeta) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content="스튜디오 클래스별 신청폼 작성을 도와주는 서비스입니다." />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};

export default HeadMeta;
