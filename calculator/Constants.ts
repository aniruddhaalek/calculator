export const gstinRegEx =
  "(^[0-9]{2})([A-Z]{5}[0-9]{4}[A-Z]{1})[1-9A-Z]{1}Z[0-9A-Z]{1}$";
export const phnoRegEx = "^[0-9]{12}$";
export enum genderType{
  male="M",
  female="F"
}
export interface StringValidPair {
  value:string,
  isValid?:boolean
}
