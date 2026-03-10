export interface TransactionRow {
  dateTime: string;
  amount: string;
  type: 'Credit' | 'Debit';
}

export type CustomerName =
  | 'Hermoine Granger'
  | 'Harry Potter'
  | 'Ron Weasly'
  | 'Albus Dumbledore'
  | 'Neville Longbottom';