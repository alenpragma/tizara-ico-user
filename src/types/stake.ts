export interface IStake {
  id: string;
  planName: string;
  duration: string;
  apy: number;
  stakeAmount: number;
  dailyRoy: number;
  status: string;
  wallet?: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}
