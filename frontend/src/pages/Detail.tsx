import { FC, useEffect } from 'react'
import { useAppSelector, useAppDispatch } from "../store/store";
import { deleteItem, loadAsync_showDetail } from '../store/slices/showdetail';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { FaEdit , FaMinusCircle } from "react-icons/fa";
type Props = {};

const Detail: FC = ({ }: Props) => {

  const dispatch = useAppDispatch();
  const { customer } = useAppSelector((state) => state?.showdetail);

  useEffect(() => {
    const fetchData_Detail = async () => {
      dispatch(loadAsync_showDetail());
    };
    fetchData_Detail();
  }, []);

  return (
    <section>
      <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
        <div className="container max-w-screen-lg mx-auto">
          <div>
            <div className='grid grid-cols-1 grid-rows-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 mb-3 sm:mb-0'>


              <div className='grid-cols-1'>

                <h2 className="font-semibold text-xl text-gray-600">Responsive Form</h2>
                <p className="text-gray-500 mb-6">
                  Form is mobile responsive. Give it a try.
                </p>

              </div>
              <div className='flex justify-end items-center grid-cols-1 '>
                <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                  <Link to="/">Back</Link>
                </button>
              </div>
            </div>


            <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
              <div className="">


                <div className="relative overflow-x-auto">
                  <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-center whitespace-nowrap">
                          #
                        </th>
                        <th scope="col" className="px-6 py-3 text-center whitespace-nowrap">
                          Full Name
                        </th>
                        <th scope="col" className="px-6 py-3 text-center whitespace-nowrap">
                          Gender
                        </th>
                        <th scope="col" className="px-6 py-3 text-center whitespace-nowrap">
                          Phone
                        </th>
                        <th scope="col" className="px-6 py-3 text-center whitespace-nowrap">
                          Email
                        </th>
                        <th scope="col" className="px-6 py-3 text-center whitespace-nowrap">
                          Username
                        </th>
                        <th scope="col" className="px-6 py-3 text-center whitespace-nowrap">
                          Password
                        </th>
                        <th scope="col" className="px-6 py-3 text-center whitespace-nowrap">
                          Address
                        </th>
                        <th scope="col" className="px-6 py-3 text-center whitespace-nowrap">
                          Create Data
                        </th>
                        <th scope="col" className="px-6 py-3 text-center whitespace-nowrap">
                          Status
                        </th>
                        <th scope="col" className="px-6 py-3 text-center whitespace-nowrap">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>

                      {customer?.map((item, index) => (
                        <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                          <th scope="row" className="px-6 py-4 text-center whitespace-nowrap">
                            {(index + 1)}
                          </th>
                          <td className="px-6 py-4 text-left whitespace-nowrap">
                            {item.fname + ' ' + item.lname}
                          </td>
                          <td className="px-6 py-4 text-center whitespace-nowrap">
                            {item.gender}
                          </td>
                          <td className="px-6 py-4 text-center whitespace-nowrap">
                            {item.phone ? item.phone :  '-'}
                          </td>
                          <td className="px-6 py-4 text-center whitespace-nowrap">
                            {item.email ? item.email : '-'}
                          </td>
                          <td className="px-6 py-4 text-center whitespace-nowrap">
                            {item.username ? item.username : '-'}
                          </td>
                          <td className="px-6 py-4 text-center whitespace-nowrap">
                            {item.password ? item.password : '-'}
                          </td>
                          <td className="px-6 py-4 min-w-[300px]">
                            {item.geographies_name ? item.geographies_name : ''}&nbsp;{item.provinces_name ? item.provinces_name : ''}&nbsp;
                            {item.amphures_name ? item.amphures_name : ''}&nbsp;{item.districts_name ? item.districts_name : ''}&nbsp;
                            {item.zip_code ? item.zip_code : ''}
                          </td>
                          <td className="px-6 py-4 text-center whitespace-nowrap">
                            {format(new Date(item.date), 'dd/MM/yyyy HH:mm:ss')}
                          </td>
                          <td className="px-6 py-4 text-center">
                            {item.status === 'Active' ?

                              <p className='p-2 bg-green-500 rounded text-white'>{item.status}</p>
                              :
                              <p className='p-2 bg-red-500 rounded text-white'>{item.status}</p>
                            }
                          </td>
                          <td className="px-6 py-4 text-center flex text-2xl">
                          <Link to={`/edit/${item.id}`}><FaEdit className='hover:text-yellow-600 cursor-pointer m-2'/></Link>
                            <FaMinusCircle className='hover:text-red-700 cursor-pointer m-2' onClick={() => dispatch(deleteItem(item.id))}/>
                          </td>
                        </tr>
                      ))}

                    </tbody>
                  </table>
                </div>


              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Detail