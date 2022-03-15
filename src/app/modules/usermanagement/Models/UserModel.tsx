import {useEffect, useRef, useState} from 'react'
import {shallowEqual, useDispatch, useSelector} from 'react-redux'
import {RootState} from '../../../../setup'
import {GenderType, IUserModel, UserType} from '../../auth/models/AuthInterfaces'
import {getUsers} from '../UserManagementCRUD'

export const usersmodel: IUserModel[] = [
  {
    userId: 'Efosa',
    firstName: 'Efosa',
    lastName: 'Omoigui',
    email: 'efeomoigui@gmail.com',
    phoneNumber: '000',
    age: '70',
    gender: GenderType['Male'],
    userType: UserType['Individual'],  
    pictureUrl: 'Efosa',
    organisation: 'Efosa',
    status: 1,
    dateCreated: 'Efosa',
    dateModified: 'Efosa',
    passwordExpireDate: 'Efosa',
    identificationImage: 'Efosa',
    walletNumber: 'Efosa'
  },
]

export class User implements IUserModel { 
  password?: string | undefined
  gender: number = GenderType['Male']
  userType: number = UserType['Individual']
  message?: string | undefined
  validationErrors?: string[] | undefined
  userdto?: {} | undefined
  userId: string = ''
  userName: string = ''
  firstName: string = ''
  lastName: string = ''
  email: string = ''
  phoneNumber: string = ''
  age: string = '70'
  pictureUrl: string = ''
  isActive: boolean = false
  organisation: string = ''
  status: number = 1
  identificationImage: string = 'Efosa' 
  walletNumber: string = 'Efosa'
  dateCreated: string = 'Efosa'
  dateModified: string = 'Efosa'
  passwordExpireDate: string = 'Efosa'
}

export class UserFormValues {
  userId: string = ''
  userName: string = ''
  firstName: string = ''
  lastName: string = ''
  email: string = ''
  phoneNumber: string = ''
  age: string = '70'
  designation: string = ''
  pictureUrl: string = ''
  organisation: string = ''
  status: number = 1
  dateCreated: string = 'Efosa'
  dateModified: string = 'Efosa'
  passwordExpireDate: string = 'Efosa'
  identificationImage: string = 'Efosa'
  walletNumber: string = 'Efosa'

  }