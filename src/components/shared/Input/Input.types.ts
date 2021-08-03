export type TInputProps = {
  autocomplete?: string;
  className?: string;
  fieldValidation?: () => void;
  inputmode?: 'text' | 'none' | 'tel' | 'url' | 'email' | 'numeric' | 'decimal';
  label: string;
  name: string;
  defaultValue?: string;
  spellcheck?: boolean;
  type?: 'text' | 'number';
  errors?: { name: { message: string } };
};
