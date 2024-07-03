import { TBSN_USER_STATUS } from "./enums"

export type TBsnUser = {
    id: number,
    code: string,
    status: TBSN_USER_STATUS,
    name: string|null,
    ic: string|null,
    phone_number: string|null,
    company_name: string|null
  }
export type TAddBsnPayload = {
  code: string,
  status:TBSN_USER_STATUS,
  name?: string
  ic?: string
  phone_number?: string
  company_name?: string
}