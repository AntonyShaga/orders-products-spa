import { ModalDictionary } from '../types'

const modals: ModalDictionary = {
  deleteTitle: 'Are you sure you want to delete this order?',
  cancelBtn: 'Cancel',
  confirmBtn: 'Delete',

  createProductTitle: 'Create product',
  createProductConfirm: 'Create',

  confirmCloseTitle: 'You have unsaved changes. Leave?',
  confirmLeave: 'Leave anyway',

  fields: {
    title: 'Title',
    serialNumber: 'Serial number (e.g. 123)',
    usd: 'USD',
    uah: 'UAH',
  },

  errors: {
    required: 'Required',
    serialMin: 'At least 3 digits',
    serialMax: 'Too large',
  },

  productTypes: {
    phone: 'Phone',
    laptop: 'Laptop',
    monitor: 'Monitor',
  },
  toast: {
    product: {
      created: 'Product "{{title}}" created',
      deleted: 'Product "{{title}}" deleted',
      errorCreate: 'Error while creating product',
      errorDelete: 'Error while deleting product',
    },
    order: {
      created: 'Order "{{title}}" created',
      deleted: 'Order "{{title}}" deleted',
      errorCreate: 'Error while creating order',
      errorDelete: 'Error while deleting order',
    },
  },
}

export default modals
