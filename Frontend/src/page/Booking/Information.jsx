import React from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { APP_ROUTER } from '../../utils/Constants';

const Information = (props) => {
   const { infoCustomer, setInfoCustomer, setStep } = props;
   const handleInfoChange = (e) => {
      const { name, value } = e.target;
      setInfoCustomer({ ...infoCustomer, [name]: value });
   };
   console.log(infoCustomer)
   return (
      <div>
         <form className='basis-2/3' onSubmit={()=> setStep(prev=>prev+1)}>
            <div>
               <h2 className="text-xl font-semibold mb-4">Thông tin khách hàng</h2>
               <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                     <div>
                        <label className="block text-gray-700 text-sm mb-1">Họ tên</label>
                        <input
                           type="text"
                           name="fullname"
                           value={infoCustomer.fullname}
                           className="w-full p-1 border outline-none rounded-lg focus:ring-blue-500 focus:border-blue-500"
                           required
                           onChange={handleInfoChange}
                        />
                     </div>

                     <div>
                        <label className="block text-gray-700 text-sm mb-1">Số điện thoại</label>
                        <input
                           type="tel"
                           name="phone"
                           value={infoCustomer.phone}
                           className="w-full p-1 border outline-none rounded-lg focus:ring-blue-500 focus:border-blue-500"
                           required
                           pattern="[0-9]{10}"
                           placeholder="123 456 7890"
                           onChange={handleInfoChange}
                        />
                     </div>

                     <div className="col-span-2">
                        <label className="block text-gray-700 text-sm mb-1">Email</label>
                        <input
                           type="email"
                           name="email"
                           value={infoCustomer.email}
                           className="w-full p-1 border outline-none rounded-lg focus:ring-blue-500 focus:border-blue-500"
                           required
                           onChange={handleInfoChange}
                        />
                        <div className='text-[10px] text-neutral-600'>Thông tin xác nhận sẽ được gửi về địa chỉ mail này</div>
                     </div>
                     <div className="col-span-2">
                        <label className="block text-gray-700 text-sm mb-1">Địa chỉ</label>
                        <input
                           type="tel"
                           name="address"
                           value={infoCustomer.address}
                           className="w-full p-1 border outline-none rounded-lg focus:ring-blue-500 focus:border-blue-500"
                           required
                           onChange={handleInfoChange}
                        />
                     </div>
                     <div className="col-span-2">
                        <label className="block text-gray-700 text-sm mb-1">Ghi chú</label>
                        <input
                           type="text"
                           name="note"
                           value={infoCustomer.note}
                           className="w-full p-1 border outline-none rounded-lg focus:ring-blue-500 focus:border-blue-500"
                           onChange={handleInfoChange}
                        />
                     </div>
                  </div>
               </div>

            </div>
            <div className="flex justify-end mt-5">
               <button type='submit' className="text-white bg-gray-800 hover:bg-gray-900 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
                  Tiếp theo
               </button>
            </div>

         </form>
      </div>
   );
};

export default Information;