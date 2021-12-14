export interface Grave {
    id: string,
    name: string,
    type: string,
    availableSlots: number,
    phoneNumber: string,
    price: number,
    address: string,
    description: string,
    image?: string;
}