import type { CustomerName } from '../types';

export const CUSTOMERS: Record<string, CustomerName> = {
  HERMOINE_GRANGER: 'Hermoine Granger',
  HARRY_POTTER: 'Harry Potter',
  RON_WEASLY: 'Ron Weasly',
  ALBUS_DUMBLEDORE: 'Albus Dumbledore',
  NEVILLE_LONGBOTTOM: 'Neville Longbottom',
} as const;

export const AMOUNTS = {
  DEPOSIT: '100',
  SEED_DEPOSIT: '500',
  SEED_DEPOSIT_NUM: 500,
  WITHDRAWAL: '200',
} as const;

export const ACCOUNTS = {
  HARRY_POTTER: { DOLLAR: 1004, POUND: 1005, RUPEE: 1006 },
  HERMOINE_GRANGER: { DOLLAR: 1001, POUND: 1002, RUPEE: 1003 },
  RON_WEASLY: { DOLLAR: 1007, POUND: 1008, RUPEE: 1009 },
  ALBUS_DUMBLEDORE: { DOLLAR: 1010, POUND: 1011, RUPEE: 1012 },
  NEVILLE_LONGBOTTOM: { DOLLAR: 1013, POUND: 1014, RUPEE: 1015 },
} as const;