import styles from "../../styles/Home.module.css";
import StudioDanceClass from "./StudioDanceClass";

import { FieldValues, UseFormRegister } from "react-hook-form";

interface IClass {
  instructorName: string;
  classTime: string;
  classID: string;
}

interface IClassList {
  enrollment: IClass[];
  register: UseFormRegister<FieldValues>;
}

const StudioClassCheckList = ({ enrollment, register }: IClassList) => {
  return (
    <section className={styles.formField}>
      <h2>클래스 선택</h2>
      <>
        {enrollment.map((aClass, index) => (
          <div key={aClass.classID + index}>
            <StudioDanceClass
              classTime={aClass.classTime}
              instructorName={aClass.instructorName}
              classID={aClass.classID}
              register={register}
            ></StudioDanceClass>
          </div>
        ))}
      </>
    </section>
  );
};

export default StudioClassCheckList;
