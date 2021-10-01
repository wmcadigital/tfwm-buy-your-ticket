export type TApiTicket = {
  id: number;
  name: string;
  allowBus: boolean;
  allowMetro: boolean;
  allowTrain: boolean;
  ticketCurrentAmount: number;
  validity: string;
  // Direct debit details
  buyOnDirectDebit: boolean;
  directDebitCode: string;
};

export type TTicket = {
  id: number;
  name: string;
  priceString: string;
  modes: Array<'bus' | 'rail' | 'metro'>;
  availableDates: Date[];
  raw: Partial<TApiTicket>;
};
