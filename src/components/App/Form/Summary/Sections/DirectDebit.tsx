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
    const separatedString = howDidYouHearAboutCentroDirectDebit.savedValue?.split('-').join(' ');
    return separatedString!.charAt(0).toUpperCase() + separatedString!.slice(1);
  })();

  return (
    <Table
      title="Direct Debit"
      cellClasses={['', '', 'wmnds-text-align-right']}
      values={[
        [
          <span>Account Holder</span>,
          <>{accountName.savedValue}</>,
          <ChangeAnswer from={accountName.subscriptions[0]} />,
        ],
        [
          <span>Bank or building society account number</span>,
          <>{accountNumber.savedValue}</>,
          <ChangeAnswer from={accountNumber.subscriptions[0]} />,
        ],
        [
          <span>Branch sort code</span>,
          <>{sortCode.savedValue}</>,
          <ChangeAnswer from={sortCode.subscriptions[0]} />,
        ],
        [
          <span>How did you find out about the Direct Debit scheme?</span>,
          <>{howDidYouHearAboutDDString}</>,
          <ChangeAnswer from={howDidYouHearAboutCentroDirectDebit.subscriptions[0]} />,
        ],
      ]}
    />
  );
};

export default DirectDebit;
