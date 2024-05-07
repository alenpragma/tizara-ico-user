type IStatus =
  | {
      label: string;
      value: string;
    }
  | any;

export type IPackage = {
  daily_token: string;
  a2i_token: string;
  duration: string;
  hashpower: string;
  image?: string | null;
  is_deleted?: string;
  package_name: string;
  package_price: string;
  status: string | IStatus;
  id?: number;
  created_at?: string;
  updated_at?: string;
};

export interface IPackageDetails {
  details: IPackage | any;
  closeModal: () => void;
}
