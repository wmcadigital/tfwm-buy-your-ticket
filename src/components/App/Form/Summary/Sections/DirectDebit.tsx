import { useFormDataContext } from 'state/formDataState/context';
import { Table, ChangeAnswerButton } from 'components/shared';

const DirectDebit = () => {
  const [formDataState] = useFormDataContext();
  // eslint-disable-next-line prettier/prettier
  const { accountName, accountNumber, sortCode, howDidYouHearAboutCentroDirectDebit } =
    formDataState;

  const howDidYouHearAboutDDString = (() => {
    const separatedString = howDidYouHearAboutCentroDirectDebit?.split('-').join(' ');
    if (!separatedString) return '';
    return separatedString?.charAt(0).toUpperCase() + separatedString?.slice(1);
  })();

  return (
    <Table
      title="Direct Debit"
      cellClasses={['', '', 'wmnds-text-align-right']}
      values={[
        [
          <span>Account Holder</span>,
          <>{accountName}</>,
          <ChangeAnswerButton from="InstructionsToBank" />,
        ],
        [
          <span>Bank or building society account number</span>,
          <>{accountNumber}</>,
          <ChangeAnswerButton from="InstructionsToBank" />,
        ],
        [
          <span>Branch sort code</span>,
          <>{sortCode}</>,
          <ChangeAnswerButton from="InstructionsToBank" />,
        ],
        [
          <span>How did you find out about the Direct Debit scheme?</span>,
          <>{howDidYouHearAboutDDString}</>,
          <ChangeAnswerButton from="InstructionsToBank" />,
        ],
      ]}
    />
  );
};

export default DirectDebit;
