/* eslint-disable @next/next/no-page-custom-font */
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
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
        rel="stylesheet"
      ></link>
      <link href="https://fonts.cdnfonts.com/css/sf-pro-display" rel="stylesheet"></link>
    </Head>
  );
};

export default HeadMeta;
