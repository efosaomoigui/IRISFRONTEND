export interface IWalletModel {
  id: string
  number: string
  isActive: string
  userId: string
  walletBalance: number
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
