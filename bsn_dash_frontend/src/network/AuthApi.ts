import { TMetaPayload, TResponseSuccess } from "@/interface"
import { AxiosBsn } from "@/lib/axios/AxiosBsn"
import { buildUrl_V1 } from "./urlBuilder"


export const AuthApi = {
    collection:'auth',
    get url(){
        return buildUrl_V1(this.collection)
    },
    login(api_access_token:string){
        return AxiosBsn.post(`${this.url}/login`,{api_access_token}) as Promise<TResponseSuccess<any>>
    },

}