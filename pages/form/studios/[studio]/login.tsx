/* eslint-disable react-hooks/rules-of-hooks */
import { useRouter } from "next/router";
import React from "react";
import Student from "../../../../Modules/Registration/Student/index";
import { getStudio } from "../../../api/studios";

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

const studios = ({ studio }: { studio: IStudio }) => {
  return <Student studio={studio}></Student>;
};

export default studios;

export async function getServerSideProps(context: { query: { studio: any } }) {
  const { studio } = context.query;
  const results = (await getStudio(studio)) as IStudio[];

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
      studio: results && results[0],
    },
  };
}
