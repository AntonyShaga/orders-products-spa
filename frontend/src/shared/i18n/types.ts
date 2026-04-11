import { RouteKey } from '@/config/routes'

export interface PageDictionary {
  title: string
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
  [K in RouteKey]?: PageDictionary
} & {
  sidebar: SidebarDictionary
  header: HeaderDictionary
  modal: ModalDictionary
  auth: AuthDictionary
}
