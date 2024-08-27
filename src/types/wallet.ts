export interface IWallet {
  id: string;
  depositWallet: number;
  icoWallet: number;
  nativeWallet: number;
  stakeWallet: number;
  newIcoWallet?: number;
  createdAt: string;
  updatedAt: string;
  userId: string;
}
