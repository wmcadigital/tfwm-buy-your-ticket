import { useState } from 'react';

import Button from 'components/shared/Button';
import Dropdown from 'components/shared/Dropdown/Dropdown';
import Input from 'components/shared/Input';

import { useGetAddress } from 'customHooks/axiosRequests';
import { Nullable } from 'types/helpers';
import { T4LineAddress } from '../AddressStep.types';
import { TAddressAutocompleteOption, TAddressAutocompleteProps } from './AddressAutocomplete.types';

const AddressAutocomplete = ({ handleNotFound, address }: TAddressAutocompleteProps) => {
  const { postcode, addressLine1, addressLine2, addressLine3, addressLine4 } = address;
  const [addresses, setAddresses] = useState<Nullable<TAddressAutocompleteOption[]>>(null);
  const [isEditingPostcode, setIsEditingPostcode] = useState(true);

  const getAddressRequest = useGetAddress();

  const handleFindAddress = async () => {
    if (!postcode.validate()) return;
    setIsEditingPostcode(false);
    const apiAddresses = await getAddressRequest.sendRequest();
    setAddresses(
      apiAddresses.map((singleAddress) => {
        return {
          text: singleAddress.formatted_address.filter((b) => !!b).join(', '),
          value: JSON.stringify({
            line1: singleAddress.line_1,
            line2: singleAddress.line_2,
            line3: singleAddress.town_or_city,
            line4: singleAddress.county,
          }),
        };
      }),
    );
  };

  const handleChangePostcode = () => {
    setIsEditingPostcode(true);
    setAddresses([]);
  };

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { line1, line2, line3, line4 } = JSON.parse(e.target.value) as T4LineAddress;
    addressLine1.set(line1);
    addressLine2.set(line2);
    addressLine3.set(line3);
    addressLine4.set(line4);
  };

  // Helper booleans
  const showPostcodeInput = isEditingPostcode || getAddressRequest.isLoading;
  const showAddressesDropdown =
    addresses !== null && !isEditingPostcode && !getAddressRequest.isLoading;

  return (
    <>
      {showPostcodeInput ? (
        <>
          <Input
            groupClassName="wmnds-m-b-md"
            className="wmnds-col-1 wmnds-col-md-2-3"
            autocomplete="autocomplete"
            name="postcode"
            inputmode="text"
            label="Postcode"
            defaultValue={postcode.currentValue}
            onChange={(e) => postcode.set(e.target.value)}
            type="text"
            error={postcode.error}
          />
          <div className="wmnds-col-1">
            <Button
              btnClass="wmnds-btn--primary wmnds-m-b-lg"
              disabled={!postcode}
              onClick={handleFindAddress}
              text="Find address"
              title="Find address"
              isFetching={getAddressRequest.isLoading}
            />
          </div>
        </>
      ) : (
        <div className="wmnds-col-1">
          <p className="wmnds-fe-label">Postcode</p>
          <p className="wmnds-m-b-none">
            {postcode.currentValue}
            <button
              type="button"
              className="wmnds-btn wmnds-btn--link wmnds-m-l-md"
              onClick={handleChangePostcode}
            >
              Change
            </button>
          </p>
        </div>
      )}
      {showAddressesDropdown && (
        <>
          <Dropdown
            className="wmnds-col-1 wmnds-col-md-2-3"
            name="addressLine1"
            label="Select an address"
            options={addresses!}
            disabledOptionText={`${addresses!.length || 'No'} addresses found`}
            onChange={onChange}
          />
          <Button
            btnClass="wmnds-btn--link wmnds-m-b-lg"
            onClick={handleNotFound}
            text="I can't find my address in the list"
            title="I can't find my address in the list"
          />
        </>
      )}
    </>
  );
};

export default AddressAutocomplete;