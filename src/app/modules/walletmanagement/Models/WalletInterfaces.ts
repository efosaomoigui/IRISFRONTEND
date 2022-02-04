
export interface IWalletModel {
    WalletId: string
    walletNumber: string
    firstName: string
    lastName: string
    walletBalance: string
}

export interface IWalletTransactionModel {
    WalletId: string
    Date: string
    Amount: string
    TransactionType: string
}

export interface IAddWalletModel {
    WalletId: string
    firstName: string
    lastName: string
    Date: string
    Amount: string
    TransactionType: string
}