import { TBSN_USER_STATUS } from '../../../interfaces/enum'

export type TBsnCreatePayload = {
  code: string
  status: TBSN_USER_STATUS
  name?: string
  ic?: string
  phone_number?: string
  company_name?: string
}

export type TBsnuserFilters = {
  code?: string
}

export type TBsnUpdatePayload = {
  code: string
  name?: string
  ic?: string
  phone_number?: string
  company_name?: string
}
