export type TInputProps = {
  autocomplete?: string;
  className?: string;
  fieldValidation?: () => void;
  inputmode?: 'text' | 'none' | 'tel' | 'url' | 'email' | 'numeric' | 'decimal';
  label: string;
  name: string;
  defaultValue?: string | null;
  spellcheck?: boolean;
  type?: 'text' | 'number';
  errors?: { name: { message: string } };
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  pattern?: string;
};
