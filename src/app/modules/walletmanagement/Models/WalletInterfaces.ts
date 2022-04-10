export interface IWalletModel {
  id: string
  number: string
  isActive: string
  userId: string
  user?: string
  walletBalance: number
  walletTransactions?: IWalletTransactionModel[]
  message?: string
  validationErrors?: string[]
  walletdto?: {}
}

export interface IWalletTransactionModel {
  id:string 
  amount: string
  transactionType: number
  description: string
  userId: string
  lineBalance?:string
  walletBalance?:string
  walletNumber?:string
  message?: string
  validationErrors?: string[]
  wallettransactionto?: {}
}

export interface IAddWalletModel {
  id: string
  WalletNumber: string
  IsActive?: boolean
  UserId: string
  walletBalance: number
}

export const numberFormat = (value:number) =>
  new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN'
  }).format(value);
