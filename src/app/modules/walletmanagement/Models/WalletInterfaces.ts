
export interface IWalletModel { 
    id: string
    WalletNumber: string
IsActive: string
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
    id: string
    WalletNumber: string
    IsActive?: boolean
    UserId: string
}