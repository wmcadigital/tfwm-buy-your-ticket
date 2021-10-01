import Table from 'components/shared/Table/Table';
import { useFormDataContext } from 'state/formDataState/context';
import ChangeAnswer from './ChangeAnswer/ChangeAnswer';

const DirectDebit = () => {
  const [formDataState] = useFormDataContext();
  const {
    accountName,
    accountNumber,
    sortCode,
    howDidYouHearAboutCentroDirectDebit,
  } = formDataState;

  const howDidYouHearAboutDDString = (() => {
    const separatedString = howDidYouHearAboutCentroDirectDebit?.split('-').join(' ');
    return separatedString!.charAt(0).toUpperCase() + separatedString!.slice(1);
  })();

  return (
    <Table
      title="Direct Debit"
      cellClasses={['', '', 'wmnds-text-align-right']}
      values={[
        [
          <span>Account Holder</span>,
          <>{accountName}</>,
          <ChangeAnswer from="InstructionsToBank" />,
        ],
        [
          <span>Bank or building society account number</span>,
          <>{accountNumber}</>,
          <ChangeAnswer from="InstructionsToBank" />,
        ],
        [
          <span>Branch sort code</span>,
          <>{sortCode}</>,
          <ChangeAnswer from="InstructionsToBank" />,
        ],
        [
          <span>How did you find out about the Direct Debit scheme?</span>,
          <>{howDidYouHearAboutDDString}</>,
          <ChangeAnswer from="InstructionsToBank" />,
        ],
      ]}
    />
  );
};

export default DirectDebit;
