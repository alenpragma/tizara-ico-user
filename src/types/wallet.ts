export interface IWallet {
  id: string;
  depositWallet: number;
  icoWallet: number;
  nativeWallet: number;
  stakeWallet: any;
  newIcoWallet?: any;
  nftWallet?: any;
  createdAt: string;
  updatedAt: string;
  userId: string;
}
