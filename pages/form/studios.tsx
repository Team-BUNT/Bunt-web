import Studios from "../../Modules/Registration/Studio/index";

import React from "react";
import { getAllStudios } from "../api/studios";

interface INotice {
  bankAccount: string;
  description: string;
  imageURL: string;
}

interface IHall {
  name: string;
  capacity: number;
}

interface IStudio {
  ID: string;
  location: string;
  name: string;
  notice: INotice[];
  halls: IHall[];
}

const studios = ({ studioNames }: any) => {
  return <Studios studioNames={studioNames}></Studios>;
};

export default studios;

export async function getStaticProps() {
  const studioNames = await getAllStudios();

  // if (!results) {
  //   return {
  //     redirect: {
  //       destination: "/",
  //       permanent: false,
  //     },
  //   };
  // }

  return {
    props: {
      studioNames,
    },
  };
}
