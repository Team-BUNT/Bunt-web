import React from "react";
import Coupon from "../../../../Modules/Registration/Coupon/index";

const coupon = () => <Coupon></Coupon>;

export default coupon;

export async function getServerSideProps(context: any) {
  console.log(context);

  // if (!results) {
  //   return {
  //     redirect: {
  //       destination: "/",
  //       permanent: false,
  //     },
  //   };
  // }

  return {
    props: {},
  };
}
