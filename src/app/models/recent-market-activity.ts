import { UserAccount } from './user-account';

export interface RecentMarketActivity {
  type: string;
  seller: UserAccount;
  buyer: UserAccount;
  gameItemId: number;
  price: number;
  quantity: number;
  transactionDate: string;
}
