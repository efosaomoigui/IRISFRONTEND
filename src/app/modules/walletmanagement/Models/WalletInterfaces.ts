export interface IWalletModel {
  id: string
  number: string
  isActive: string
  userId: string
}

export interface IWalletTransactionModel {
  WalletTransactionId: string
  Amount: string
  TransactionType: string
  Description: string
  WalletNumber: string
  DateCreated: string
}

export interface IAddWalletModel {
  id: string
  WalletNumber: string
  IsActive?: boolean
  UserId: string
}
