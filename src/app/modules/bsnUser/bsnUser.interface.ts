import { TBSN_USER_STATUS } from "../../../interfaces/enum"

export type TBsnCreatePayload = {
    code: number,
    status: TBSN_USER_STATUS,
    name?: string,
    ic?: string
    phone_number?: string
}

export type TBsnuserFilters = {
    code?: number,
}

export type TBsnUpdatePayload = {
    code: number,
    name?: string,
    ic?: string
    phone_number?: string
}

