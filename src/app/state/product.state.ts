export enum DataStateEnum{
  LOADING,
  LOADED,
  ERROR
}
export enum ProductActionsType{
  GET_ALL_PRODUCTS="[PRODUCT] GET ALL PRODUCTS",
  GET_SELECTED_PRODUCTS="[PRODUCT] GET SELECTED PRODUCTS",
  GET_AVAILABLE_PRODUCTS="[PRODUCT] GET AVAILABLE PRODUCTS",
  SEARCH_PRODUCTS="[PRODUCT] SEARCH PRODUCTS",
  NEW_PRODUCTS="[PRODUCT] NEW PRODUCTS",
  SELECT_PRODUCT="[PRODUCT] SELECT PRODUCT;",
  DELETE_PRODUCT="[PRODUCT] DELETE PRODUCT;",
  EDIT_PRODUCT="[PRODUCT] EDIT PRODUCT;"
}
export  interface  ActionEvent{
  type:ProductActionsType,
  payload?: any
}
export interface AppDataState <T>{
  dataState?:DataStateEnum,
  data?:T,
  errorMessage?:string
}
