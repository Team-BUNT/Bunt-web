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
  if (studioAccountNumber) {
  }
};
