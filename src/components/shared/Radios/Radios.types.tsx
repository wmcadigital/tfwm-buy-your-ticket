import { TRadioProps } from './Radio/Radio.types';

export type TRadiosProps = {
  name: string;
  hint?: string | JSX.Element | null;
  error?: { name: { message: string } } | null;
  radios: Array<
    Pick<TRadioProps, 'text' | 'info'> & { html: string | null } & { value: string | boolean }
  >;
  currentValue?: string | boolean | null;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
};

// export type TRadiosProps<T> = {
//   name: string;
//   hint?: string | JSX.Element;
//   error: { message: string } | null;
//   radios: T extends TRadioProps;
//   currentValue: TRadioProps['value'];
//   onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
// };
