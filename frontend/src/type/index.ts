export type provinces_type = {
    id: number;
    type: string;
    name_th: string;
    name_en: string;
    geography_id: number;	
}

export type geographies_type = {
    id: number;
    name: string;
}

export type districts_type = {
    id: string;
    zip_code: number;
    name_th: string;
    name_en: string;
    amphure_id: number;	
}

export type amphures_type = {
    id: number;
    code: string;
    name_th: string;
    name_en: string;
    province_id	: number;	
}

export type custommer_type = {
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

export const custommer_data:custommer_type = {
      fname: '',
      lname: '',
      gender: '',
      phone: '',
      email: '',
      username: '',
      password: '',
      geographies_id: null,
      provinces_id: null,
      amphures_id: null,
      districts_id: null,
      status: 'Active',
  }

  export type detailCustomer = {
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