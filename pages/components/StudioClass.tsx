import styles from "../../styles/Home.module.css";

import { ChangeEvent, useState } from "react";

import { FieldValues, UseFormRegister } from "react-hook-form";

interface IClass {
  classTime: string;
  instructorName: string;
  classID: string;
  register: UseFormRegister<FieldValues>;
}

const StudioClass = ({ classTime, instructorName, classID, register }: IClass) => {
  const [checked, setChecked] = useState(false);

  const checkHandler = (e: ChangeEvent<HTMLInputElement>) => setChecked(e.target.checked);

  return (
    <div className={styles.classSelectForm}>
      <div className={styles.classSelectCheckBox}>
        <label className={styles.checkBoxContainer}>
          <input type="checkbox" {...register(classID)} onChange={checkHandler} />
          <span className={styles.checkmark}></span>
        </label>
        <span>{classTime}</span>
      </div>
      <div className={styles.formDetail}>{instructorName}</div>
    </div>
  );
};

export default StudioClass;
