export type showDetail_type = {
    id: number;
    fname: string;
    lname: string;
    gender: 'Male' | 'Female' | '';
    phone: string | null;
    email: string | null;
    username: string;
    password: string;
    geographies_id: number | null;
    provinces_id: number | null;
    amphures_id: number | null;
    districts_id: number | null;
    status: 'Active' | 'InActive' | '';
    date: string;
    provinces_name: string | null;
    geographies_name: string | null;
    districts_name: string | null;
    zip_code: string | null;
    amphures_name: string | null;
}

export type geographies_type = {
    id: number;
    name: string;
}

export type provinces_type = {
    id: number;
    code: string;
    name_th: string;
    name_en: string;
    geography_id: number;
}

export type RowDataPacket = {
    fname: string;
    lname: string;
    gender: 'Male' | 'Female' | '';
    phone: string;
    email: string;
    username: string;
    password: string;
    geographies_id: number | null;
    provinces_id: number | null;
    amphures_id: number | null;
    districts_id: number | null;
    status: 'Active' | 'InActive' | '';
}