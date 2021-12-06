import { Transaction } from "../../transaction/model/transaction-model";

export interface User{
    id: String;
    name: String;
    username: String;
    password: String;
    email: String;
    phoneNumber: String;
    address: String;
}