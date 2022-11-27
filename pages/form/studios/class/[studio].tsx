import React from "react";
import Class from "../../../../Modules/Registration/Class/index";

const studios = () => <Class></Class>;

export default studios;

// export async function getServerSideProps({
//   query: { studio, studentName, studentPhone },
// }: any) {
//   console.log(studio, studentName, studentPhone);
//   return {
//     props: {},
//   };
// }

//   query: { studio: string; name: string; phone: string };
// }) {
//   const { studio, name, phone } = context.query;

//   // 여기가 시작점
//   console.log("server side", name, phone);
//   const studioId = await getStudio(studio);
//   if (studioId && name && phone) {
//     const classes = await getClass(studioId[0].ID).then((e) =>
//       JSON.parse(JSON.stringify(e))
//     );

//     return {
//       props: {
//         classes,
//         name: name && JSON.stringify(name),
//         phone: phone && phone,
//       },
//     };
//   }

//   if (!name || !phone) {
//     return {
//       redirect: {
//         destiantion: "*",
//         permanent: false,
//         statusCode: 307,
//       },
//     };
//   }
// }
