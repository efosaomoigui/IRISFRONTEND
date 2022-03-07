/* eslint-disable react-hooks/exhaustive-deps */
import React, {FC, createContext, useContext, useEffect, useState} from 'react'
import { IPermissionModel, IRoleModel, IUserModel } from '../../../app/modules/auth/models/AuthInterfaces'
import { IWalletModel } from '../../../app/modules/walletmanagement/Models/WalletInterfaces'
import agent from '../../../setup/axios/AxiosAgent'

export interface PageLink {
  title: string
  path: string
  isActive: boolean
  isSeparator?: boolean
}

export interface PageDataContextModel {
  pageTitle?: string
  setPageTitle: (_title: string) => void
  pageDescription?: string
  setPageDescription: (_description: string) => void
  pageBreadcrumbs?: Array<PageLink>
  setPageBreadcrumbs: (_breadcrumbs: Array<PageLink>) => void
  entityDetailValues?:any
  setEntityDetailValues?: (detailsList:any[]) => any
  selectValue?: any
  handleSelectValue:(_entityDetailValues:any)=>void
  selectUrlParam?:string
  setSelectUrlParam?:(urlparam: string) =>void
  formTitle?: string
  setFormTitle: (_title: string) => void
  
}

const PageDataContext = createContext<PageDataContextModel>({
  setPageTitle: (_title: string) => {},
  setPageBreadcrumbs: (_breadcrumbs: Array<PageLink>) => {},
  setPageDescription: (_description: string) => {},
  setEntityDetailValues: (detailId:Array<any>) => {},
  handleSelectValue:(_entityDetailValues:IUserModel | IWalletModel)=>{},
  setSelectUrlParam:(urlparam: string) =>{},
  setFormTitle:(_title: string) =>{},
}) 

const PageDataProvider: React.FC = ({children}) => {
  const [pageTitle, setPageTitle] = useState<string>('')
  const [pageDescription, setPageDescription] = useState<string>('')
  const [pageBreadcrumbs, setPageBreadcrumbs] = useState<Array<PageLink>>([])
  const [entityDetailValues, setEntityDetailValues] = useState<any[]>([])
  const [selectUrlParam, setSelectUrlParam] = useState<string>('')
  const [formTitle, setFormTitle] = useState<string>('')
  const [selectValue, handleSelectValue] = useState<IUserModel | IWalletModel>()

  const value: PageDataContextModel = {
    pageTitle,
    setPageTitle,
    pageDescription,
    setPageDescription,
    pageBreadcrumbs,
    setPageBreadcrumbs,
    entityDetailValues,
    setEntityDetailValues,
    selectUrlParam,
    setSelectUrlParam, 
    selectValue,
    handleSelectValue, 
    formTitle,
    setFormTitle
  }

  return <PageDataContext.Provider value={value}>{children}</PageDataContext.Provider>
}

function usePageData() {
  return useContext(PageDataContext)
}

type Props = {
  description?: string
  breadcrumbs?: Array<PageLink>
}

const PageTitle: FC<Props> = ({children, description, breadcrumbs}) => {
  const {setPageTitle, setPageDescription, setPageBreadcrumbs} = usePageData()
  useEffect(() => {
    if (children) {
      setPageTitle(children.toString())
    }
    return () => {
      setPageTitle('')
    }
  }, [children])

  useEffect(() => {
    if (description) {
      setPageDescription(description)
    }
    return () => {
      setPageDescription('')
    }
  }, [description])

  useEffect(() => {
    if (breadcrumbs) {
      setPageBreadcrumbs(breadcrumbs)
    }
    return () => {
      setPageBreadcrumbs([])
    }
  }, [breadcrumbs])

  return <></>
}

const PageDescription: React.FC = ({children}) => {
  const {setPageDescription} = usePageData()
  useEffect(() => {
    if (children) {
      setPageDescription(children.toString())
    }
    return () => {
      setPageDescription('')
    }
  }, [children])
  return <></>
}

export {PageDescription, PageTitle, PageDataProvider, usePageData}
