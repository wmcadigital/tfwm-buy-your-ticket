export type TUseGetAvailableDates = () => {
  isLoading: boolean;
  hasError: boolean;
  availableDates: Date[] | null;
};
