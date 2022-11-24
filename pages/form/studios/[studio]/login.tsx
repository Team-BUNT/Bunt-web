/* eslint-disable react-hooks/rules-of-hooks */

import React from "react";
import Student from "../../../../Modules/Registration/Student/index";
import { getAllStudios, getStudio } from "../../../api/studios";

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

const login = ({ targetStudio }: any) => {
  return <Student studio={targetStudio}></Student>;
};

export default login;

export async function getServerSideProps(context: any) {
  const { studio } = context.query;
  const targetStudio = await getStudio(studio);

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
      targetStudio: targetStudio && targetStudio[0],
    },
  };
}
