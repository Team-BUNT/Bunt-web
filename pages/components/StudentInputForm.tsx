import StudentCoupons from "./StudentCoupons";
import StudentInformation from "./StudentInformation";

import React from "react";

import { FieldValues, UseFormRegister } from "react-hook-form";

interface IReactHookFormRegister {
  register: UseFormRegister<FieldValues>;
}

const StudentInputForm = ({ register }: IReactHookFormRegister) => {
  const testData = [
    {
      count: 1,
      price: 30_000,
    },
    {
      count: 4,
      price: 120_000,
    },
  ];

  return (
    <section>
      <StudentInformation register={register}></StudentInformation>

      <StudentCoupons coupons={testData} register={register}></StudentCoupons>
    </section>
  );
};

export default StudentInputForm;
