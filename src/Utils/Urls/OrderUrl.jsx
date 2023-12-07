import { basedUrl } from "../Network/Network";

export const getOrderUrl = basedUrl + '/order/get-Order'

export const addOrderUrl = basedUrl + '/order/create'

export const deleteOrderUrl = (id) => basedUrl + `/order/delete/${id}`

export const updateOrderUrl = (id) => basedUrl + `/order/update/${id}`

export const getOrderByIdUrl = (id) => basedUrl + `/order/get-singel/${id}`

export const getOrderByEmailUrl = (email) => basedUrl + `/order/get-Order/${email}`



