
export interface IWalletModel { 
    WalletTransactionId: string
    Amount: string
    TransactionType: string
    Description: string
    WalletNumber: string
    DateCreated: string
    
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
    walletNumberId: string
    number: string
    isActive: true,
    userId: string
}