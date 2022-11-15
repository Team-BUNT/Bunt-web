import { ref } from "firebase/storage";
import React from "react";
import Class from "../../../../Modules/Registration/Class/index";
import { getClass } from "../../../api/classes";
import { getStudio } from "../../../api/studios";

const studios = ({ classes }: any) => <Class classes={classes}></Class>;

export default studios;

export async function getServerSideProps(context: { query: { studio: any } }) {
  const { studio } = context.query;
  const studioId = await getStudio(studio);
  if (studioId) {
    const classes = await getClass(studioId[0].ID).then((e) => JSON.parse(JSON.stringify(e)));

    return {
      props: {
        classes,
      },
    };
  }

  // if (!results) {
  //   return {
  //     redirect: {
  //       destination: "/",
  //       permanent: false,
  //     },
  //   };
  // }
}
