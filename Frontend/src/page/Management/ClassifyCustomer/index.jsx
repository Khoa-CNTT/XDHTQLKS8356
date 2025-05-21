import React from 'react';
import GeneralTable from '../../../components/GeneralTable';

const ClassifyCustomer = () => {
    const data =[
        {
            "total": "2",
            "price": "5000000",
            "id": 2,
            "fullname": "Nguyễn Phúc",
            "cluster": 0
        },
        {
            "total": "3",
            "price": "7000000",
            "id": 5,
            "fullname": "Lê Minh Nhật",
            "cluster": 0
        },
        {
            "total": "1",
            "price": "500000",
            "id": 8,
            "fullname": "Nguyễn Bá Hưng",
            "cluster": 2
        },
        {
            "total": "2",
            "price": "25000000",
            "id": 10,
            "fullname": "Nguyễn Bảy",
            "cluster": 1
        }
    ]
    const columns = [
        { key: "id", label: "Mã khách hàng" },
        { key: "fullname", label: "Tên khách hàng" },
        { key: "cluster", label: "Nhóm khách hàng"},
        { key: "total", label: "Tổng đơn" },
        { key: "price", label: "Tổng tiền" },
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