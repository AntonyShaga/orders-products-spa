import { ModalDictionary } from '@/shared'
import { z } from 'zod'
export const createProductSchema = (dict: ModalDictionary) =>
  z.object({
    title: z.string().min(1, dict.errors.required),
    serialNumber: z.number().min(100, dict.errors.serialMin).max(999999999, dict.errors.serialMax),
    usd: z.number().min(0),
    uah: z.number().min(0),
  })
