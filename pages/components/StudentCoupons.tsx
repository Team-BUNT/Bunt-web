import styles from "../../styles/Home.module.css";

import React from "react";

import { FieldValues, UseFormRegister } from "react-hook-form";

interface ICoupon {
  count: number;
  price: number;
}

interface IStudentCoupon {
  coupons: ICoupon[];
  register: UseFormRegister<FieldValues>;
}

const StudentCoupons = ({ coupons, register }: IStudentCoupon) => {
  return (
    <section className={styles.formField}>
      <div className={styles.chooseClass}>
        <>
          {coupons.map(({ count, price }) => {
            <div className={styles.classSelectForm}>
              <div className={styles.classSelectCheckBox}>
                <label className={styles.checkBoxContainer}>
                  <input type="checkbox" {...register("ticket1")} />
                  <span className={styles.checkmark}></span>
                </label>
                <span>{`${count}회`}</span>
              </div>
              <div className={styles.formDetail}>{`${price}KRW`}</div>
            </div>;
          })}
        </>
      </div>
    </section>
  );
};

export default StudentCoupons;
