export interface ISearchTripModel {
    userId: string
    userName?: string
    password?: string
    firstName: string
    lastName: string
    email: string
    phonenumber?: string
    age?: string
    designation?: string
    department?: string
    pictureUrl?: string
    isActive?: boolean
    organisation?: string
    status?: number
    dateCreated?: string
    dateModified?: string
    isDeleted?: string
    systemUserId?: string
    systemUserRole?: string
    passwordExpireDate?: string
    identificationImage?: string
    walletNumber?: string
}

export interface IAddTrackModel {
    id: string
    name: string
}

export interface ITrackHistoryModel {
    id: string
    roleId: string
    claimType: string
    claimValue: string
}
