/* eslint-disable react-hooks/rules-of-hooks */
import { getDownloadURL, ref } from "firebase/storage";
import { useRouter } from "next/router";
import React from "react";
import { firestorage } from "../../../../Domains/firebase";
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

const login = ({ studio, url }: { studio: IStudio; url: string }) => {
  console.log(url);
  return <Student studio={studio} url={url}></Student>;
};

export default login;

export async function getServerSideProps(context: { query: { studio: any } }) {
  const { studio } = context.query;
  const results = (await getStudio(studio)) as IStudio[];

  const starsRef = ref(firestorage, `/studios/${studio}.png`);
  const firestorageStudioImage = await getDownloadURL(starsRef);

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
      url: firestorageStudioImage,
    },
  };
}
