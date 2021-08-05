export const convertBooleanToYesNo = (bool: boolean): 'yes' | 'no' => (bool ? 'yes' : 'no');

export const convertYesNoToBoolean = (yesNo: 'yes' | 'no'): boolean => yesNo === 'yes';
