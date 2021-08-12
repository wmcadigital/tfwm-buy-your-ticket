export type TInputProps = {
  autocomplete?: string;
  className?: string;
  groupClassName?: string;
  fieldValidation?: () => void;
  inputmode?: 'text' | 'none' | 'tel' | 'url' | 'email' | 'numeric' | 'decimal';
  label: string | JSX.Element;
  name: string;
  defaultValue?: string | null;
  spellcheck?: boolean;
  type?: 'text' | 'number';
  errors?: { name: { message: string } };
  onChange: (e: React.SyntheticEvent<Element, Event>) => void;
  pattern?: string;
  mask?: string;
  maskChar?: string;
};
