import styles from "../../styles/Home.module.css";
import StudioClass from "./StudioClass";

import { FieldValues, UseFormRegister } from "react-hook-form";

interface IHall {
  name: string;
  capacity: number;
}
interface IClass {
  ID: string;
  studioID?: string;
  title?: string;
  instructorName?: string;
  date?: string;
  durationMinute?: number;
  applicantsCount?: number;
  hall?: IHall;
  isPopUp?: boolean;
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
          if (aClass === undefined || aClass.date === undefined || aClass.instructorName === undefined) return;

          return (
            <div key={aClass.ID + index}>
              <StudioClass
                classTime={aClass.date}
                instructorName={aClass.instructorName}
                classID={aClass.ID}
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
