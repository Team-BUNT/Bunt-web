import styles from "../../styles/Home.module.css";
import StudioClass from "./StudioClass";

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
        {enrollment.map((aClass, index) => {
          if (aClass === undefined) return;

          return (
            <div key={aClass.classID + index}>
              <StudioClass
                classTime={aClass.classTime}
                instructorName={aClass.instructorName}
                classID={aClass.classID}
                register={register}
              ></StudioClass>
            </div>
          );
        })}
      </>
    </section>
  );
};

export default StudioClassCheckList;
