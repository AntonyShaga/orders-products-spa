import { RouteKey } from '@/config/routes'

export interface PageDictionary {
  title: string
}

export interface ProductsPageDictionary {
  title: string
}

export interface ProductsToolbarDictionary {
  chartTitle: string
  filterAll: string
  productTypes: {
    phone: string
    laptop: string
    monitor: string
  }
}

export interface ProductsTableDictionary {
  name: string
  type: string
  guarantee: string
  price: string
  order: string
  status: string
  empty: string
  statusFree: string
  statusRepair: string
  productTypes: {
    phone: string
    laptop: string
    monitor: string
  }
}

export interface ProductsDictionary {
  page: ProductsPageDictionary
  toolbar: ProductsToolbarDictionary
  table: ProductsTableDictionary
}

export interface HeaderDictionary {
  logo: string
  today: string
  search: string
  sessions: string
}

export interface ModalDictionary {
  deleteTitle?: string
  cancelBtn?: string
  confirmBtn?: string
  saveBtn?: string
  createTitle?: string
}

export interface AuthDictionary {
  loginTitle: string
  registerTitle: string

  emailPlaceholder: string
  passwordPlaceholder: string
  confirmPasswordPlaceholder: string
  passwordsMismatch: string

  loginButton: string
  registerButton: string
  loading: string

  invalidEmail: string
  minPassword: string
  invalidCredentials: string
  userExists: string
  unexpectedError: string

  noAccount: string
  haveAccount: string

  loginLink: string
  registerLink: string
}

export type SidebarDictionary = Record<RouteKey, string>

export type Dictionary = {
  sidebar: SidebarDictionary
  header: HeaderDictionary
  modal: ModalDictionary
  auth: AuthDictionary
  products: ProductsDictionary
}
