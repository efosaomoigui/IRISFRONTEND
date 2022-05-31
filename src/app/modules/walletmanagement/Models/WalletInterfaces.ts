export interface IWalletModel {
  id?: string
  number?: string
  isActive?: string
  userId?: string
  user?: string
  name?: string
  amount?: string
  walletNumber?: string
  description?: string
  walletBalance?: number
  transactionType?: number
  walletTransactions?: IWalletTransactionModel[]
  message?: string
  validationErrors?: string[]
  walletdto?: {}
}

export enum TransactionType {
  Credit = 2,
  Debit = 1,
}

export interface IWalletTransactionModel {
  id: string
  amount: string
  transactionType: number
  description: string
  userId: string
  lineBalance?: string
  walletBalance?: string
  walletNumber?: string
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

export const numberFormat = (value: number) =>
  new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
  }).format(value)

export const numberFormat2 = (value: number) =>
  new Intl.NumberFormat('en-IN', {maximumSignificantDigits: 1}).format(value)
