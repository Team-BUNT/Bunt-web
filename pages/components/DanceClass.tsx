import styles from "../../styles/Home.module.css";

import * as React from "react";

interface IClass {
  classTime: string;
  instructorName: string;
}

const DanceClass = ({ classTime, instructorName }: IClass) => {
  return (
    <div className={styles.classSelectForm}>
      <div className={styles.classSelectCheckBox}>
        <label className={styles.checkBoxContainer}>
          <input type="checkbox" />
          <span className={styles.checkmark}></span>
        </label>
        <span>{classTime}</span>
      </div>
      <div className={styles.formDetail}>{instructorName}</div>
    </div>
  );
};

export default DanceClass;
