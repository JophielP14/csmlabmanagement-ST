export type RegisterType = {
  email: string;
  username: string;
  password: string;
  first_name: string;
  last_name: string;
};

export type LoginType = {
  username: string;
  password: string;
};

export type ActivationType = {
  uid: string;
  token: string;
};

export type ResetPasswordConfirmType = {
  uid: string;
  token: string;
  new_password: string;
};

export type TransactionType = {
  section: string;
  id: number;
  borrower: number;
  equipments: number[];
  status: string;
  timestamp: string;
};

export type TransactionListType = Array<TransactionType>;
