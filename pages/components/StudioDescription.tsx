import styles from "../../styles/Home.module.css";

import React from "react";
import Image from "next/image";

interface IStudioDescription {
  studioName: string;
  notice: string;
}

const ClassDescription = ({ studioName, notice }: IStudioDescription) => {
  return (
    <section className={styles.header}>
      <h1> BUNT STUDIO 사전 신청 </h1>
      <h2>공지사항</h2>
      <div className={styles.description}>
        <div>{notice}</div>
      </div>

      <Image
        src={`/studios/${studioName}Logo.png`}
        alt={`${studioName} image`}
        width={1200}
        height={675}
        objectFit="cover"
      ></Image>
    </section>
  );
};

export default ClassDescription;
