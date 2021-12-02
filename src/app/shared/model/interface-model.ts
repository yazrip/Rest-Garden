export interface Validation {
    isValid(): boolean;
    isFieldValid(fieldName: string): { [key: string]: boolean };
    displayErrors(fieldName:string):string;
  }