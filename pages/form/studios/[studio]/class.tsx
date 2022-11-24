import React from "react";
import Class from "../../../../Modules/Registration/Class/index";
import { getClass } from "../../../api/classes";
import { getStudio } from "../../../api/studios";

const studios = ({ classes, name, phone }: any) => (
  <Class classes={classes} name={name} phone={phone}></Class>
);

export default studios;

export async function getServerSideProps(context: {
  query: { studio: string; name: string; phone: string };
}) {
  const { studio, name, phone } = context.query;
  const studioId = await getStudio(studio);
  if (studioId) {
    const classes = await getClass(studioId[0].ID).then((e) =>
      JSON.parse(JSON.stringify(e))
    );

    return {
      props: {
        classes,
        name,
        phone,
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
