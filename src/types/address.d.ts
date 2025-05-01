export interface Address {
    id: number;
    name: string;
    phone: string;
    address: string;
    subdistrict: string;
    city: string;
    province: string;
    zip: string;
    note: string | null;
    full_address: string;
}
