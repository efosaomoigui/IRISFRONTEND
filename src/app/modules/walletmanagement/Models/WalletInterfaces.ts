export interface IWalletModel {
  id: string
  number: string
  isActive: string
  userId: string
  message?: string
  validationErrors?: string[]
  walletdto?: {}
}

export interface IWalletTransactionModel {
  WalletTransactionId: string
  Amount: string
  TransactionType: string
  Description: string
  WalletNumber: string
  DateCreated: string
  message?: string
  validationErrors?: string[]
  wallettransactionto?: {}
}

export interface IAddWalletModel {
  id: string
  WalletNumber: string
  IsActive?: boolean
  UserId: string
}
