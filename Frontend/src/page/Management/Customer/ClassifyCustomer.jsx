import React, { useEffect, useState } from 'react';
import GeneralTable from '../../../components/GeneralTable';
import { userServices } from '../../../service/userServices';

const ClassifyCustomer = () => {
   
    const [data, setData] = useState([]);
    const fetchCustomer = async () => {
        const result = await userServices.getUserClassification()
        setData(result);
    };

    useEffect(() => {
        fetchCustomer();
    }, []);
    const columns = [
        { key: "id", label: "Mã khách hàng" },
        { key: "fullname", label: "Tên khách hàng" },
        { key: "cluster", label: "Nhóm khách hàng", isFilterable: true},
        { key: "total_booking", label: "Tổng đơn" },
        { key: "total_price", label: "Tổng tiền" },
    ];
    return (
        <div>
            <GeneralTable
                datas={data}
                columns={columns}
                // renderExpandedRow={renderExpandedRow}  
            ></GeneralTable>
        </div>
    );
};

export default ClassifyCustomer;