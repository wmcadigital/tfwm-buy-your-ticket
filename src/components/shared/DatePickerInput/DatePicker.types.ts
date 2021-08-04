export type TDatePickerProps = {
  startDate: Date;
  setStartDate: (date: Date) => void;
  availableDates: Date[];
  inline: boolean;
};
