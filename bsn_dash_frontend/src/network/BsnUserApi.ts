import { TAddBsnPayload, TBsnUser } from './../interface/bsnUser.interface';
import { TMetaPayload, TResponseSuccess } from "@/interface"
import { AxiosBsn } from "@/lib/axios/AxiosBsn"
import { buildUrl_V1 } from "./urlBuilder"
import { TBSN_USER_STATUS } from '@/interface/enums';

interface TAllBsnPayload extends TMetaPayload  {
    code?: number
} ;

export const BsnUserApi = {
    collection:'bsn_users',
    get url(){
        return buildUrl_V1(this.collection)
    },
    // update a user
    updateBsnUserByCode(payload:{code:string,status:TBSN_USER_STATUS}){
        return AxiosBsn.patch(`${this.url}`,payload) as Promise<TResponseSuccess<{id:number}>>
    },
    // add a user
    addSingleBsnUser(payloadUser:TAddBsnPayload){
        return AxiosBsn.post(`${this.url}/bsn_user`,payloadUser) as Promise<TResponseSuccess<TBsnUser>>
    },
    // add bulk user
    addBulkBsnUser(payloadUsers:TAddBsnPayload[]){
        return AxiosBsn.post(`${this.url}`,payloadUsers) as Promise<TResponseSuccess<TBsnUser[]>>
    },


    // get all bsn users
    getAllBsnUsers({code,limit=10,page=1}:TAllBsnPayload){
        return AxiosBsn.get(this.url,{
            params:{
                code,
                page,
                limit
            }
        }) as Promise<TResponseSuccess<any>>
    },

    // delete a user by code
    deleteBsnUserByCode(code:string){
        return AxiosBsn.delete(`${this.url}/delete_record?code=${code}`) as Promise<TResponseSuccess<TBsnUser>>
    },

}