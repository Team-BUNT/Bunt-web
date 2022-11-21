import Studios from "../../Modules/Registration/Studio/index";

import React from "react";
import { getAllStudioBannerImageURL, getAllStudios } from "../api/studios";

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

const studios = ({ studioNames, studioURLs }: any) => {
  return <Studios studioNames={studioNames} studioURLs={studioURLs}></Studios>;
};

export default studios;

export async function getServerSideProps() {
  console.time("getAllStudios");
  const studioNames = await getAllStudios();
  console.timeEnd("getAllStudios");
  console.time("getAllStudioBannerImageURL");
  const studioURLs =
    studioNames &&
    (await getAllStudioBannerImageURL([...studioNames].map(String)));
  console.timeEnd("getAllStudioBannerImageURL");
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
      studioURLs,
    },
  };
}
