import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import GeneralTable from '../../../components/GeneralTable';
import { userServices } from '../../../service/userServices';
import { MdDeleteForever } from "react-icons/md";
import { MdLockReset } from "react-icons/md";
import PersonnelModal from './ModalPersonnel';
const Personnel = () => {
  const columns = [
    { key: "id", label: "Mã nhân viên"},
    { key: "image", label: "Hình ảnh"},
    { key: "fullname", label: "Họ và tên"},
    { key: "email", label: "Email" },
    { key: "phone", label: "Số điện thoại" },
    {
      key: "add",
      label: "Cấp lại mật khẩu",
      render: (row) => (
          <button
              onClick={(event) => handleAddExtentionRoom(event, row)}
              className="z-10 text-center mx-auto p-2 hover:bg-slate-200 hover:rounded-md cursor-pointer"
          >
              <MdLockReset   className="h-6 w-6" />
          </button>
      ),
  },
  {
    key: "button",
    label: "Xóa",
    render: (row) => (
        <button
            onClick={(event) => handleDeleteRoom(event, row)}
            className="z-10 text-center mx-auto p-2 hover:bg-slate-200 hover:rounded-md cursor-pointer"
        >
            <MdDeleteForever className="h-6 w-6" />
        </button>
    ),
},
    
];
const [data, setData] = useState([]);
const fetchCustomer = async () => {
    const result = await userServices.getAllUser('employee')
    setData(result);
};
const [modalOpen, setModalOpen] = useState(false);
useEffect(() => {
    fetchCustomer();
}, []);
  return (
    <div>
            <GeneralTable
                datas={data}
                columns={columns}
                functionButton="Thêm nhân viên"
                handleButton={()=>{setModalOpen(true)}}
            >
            </GeneralTable>
            {modalOpen && (
        <PersonnelModal
          lable="Thêm nhân viên"
          handleClose={() => setModalOpen(false)}
          fetchData={fetchCustomer}
        />
      )}
        </div>
  );
};

export default Personnel;
