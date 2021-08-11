export type TRadioProps = {
  text: string;
  value: string;
  info: string | null;
  name: string;
  checked: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
};
