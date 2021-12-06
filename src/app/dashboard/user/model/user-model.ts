import { Transaction } from "../../transaction/model/transaction-model";

export interface User{
    id: string;
    name: string;
    username: string;
    password: string;
    email: string;
    phoneNumber: string;
    address: string;
}