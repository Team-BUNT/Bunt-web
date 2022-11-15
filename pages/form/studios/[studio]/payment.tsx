import React from "react";
import Payment from "../../../../Modules/Registration/Payment/index";
import { getStudio } from "../../../api/studios";

const payment = ({ selectedClass, studentName, studentPhoneNumber, couponCount, studio, bankAccount }) => (
  <Payment
    selectedClass={selectedClass}
    studentName={studentName}
    studentPhoneNumber={studentPhoneNumber}
    couponCount={couponCount}
    studio={studio}
    bankAccount={bankAccount}
  ></Payment>
);

export default payment;

export async function getServerSideProps(context: {
  query: { selectedClass: string; name: string; phone: string; couponCount: string; studio: string };
}) {
  const { selectedClass, name, phone, couponCount, studio } = context.query;

  const studioPromise = await getStudio(studio);
  const { bankAccount } = studioPromise && studioPromise[0].notice;

  return {
    props: {
      selectedClass,
      studentName: name,
      studentPhoneNumber: phone,
      couponCount,
      studio,
      bankAccount,
    },
  };
}
