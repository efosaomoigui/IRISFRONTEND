
export interface IWalletModel {
   
    
    walletNumberId: string
    number: string
    isActive: true
    userId: string
    
}

export interface IWalletTransactionModel {
    walletNumberId: string
    number: string
    isActive: true
    userId: string
}

export interface IAddWalletModel {
    WalletId: string
    firstName: string
    lastName: string
    Date: string
    Amount: string
    TransactionType: string
}