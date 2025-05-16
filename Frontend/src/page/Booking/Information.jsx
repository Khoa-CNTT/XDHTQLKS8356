import React from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { APP_ROUTER } from '../../utils/Constants';
import InforamtionRoom from './InforamtionRoom';

const Information = (props) => {
   const { infoCustomer, setInfoCustomer, setStep, dataRoom } = props;
   const handleInfoChange = (e) => {
      const { name, value } = e.target;
      setInfoCustomer({ ...infoCustomer, [name]: value });
   };
   const navigate = useNavigate()
   console.log("2",infoCustomer)
   console.log("3", dataRoom)
   const handleSubmit = () => {
      setStep(prev=>prev+1)
      const query = new URLSearchParams({
        fullname: infoCustomer?.fullname,
        email: infoCustomer?.email,
        phone: infoCustomer?.phone,
        address: infoCustomer?.address,
        totalAmount: dataRoom?.final_amount,
      }).toString();
    
      navigate(`/payment?${query}`);
    };
   return (
      <div>
         <form className='basis-2/3' onSubmit={handleSubmit}>
            <div>
               <h2 className="text-xl font-semibold mb-4">Thông tin khách hàng</h2>
               <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                     <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Họ và tên</label>
                        <input
                           type="text"
                           name="fullname"
                           value={infoCustomer.fullname}
                           className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           required
                           onChange={handleInfoChange}
                        />
                     </div>

                     <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Số điện thoại</label>
                        <input
                           type="tel"
                           name="phone"
                           value={infoCustomer.phone}
                           className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           required
                           pattern="[0-9]{10}"
                           placeholder="123 456 7890"
                           onChange={handleInfoChange}
                        />
                     </div>

                     <div className="col-span-2">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                        <input
                           type="email"
                           name="email"
                           value={infoCustomer.email}
                           className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           required
                           onChange={handleInfoChange}
                        />
                        <div className='text-xs italic text-neutral-600 mt-2'>Thông tin xác nhận sẽ được gửi về địa chỉ mail này</div>
                     </div>
                     <div className="col-span-2">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Địa chỉ</label>
                        <input
                           type="tel"
                           name="address"
                           value={infoCustomer.address}
                           className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           required
                           onChange={handleInfoChange}
                        />
                     </div>
                     <div className="col-span-2">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ghi chú</label>
                        <input
                           type="text"
                           name="note"
                           value={infoCustomer.note}
                           className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           onChange={handleInfoChange}
                        />
                     </div>
                  </div>
               </div>

            </div>
            <div>
            <h2 className="text-xl font-semibold my-4">Chi tiết phòng</h2>
            <InforamtionRoom dataRoomDetail={dataRoom}></InforamtionRoom>
            </div>
            <div className="flex justify-end mt-5">
               <button type='submit' className="cursor-pointer text-white bg-gray-800 hover:bg-gray-900 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
                  Tiếp theo
               </button>
            </div>

         </form>
      </div>
   );
};

export default Information;