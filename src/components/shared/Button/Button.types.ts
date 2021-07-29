export type TButtonProps = {
  btnClass?: string;
  disabled?: boolean;
  iconLeft?: string;
  iconRight?: string;
  isActive?: boolean;
  isFetching?: boolean;
  onClick: () => void;
  text: string;
  title?: string;
  type?: 'button' | 'submit' | 'reset';
};
