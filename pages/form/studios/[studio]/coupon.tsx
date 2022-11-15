import { Timestamp } from "firebase/firestore";
import React from "react";
import Coupon from "../../../../Modules/Registration/Coupon/index";
import { getStudent } from "../../../api/students";
import { getStudio } from "../../../api/studios";

interface IStudent {
  ID: string;
  coupons: ICoupon[];
  name: string;
  phoneNumber: string;
}
interface ICoupon {
  isFreePass: boolean;
  expiredDate: Timestamp;
}

const coupon = ({ name, phone, couponCount }: { couponCount: number; name: string; phone: number }) => {
  return <Coupon couponCount={couponCount}></Coupon>;
};

export default coupon;

export async function getServerSideProps(context: any) {
  const { name, phone, studio } = context.query;

  const studioId = await getStudio(studio);

  const student = await getStudent(name, phone);

  if (!student) {
    return {
      props: {
        couponCount: 0,
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

  return {
    props: {
      name,
      phone,
      couponCount: student[0].coupons.length,
    },
  };
}
