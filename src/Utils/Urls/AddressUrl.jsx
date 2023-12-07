import { basedUrl } from "../Network/Network";

export const getAddressUrl = basedUrl + '/address/get-address'

export const addAddressUrl = basedUrl + '/address/create'

export const deleteAddressUrl = (id) => basedUrl + `/address/delete/${id}`

export const updateAddressUrl = (id) => basedUrl + `/address/update/${id}`

export const getAddressByIdUrl = (id) => basedUrl + `/address/get-singel/${id}`

export const getAddressByEmailUrl = (email) => basedUrl + `/address/get-address/${email}`




