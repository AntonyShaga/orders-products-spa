import { RouteKey } from '@/config/routes'

export interface CommonDictionary {
  orderLabel: string
}

export interface OrdersPageDictionary {
  title: string
  addOrder: string
  empty: string
}
export interface OrderCardDictionary extends CommonDictionary {
  product: {
    one: string
    few: string
    many: string
  }
}

export interface ProductRowDictionary extends CommonDictionary {
  free: string
  repair: string
}

export interface OrderDetailsDictionary extends CommonDictionary {
  empty: string
  addProduct: string
  status: ProductRowDictionary
}

export interface OrdersDictionary {
  page: OrdersPageDictionary
  orderCard: OrderCardDictionary
  orderDetails: OrderDetailsDictionary
  toast: Pick<ToastDictionary['order'], 'created' | 'errorCreate'>
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

export interface ProductsTableDictionary extends CommonDictionary {
  name: string
  type: string
  guarantee: string
  price: string
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
  createProductTitle: string
  createProductConfirm: string
  confirmCloseTitle: string
  confirmLeave: string

  fields: {
    title: string
    serialNumber: string
    usd: string
    uah: string
  }

  errors: {
    required: string
    serialMin: string
    serialMax: string
  }

  productTypes: {
    phone: string
    laptop: string
    monitor: string
  }
  toast: ToastDictionary
}

export interface ToastDictionary {
  product: {
    created: string
    deleted: string
    errorCreate: string
    errorDelete: string
  }

  order: {
    created: string
    deleted: string
    errorCreate: string
    errorDelete: string
  }
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
  orders: OrdersDictionary
}
