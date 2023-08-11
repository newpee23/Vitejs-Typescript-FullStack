import { FC, useEffect, useState } from 'react'
import Select from "react-select";
import { Link, useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../store/store";
import { loadAsync_CustomerEdit, updateItem } from '../store/slices/showdetail';
import { custommer_data, custommer_type } from '../type';
import { Opprovince } from '../type/dropdown_type';
import { loadAsync_Amphures, loadAsync_Districts, loadAsync_Geographies, loadAsync_Provinces } from '../store/slices/formInput';

type EditParams = {
  itemId: string; // เมื่อส่งค่าตัวเลขผ่าน URL parameters เข้ามาใน React Router จะทำการแปลงค่านั้นให้เป็น string อัตโนมัติ
}

export const Edit: FC = () => {
  const dispatch = useAppDispatch();
  const [data, setData] = useState<custommer_type>(custommer_data);
  const { itemId } = useParams<EditParams>();
  const { editcustomer } = useAppSelector((state) => state?.showdetail);
  const { error } = useAppSelector((state) => state?.showdetail);
  const { geographies } = useAppSelector((state) => state?.forminput);
  const { provinces } = useAppSelector((state) => state?.forminput);
  const { amphures } = useAppSelector((state) => state?.forminput);
  const { districts } = useAppSelector((state) => state?.forminput);
  const [opgeographies, setOpGeographies] = useState<Opprovince[]>([]);
  const [opprovinces, setOpProvinces] = useState<Opprovince[]>([]);
  const [opamphures, setOpAmphures] = useState<Opprovince[]>([]);
  const [opdistricts, setOpDistricts] = useState<Opprovince[]>([]);
  const [zipcode, setZipcode] = useState<number | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<Opprovince | Opprovince[] | null>(null);
  const [selectedOptionsPV, setSelectedOptionsPV] = useState<Opprovince | Opprovince[] | null>(null);
  const [selectedOptionsAP, setSelectedOptionsAP] = useState<Opprovince | Opprovince[] | null>(null);
  const [selectedOptionsDT, setSelectedOptionsDT] = useState<Opprovince | Opprovince[] | null>(null);

  const handleSelect = (data: Opprovince): void => {
    setSelectedOptions(data);
    const fetchData_Provinces = async () => {
      dispatch(loadAsync_Provinces(data.value));
    };
    fetchData_Provinces();
    setData(prevData => ({
      ...prevData,
      geographies_id: data.value,
    }));
    setSelectedOptionsPV(null);
    setSelectedOptionsAP(null);
    setSelectedOptionsDT(null);
    setZipcode(null);
  }

  const handleSelectPV = (data: Opprovince): void => {
    setSelectedOptionsPV(data);
    const fetchData_Amphures = async () => {
      dispatch(loadAsync_Amphures(data.value));
    };
    fetchData_Amphures();
    setData(prevData => ({
      ...prevData,
      provinces_id: data.value,
    }));
  }

  const handleSelectAP = (data: Opprovince) => {
    setSelectedOptionsAP(data);
    const fetchData_Districts = async () => {
      dispatch(loadAsync_Districts(data.value));
    };
    fetchData_Districts();
    setData(prevData => ({
      ...prevData,
      amphures_id: data.value,
    }));
  }

  const handleSelectDT = (data: Opprovince) => {
    setSelectedOptionsDT(data);
    setData(prevData => ({
      ...prevData,
      districts_id: data.value,
    }));
    const zip_code = districts?.filter(item => parseInt(item.id) === data.value);
    if (zip_code && zip_code.length > 0) {
      setZipcode(zip_code[0].zip_code);
    } else {
      console.log("No zip codes or not enough zip codes found.");
    }
  }
  useEffect(() => {
    const fetchData_Detail = async () => {
      if (itemId) {
        const itemIdNumber = parseInt(itemId, 10); // แปลงเป็น number
        dispatch(loadAsync_CustomerEdit(itemIdNumber));
      }
    };
    const fetchData_Geographies = async () => {
      dispatch(loadAsync_Geographies());
    };

    fetchData_Geographies();
    fetchData_Detail();

  }, []);

  useEffect(() => {

    if (editcustomer) {

      setData({
        fname: editcustomer?.[0]?.fname as string,
        lname: editcustomer?.[0]?.lname as string,
        gender: editcustomer?.[0]?.gender as 'Male' | 'Female' | '',
        phone: editcustomer?.[0]?.phone as string,
        email: editcustomer?.[0]?.email as string,
        username: editcustomer?.[0]?.username as string,
        password: editcustomer?.[0]?.password as string,
        geographies_id: editcustomer?.[0]?.geographies_id as number | null,
        provinces_id: editcustomer?.[0]?.provinces_id as number | null,
        amphures_id: editcustomer?.[0]?.amphures_id as number | null,
        districts_id: editcustomer?.[0]?.districts_id as number | null,
        status: editcustomer?.[0]?.status as 'Active' | 'InActive' | '',
      });
      if (editcustomer?.[0]?.geographies_id) {
        setSelectedOptions([{
          value: editcustomer?.[0]?.geographies_id as number,
          label: editcustomer?.[0]?.geographies_name as string,
        }]);
      }
      if (editcustomer?.[0]?.provinces_id) {
        setSelectedOptionsPV([{
          value: editcustomer?.[0]?.provinces_id as number,
          label: editcustomer?.[0]?.provinces_name as string,
        }]);
      }
      if (editcustomer?.[0]?.amphures_id) {
        setSelectedOptionsAP([{
          value: editcustomer?.[0]?.amphures_id as number,
          label: editcustomer?.[0]?.amphures_name as string,
        }]);
      }
      if (editcustomer?.[0]?.districts_id) {
        setSelectedOptionsDT([{
          value: editcustomer?.[0]?.districts_id as number,
          label: editcustomer?.[0]?.districts_name as string,
        }]);
      }
      if (editcustomer?.[0]?.zip_code) {
        setZipcode(parseInt(editcustomer?.[0]?.zip_code, 10));
      }

    }
    const fetchData_Provinces = async () => {
      if (editcustomer?.[0]?.geographies_id) {
        const ge_id: number = editcustomer?.[0]?.geographies_id;
        dispatch(loadAsync_Provinces(ge_id));;
      }
    };
    const fetchData_Amphures = async () => {
      if (editcustomer?.[0]?.provinces_id) {
        const pv_id: number = editcustomer?.[0]?.provinces_id;
        dispatch(loadAsync_Amphures(pv_id));
      }
    };
    const fetchData_Districts = async () => {
      if (editcustomer?.[0]?.amphures_id) {
        const am_id: number = editcustomer?.[0]?.amphures_id;
        dispatch(loadAsync_Districts(am_id));
      }
    };

    fetchData_Districts();
    fetchData_Amphures();
    fetchData_Provinces();
  }, [editcustomer]);

  useEffect(() => {
    if (geographies !== null) {
      const formattedGeographies = geographies.map(item => ({
        value: item.id,
        label: item.name
      }));
      setOpGeographies(formattedGeographies);
    }
  }, [geographies]);

  useEffect(() => {
    if (provinces !== null) {
      const formattedProvinces = provinces.map(item => ({
        value: item.id,
        label: item.name_th
      }));
      setOpProvinces(formattedProvinces);
    }
  }, [provinces]);

  useEffect(() => {
    if (amphures !== null) {
      const formattedAmphures = amphures.map(item => ({
        value: item.id,
        label: item.name_th
      }));
      setOpAmphures(formattedAmphures);
    }
  }, [amphures]);

  useEffect(() => {
    if (districts !== null) {
      const formattedDistricts = districts.map(item => ({
        value: parseInt(item.id),
        label: item.name_th
      }));
      setOpDistricts(formattedDistricts);
    }
  }, [districts]);

  const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onSubmitFrom = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const editDataCustommer = async () => {
      if (itemId) {
        const id_itemId: number = parseInt(itemId, 10);
        dispatch(updateItem({ id: id_itemId, data: data }));
      }
    };
    editDataCustommer();

  };

  return (
    <section>
      <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
        <div className="container max-w-screen-lg mx-auto">
          <div>
            <h2 className="font-semibold text-xl text-gray-600">Responsive Form</h2>
            <p className="text-gray-500 mb-6">
              Form is mobile responsive. Give it a try.
            </p>

            <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
              <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">

                <div className='grid grid-cols-1 grid-rows-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-1'>
                  <div>
                    <div className="text-gray-600">
                      <p className="font-medium text-lg">Personal Details</p>
                      <p>Please fill out all the fields.</p>
                    </div>
                  </div>
                  <div className='text-right lg:text-left'>
                    <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                      <Link to="/">Back</Link>
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-2">
                  <form onSubmit={onSubmitFrom}>
                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-6">
                      <div className="md:col-span-3">
                        <label htmlFor="full_name">Fast Name</label>
                        <input
                          type="text"
                          name="fname"
                          id="fname"
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          placeholder="Full Name"
                          value={data.fname}
                          onChange={(e) => onChangeValue(e)}
                          required
                        />
                      </div>

                      <div className="md:col-span-3">
                        <label htmlFor="full_name">Last Name</label>
                        <input
                          type="text"
                          name="lname"
                          id="lname"
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          placeholder="Full Name"
                          value={data.lname}
                          onChange={(e) => onChangeValue(e)}
                          required
                        />
                      </div>

                      <div className="md:col-span-3">
                        <label htmlFor="full_name">Gender</label>
                        <div className='flex mt-2'>
                          <div className="flex items-center mr-3">
                            <input id="default-radio-1" type="radio" value="Male"
                              name="gender"
                              checked={data.gender === "Male"}
                              onChange={onChangeValue} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                            <label htmlFor="default-radio-1" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Male</label>
                          </div>
                          <div className="flex items-center">
                            <input id="default-radio-2" type="radio" value="Female"
                              name="gender"
                              checked={data.gender === "Female"}
                              onChange={onChangeValue} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                            <label htmlFor="default-radio-2" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Female</label>
                          </div>
                        </div>
                      </div>

                      <div className="md:col-span-3">
                        <label htmlFor="full_name">Phone</label>
                        <input
                          type="text"
                          name="phone"
                          id="phone"
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          placeholder="Phone"
                          value={data.phone}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            let value = e.target.value.slice(0, 10);
                            value = value.replace(/-/g, '');
                            const updatedEvent = {
                              ...e,
                              target: {
                                ...e.target,
                                name: 'phone',
                                value: value,
                              },
                            };
                            onChangeValue(updatedEvent);
                          }}
                          required
                        />
                      </div>

                      <div className="md:col-span-3">
                        <label htmlFor="email">Email Address</label>
                        <input
                          type="email"
                          name="email"
                          id="email"
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          value={data.email}
                          onChange={(e) => onChangeValue(e)}
                          placeholder="Email@domain.com"
                          required
                        />
                      </div>
                      <div className="md:col-span-3">

                      </div>

                      <div className="md:col-span-3">
                        <label htmlFor="address">Username</label>
                        <input
                          type="text"
                          name="username"
                          id="username"
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          placeholder="Address"
                          value={data.username}
                          onChange={(e) => onChangeValue(e)}
                          required
                        />
                      </div>

                      <div className="md:col-span-3">
                        <label htmlFor="address">Password</label>
                        <input
                          type="text"
                          name="password"
                          id="password"
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          placeholder="Password"
                          value={data.password}
                          onChange={(e) => onChangeValue(e)}
                          required
                        />
                      </div>

                      <div className="md:col-span-3">
                        <label htmlFor="city">Geographies</label>
                        <div className="flex">

                          <Select
                            className="w-full mt-1"
                            options={opgeographies}
                            name='geographies'
                            placeholder="Select Geographies"
                            value={selectedOptions}
                            onChange={(newValue) => handleSelect(newValue as Opprovince)}
                            isSearchable={true}
                          />
                          <div className="relative">


                            {selectedOptions && (
                              <button
                                className="absolute mt-4 mr-12 top-0 right-0 cursor-pointer outline-none focus:outline-none transition-all text-gray-300 hover:text-red-600"
                                onClick={() => setSelectedOptions(null)}
                              >
                                <svg
                                  className="w-4 h-4 fill-current"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M12 2c6.075 0 11 4.925 11 11s-4.925 11-11 11S1 19.075 1 13 5.925 2 12 2zm0 2c-4.962 0-9 4.038-9 9s4.038 9 9 9 9-4.038 9-9-4.038-9-9-9zm2.293 5.293l-1.293 1.293-2.293-2.293-2.293 2.293-1.293-1.293 2.293-2.293-2.293-2.293 1.293-1.293 2.293 2.293 2.293-2.293 1.293 1.293-2.293 2.293 2.293 2.293z" />
                                </svg>
                              </button>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="md:col-span-3">
                        <label htmlFor="Country">Provinces</label>
                        <div className="flex">
                          <Select
                            className="w-full mt-1"
                            options={opprovinces}
                            name='provinces'
                            placeholder="Select Provinces"
                            value={selectedOptionsPV}
                            onChange={(newValue) => handleSelectPV(newValue as Opprovince)}
                            isSearchable={true}
                          />


                          <div className="relative ">
                            {selectedOptionsPV && (
                              <button
                                className="absolute mt-4 mr-12 top-0 right-0 cursor-pointer outline-none focus:outline-none transition-all text-gray-300 hover:text-red-600"
                                onClick={() => setSelectedOptionsPV(null)}
                              >
                                <svg
                                  className="w-4 h-4 fill-current"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M12 2c6.075 0 11 4.925 11 11s-4.925 11-11 11S1 19.075 1 13 5.925 2 12 2zm0 2c-4.962 0-9 4.038-9 9s4.038 9 9 9 9-4.038 9-9-4.038-9-9-9zm2.293 5.293l-1.293 1.293-2.293-2.293-2.293 2.293-1.293-1.293 2.293-2.293-2.293-2.293 1.293-1.293 2.293 2.293 2.293-2.293 1.293 1.293-2.293 2.293 2.293 2.293z" />
                                </svg>
                              </button>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="md:col-span-2">
                        <label htmlFor="Country">Districts</label>
                        <div className="flex">
                          <Select
                            className="w-full mt-1"
                            options={opamphures}
                            name='amphures'
                            placeholder="Select Districts"
                            value={selectedOptionsAP}
                            onChange={(newValue) => handleSelectAP(newValue as Opprovince)}
                            isSearchable={true}
                          />


                          <div className="relative ">
                            {selectedOptionsAP && (
                              <button
                                className="absolute mt-4 mr-12 top-0 right-0 cursor-pointer outline-none focus:outline-none transition-all text-gray-300 hover:text-red-600"
                                onClick={() => setSelectedOptionsAP(null)}
                              >
                                <svg
                                  className="w-4 h-4 fill-current"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M12 2c6.075 0 11 4.925 11 11s-4.925 11-11 11S1 19.075 1 13 5.925 2 12 2zm0 2c-4.962 0-9 4.038-9 9s4.038 9 9 9 9-4.038 9-9-4.038-9-9-9zm2.293 5.293l-1.293 1.293-2.293-2.293-2.293 2.293-1.293-1.293 2.293-2.293-2.293-2.293 1.293-1.293 2.293 2.293 2.293-2.293 1.293 1.293-2.293 2.293 2.293 2.293z" />
                                </svg>
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="md:col-span-2">
                        <label htmlFor="Country">Amphures</label>
                        <div className="flex">
                          <Select
                            className="w-full mt-1"
                            options={opdistricts}
                            name='districts'
                            placeholder="Select Amphures"
                            value={selectedOptionsDT}
                            onChange={(newValue) => handleSelectDT(newValue as Opprovince)}
                            isSearchable={true}
                          />


                          <div className="relative ">
                            {selectedOptionsDT && (
                              <button
                                className="absolute mt-4 mr-12 top-0 right-0 cursor-pointer outline-none focus:outline-none transition-all text-gray-300 hover:text-red-600"
                                onClick={() => setSelectedOptionsDT(null)}
                              >
                                <svg
                                  className="w-4 h-4 fill-current"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M12 2c6.075 0 11 4.925 11 11s-4.925 11-11 11S1 19.075 1 13 5.925 2 12 2zm0 2c-4.962 0-9 4.038-9 9s4.038 9 9 9 9-4.038 9-9-4.038-9-9-9zm2.293 5.293l-1.293 1.293-2.293-2.293-2.293 2.293-1.293-1.293 2.293-2.293-2.293-2.293 1.293-1.293 2.293 2.293 2.293-2.293 1.293 1.293-2.293 2.293 2.293 2.293z" />
                                </svg>
                              </button>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="md:col-span-2">
                        <label htmlFor="zipcode">Zipcode</label>
                        <input
                          type="text"
                          name="zipcode"
                          id="zipcode"
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          placeholder="Zipcode"
                          value={zipcode !== null ? zipcode.toString() : ''}
                          readOnly
                        />
                      </div>

                    </div>
                    <div className="col-span-5 mt-3 text-right">
                      <div className='flex justify-between items-center'>
                        <p className='text-green-700'>{error}</p>
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                          Save
                        </button>
                      </div>

                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
