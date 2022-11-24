import { Timestamp } from "firebase/firestore";
import React from "react";
import Coupon from "../../../../Modules/Registration/Coupon/index";
import { getStudent } from "../../../api/students";

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

const coupon = ({
  name,
  phone,
  couponCount,
  selectedClass,
}: {
  couponCount: number;
  name: string;
  phone: string;
  selectedClass: string;
}) => {
  return (
    <Coupon
      name={name}
      phone={phone}
      couponCount={couponCount}
      selectedClass={selectedClass}
    ></Coupon>
  );
};

export default coupon;

export async function getServerSideProps(context: any) {
  // 여기서 name과 phone이 없음

  try {
    const { name, phone, selectedClass } = await context.query;
    const student = await getStudent(name, phone);

    if (!student || !name || !phone) {
      return {
        props: {
          name,
          phone,
          couponCount: 0,
        },
      };
    }

    if (student[0]) {
      return {
        props: {
          name,
          phone,
          couponCount: student[0].coupons.filter(
            (coupon: any) => !coupon.classID
          ).length,
          selectedClass,
        },
      };
    }
  } catch (error) {
    const { name, phone, studio } = await context.query;
    console.error(error);
    return {
      redirect: {
        destination: encodeURI(
          `/form/studios/${studio}/class?name=${name}&phone=${phone}`
        ),
        statusCode: 307,
      },
    };
  }
}
