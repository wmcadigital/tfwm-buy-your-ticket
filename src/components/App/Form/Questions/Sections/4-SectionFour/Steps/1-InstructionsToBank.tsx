import { useFormDataContext } from 'state/formDataState';
import { useFormDataSubscription, useNavigationLogic } from 'customHooks';
import { useValidateBankAccount } from 'customHooks/axiosRequests';
import { Input, Question } from 'components/shared';

import ddlogo from 'assets/images/DirectDebitLogo.png';

const InstructionsToBank = () => {
  const [formDataState] = useFormDataContext();
  const { applicationForMe } = formDataState;

  const prevStep = applicationForMe ? 'PayerOrTicketHolderPhoto' : 'PayerOrTicketHolderAddress';
  const { goToNextStep } = useNavigationLogic(prevStep, 'HowDidYouFindOutAboutDD');

  const accountName = useFormDataSubscription('accountName');

  const sortCode = useFormDataSubscription('sortCode', [
    { rule: 'NUMBER', message: 'The sort code must be 6 digit a number' },
  ]);

  const accountNumber = useFormDataSubscription('accountNumber', [
    { rule: 'NUMBER', message: 'The account number must be 6 to 8 digit number a number' },
  ]);

  const bankAccountValidation = useValidateBankAccount(
    sortCode.currentValue,
    accountNumber.currentValue,
  );

  const handleContinue = async () => {
    const accountNameValid = accountName.save();
    const accountNumberValid = accountNumber.save();
    const sortCodeValid = sortCode.save();
    if (!accountNameValid || !accountNumberValid || !sortCodeValid) return;
    const isBankAccountValid = await bankAccountValidation.sendRequest();
    if (!isBankAccountValid) return;
    goToNextStep();
  };

  return (
    <Question
      question="Instruction to your bank or building society to pay by Direct Debit"
      handleContinue={handleContinue}
      showError={accountName.hasError || accountNumber.hasError || sortCode.hasError}
      isLoading={bankAccountValidation.isLoading}
    >
      <div className="wmnds-grid wmnds-grid--justify-between wmnds-grid--align-center wmnds-m-b-lg">
        <div className="wmnds-col-1 wmnds-col-md-2-3">
          <h3 className="h3 wmnds-h3 wmnds-m-b-none">The Direct Debit Guarantee</h3>
        </div>
        <img className="wmnds-img wmnds-col-auto" src={ddlogo} alt="Direct debit logo" />
      </div>
      <ul className="wmnds-unordered-list">
        <li>
          This Guarantee is offered by all banks and building societies that accept instructions to
          pay Direct Debits.
        </li>
        <li>
          If there are any changes to the amount, date or interval of your Direct Debit West
          Midlands Combined Authority will notify you 10 working days in advance of your account
          being debited or as otherwise agreed. If you request West Midlands Combined Authority to
          collect a payment, confirmation of amount and date will be given to you at the time of the
          request.
        </li>
        <li>
          If an error is made in the payment of your Direct Debit, by West Midlands Combined
          Authority or your bank or building society, you are entitled to a full and immediate
          refund of the amount paid from you bank or building society
        </li>
        <li>
          If you receive a refund you are not entitled to, you must pay it back when West Midlands
          Combined Authority asks you to.
        </li>
        <li>
          You can cancel a Direct Debit at any time by simply contacting your bank or building
          society. Written confirmation may be required. Please also notify us.
        </li>
      </ul>

      <h3 className="wmnds-m-b-lg">Bank or building society account details</h3>

      <Input
        groupClassName="wmnds-m-b-lg"
        name="accountName"
        inputmode="text"
        label="Name on the account"
        defaultValue={accountName.currentValue}
        type="text"
        className="wmnds-col-1 wmnds-col-md-2-3"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => accountName.set(e.target.value)}
        error={accountName.error}
      />
      <Input
        groupClassName="wmnds-m-b-lg"
        name="sortCode"
        inputmode="numeric"
        label={
          <>
            Sort code
            <br />
            Must be 6 digits long
          </>
        }
        defaultValue={sortCode.currentValue}
        type="text"
        pattern="[0-9]*"
        maxLength={6}
        className="wmnds-col-1 wmnds-col-md-1-3"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => sortCode.set(e.target.value)}
        error={sortCode.error}
      />
      <Input
        groupClassName="wmnds-m-b-lg"
        name="accountNumber"
        inputmode="numeric"
        label={
          <>
            Account number
            <br />
            Must be between 6 and 8 digits long
          </>
        }
        defaultValue={accountNumber.currentValue}
        type="text"
        pattern="[0-9]*"
        maxLength={8}
        className="wmnds-col-1 wmnds-col-md-1-3"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => accountNumber.set(e.target.value)}
        error={accountNumber.error}
      />
      <p>
        Please pay West Midlands Combined Authority Direct Debits from the account detailed in this
        Instruction subjected to the safeguards assured by the Direct Debit Guarantee.
      </p>
      <p>
        I understand that this Instruction may remain with West Midlands Combined Authority and, if
        so, details will be passed electronically to my bank/building society.
      </p>
    </Question>
  );
};

export default InstructionsToBank;
