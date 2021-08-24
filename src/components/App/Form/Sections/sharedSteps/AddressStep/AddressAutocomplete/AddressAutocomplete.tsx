import Button from 'components/shared/Button';
import Dropdown from 'components/shared/Dropdown/Dropdown';
import Input from 'components/shared/Input';
import { TAddressAutocompleteProps } from './AddressAutocomplete.types';

const AddressAutocomplete = ({ handleNotFound, address }: TAddressAutocompleteProps) => {
  const { postcode } = address;

  const addresses: { text: string; value: string }[] = [
    { text: '16 summer lane', value: '16 summer lane' },
  ];

  const handleFindAddress = () => {
    postcode.save();
    /*
    const addressRequest = useAxiosRequest<TApiTicket>({
      url: `https://api.getAddress.io/find/${postcode.value}`,
    });
    const data = addressRequest.response?.data; 
    */
  };

  return (
    <>
      <Input
        groupClassName="wmnds-m-b-md"
        className="wmnds-col-1 wmnds-col-md-2-3"
        autocomplete="autocomplete"
        name="postcode"
        inputmode="text"
        label="Postcode"
        defaultValue={postcode.value}
        onChange={(e) => postcode.set(e.target.value)}
        type="text"
      />
      <div className="wmnds-col-1">
        <Button
          btnClass="wmnds-btn--primary"
          disabled={!postcode}
          onClick={handleFindAddress}
          text="Find address"
          title="Find address"
        />
      </div>
      <Dropdown
        className="wmnds-col-1 wmnds-col-md-2-3"
        name="addressLine1"
        label="Select an address"
        options={addresses}
        // defaultValue={addressLine1.value}
        // onChange={(e) => addressLine1.set(e.target.value)}
      />
      <Button
        btnClass="wmnds-btn--link wmnds-m-b-lg"
        onClick={handleNotFound}
        text="I can't find my address in the list"
        title="I can't find my address in the list"
      />
    </>
  );
};

export default AddressAutocomplete;
