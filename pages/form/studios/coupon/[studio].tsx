import React from "react";
import Coupon from "../../../../Modules/Registration/Coupon/index";

const coupon = () => {
  return <Coupon></Coupon>;
};

export default coupon;

// export async function getServerSideProps(context: any) {
//   // 여기서 name과 phone이 없음
//   try {
//     const { name, phone, selectedClass } = await context.query;

//     const student = await getStudent(name, phone);

//     // if (student === undefined) {
//     //   return {
//     //     redirect: {
//     //       destination: "*",
//     //       permanent: true,
//     //       statusCode: 307,
//     //     },
//     //   };
//     // }

//     if (!student || !name || !phone) {
//       return {
//         redirect: {
//           destination: "*",
//           permanent: true,
//           statusCode: 307,
//         },
//       };
//     }

//     if (student[0]) {
//       return {
//         props: {
//           name,
//           phone,
//           couponCount: student[0].coupons.filter(
//             (coupon: any) => !coupon.classID
//           ).length,
//           selectedClass,
//         },
//       };
//     }
//   } catch (error) {
//     const { name, phone, studio } = await context.query;
//     console.error(error);
//     return {
//       redirect: {
//         destination: encodeURI(
//           `/form/studios/${studio}/class?name=${name}&phone=${phone}`
//         ),
//         statusCode: 307,
//       },
//     };
//   }
// }
