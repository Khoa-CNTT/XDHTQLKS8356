import React, { useEffect, useState } from 'react';
import { userServices } from '../../../service/userServices';
import GeneralTable from '../../../components/GeneralTable';

const AllCustomer = () => {
    const columns = [
        { key: "id", label: "Mã khách hàng"},
        { key: "image", label: "Hình ảnh"},
        { key: "fullname", label: "Tên khách hàng"},
        { key: "email", label: "Email" },
        { key: "phone", label: "Số điện thoại" },
     
        
    ];
    const [data, setData] = useState([]);
    const fetchCustomer = async () => {
        const result = await userServices.getAllUser()
        setData(result);
    };

    useEffect(() => {
        fetchCustomer();
    }, []);
    return (
        <div>
            <GeneralTable
                datas={data}
                columns={columns}
            >
            </GeneralTable>
        </div>
    );
};

export default AllCustomer;