
export interface IWalletModel { 
    WalletId: string
    WalletNumber: string
    IsActive?: boolean
    UserId: string
    
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
    WalletId: string
    WalletNumber: string
    IsActive?: boolean
    UserId: string
}