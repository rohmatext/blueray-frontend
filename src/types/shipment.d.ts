export interface Shipment {
    id: number;
    user_id: number;
    external_id: string;
    status: string;
    courier_company: string;
    courier_type: string;
    courier_link: string;
    tracking_id: string;
    delivery_type: string;
    delivery_datetime: string;
    price: string;
    shipper_name: string;
    origin_name: string;
    origin_phone: string;
    origin_address: string;
    destination_name: string;
    destination_phone: string;
    destination_address: string;
    raw_response: object;
    reference_id?: string;
    note?: string;
    [key: string]: unknown;
}

export interface ShipmentItem {
    id: number;
    shipment_id: number;
    name: string;
    value: string;
    quantity: number;
    weight: number;
    description: string;
    [key: string]: unknown;
}

export interface Tracking {
    id: string;
    waybill_id: string;
    status: string;
    courier: {
        company: string;
        name: string | null;
        phone: string | null;
        driver_name: string | null;
        driver_phone: string | null;
    };
    origin: {
        contact_name: string;
        address: string;
    };
    destination: {
        contact_name: string;
        address: string;
    };
    history: {
        note: string;
        service_type: string;
        status: string;
        updated_at: string;
    }[];
    link: string;
    order_id: string;
    [key: string]: unknown;
}
