import styles from "../../styles/Home.module.css";

import React from "react";

import { FieldValues, UseFormRegister } from "react-hook-form";

interface IReactHookFormRegister {
  register: UseFormRegister<FieldValues>;
}

const StudentInformation = ({ register }: IReactHookFormRegister) => {
  return (
    <div className={styles.classSelectStudentInfo}>
      <h2>이름 (입금자명) </h2>
      <input type="text" id="" placeholder="ex. 김민수(김민수)" {...register("name")} />
      <h2>연락처</h2>
      <input type="text" id="" placeholder="01050946369" {...register("phone")} />
    </div>
  );
};

export default StudentInformation;
