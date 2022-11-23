import { firebaseFunction } from "../firebase";
import { httpsCallable } from "firebase/functions";

interface INotification {
  to: string;
  studioName: string;
  studioAddress: string;
  instructorName: string;
  genre: string;
  time: string;
  payment?: string;
  studioAccountNumber?: string;
}

export const useFirebaseFunction = ({
  to,
  studioName,
  studioAddress,
  instructorName,
  genre,
  time,
  payment,
  studioAccountNumber,
}: INotification) => {
  if (payment) {
    try {
      const enrollmentComplete = httpsCallable(
        firebaseFunction,
        "enrollmentComplete"
      );
      enrollmentComplete({
        to,
        disableSms: true,
        from: process.env.NEXT_PUBLIC_SOLAPI_FROM_NUMBER,
        studioName,
        studioAddress,
        instructorName,
        genre,
        time,
        payment,
      })
        .then((result) => {
          console.log(result);
        })
        .catch((error) => {
          console.log(error);
        });
      return;
    } catch (error) {
      console.error(error);
    }
  }

  try {
    const enrollmentCompleteAccountNumber = httpsCallable(
      firebaseFunction,
      "enrollmentCompleteAccountNumber"
    );
    enrollmentCompleteAccountNumber({
      to,
      disableSms: true,
      from: process.env.NEXT_PUBLIC_SOLAPI_FROM_NUMBER,
      studioName,
      studioAddress,
      instructorName,
      genre,
      time,
      studioAccountNumber,
    })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
    return;
  } catch (error) {
    console.error(error);
  }
};
