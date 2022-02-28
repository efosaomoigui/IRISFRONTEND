/* eslint-disable react-hooks/exhaustive-deps */
import React, {FC, createContext, useContext, useEffect, useState} from 'react'
import { IRoleModel } from '../../../app/modules/auth/models/AuthInterfaces'
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
  handleSelectValues?:(_entityDetailValues:any)=>any
  selectUrlParam?:string
  setSelectUrlParam?:(urlparam: string) =>void
  formTitle?: string
  setFormTitle: (_title: string) => void

  roleData?: IRoleModel[]
  setRoleData: (_data: IRoleModel[]) => void
}

const PageDataContext = createContext<PageDataContextModel>({
  setPageTitle: (_title: string) => {},
  setPageBreadcrumbs: (_breadcrumbs: Array<PageLink>) => {},
  setPageDescription: (_description: string) => {},
  setEntityDetailValues: (detailId:Array<any>) => {},
  handleSelectValues:(_entityDetailValues:Array<any>)=>{},
  setSelectUrlParam:(urlparam: string) =>{},
  setFormTitle:(_title: string) =>{},
  setRoleData:(_data: IRoleModel[]) =>{}
}) 

const PageDataProvider: React.FC = ({children}) => {
  const [pageTitle, setPageTitle] = useState<string>('')
  const [pageDescription, setPageDescription] = useState<string>('')
  const [pageBreadcrumbs, setPageBreadcrumbs] = useState<Array<PageLink>>([])
  const [entityDetailValues, setEntityDetailValues] = useState<any[]>([])
  const [selectUrlParam, setSelectUrlParam] = useState<string>('')
  const [formTitle, setFormTitle] = useState<string>('')
  const [roleData, setRoleData] = useState<IRoleModel[]>([])

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
    formTitle,
    setFormTitle,
    roleData,
    setRoleData
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
