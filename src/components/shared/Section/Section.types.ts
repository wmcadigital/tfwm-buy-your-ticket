export type TSectionProps = {
  totalSections: number;
  title: string;
  steps: (() => JSX.Element)[];
};
