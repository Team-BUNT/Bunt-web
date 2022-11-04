import styles from "../../styles/Home.module.css";

import React from "react";
import Image from "next/image";

interface IStudioInformation {
  studioName: string;
  notice: string;
}

const StudioInformation = ({ studioName, notice }: IStudioInformation) => {
  return (
    <section className={styles.header}>
      <h1>{`${studioName} Studio`}</h1>
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

export default StudioInformation;
