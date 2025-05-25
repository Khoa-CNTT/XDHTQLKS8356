import React, { useEffect, useState } from 'react';
import { userServices } from '../../../service/userServices';
import GeneralTable from '../../../components/GeneralTable';
import { authService } from '../../../service/authService';

const AllCustomer = () => {
    const columns = [
        { key: "id", label: "Mã khách hàng" },
        { key: "image", label: "Hình ảnh" },
        { key: "fullname", label: "Tên khách hàng" },
        { key: "email", label: "Email" },
        { key: "phone", label: "Số điện thoại" },
      ];
    
      const [data, setData] = useState([]);
      const [searchData, setSearchData] = useState("");
      const [debouncedSearch, setDebouncedSearch] = useState("");
    
      const fetchCustomer = async () => {
        const result = await userServices.getAllUser("customer");
        setData(result);
      };
    
      const searchCustomer = async (value) => {
        const result = await authService.findUser(value);
        setData(result.user);
      };
    
      // Debounce: cập nhật debouncedSearch sau 500ms khi searchData thay đổi
      useEffect(() => {
        const handler = setTimeout(() => {
          setDebouncedSearch(searchData.trim());
        }, 500);
    
        return () => clearTimeout(handler); // cleanup nếu searchData thay đổi trước 500ms
      }, [searchData]);
    
      // Gọi API khi debouncedSearch thay đổi
      useEffect(() => {
        if (debouncedSearch) {
          searchCustomer(debouncedSearch);
        } else {
          fetchCustomer();
        }
      }, [debouncedSearch]);
    
      const handleSearchChange = (value) => {
        setSearchData(value);
      };
    
      // Gọi load data ban đầu
      useEffect(() => {
        fetchCustomer();
      }, []);
    return (
        <div>
            <GeneralTable
                datas={data}
                columns={columns}
                placeholderSearch="Nhập tên người dùng"
                onSearchChange={handleSearchChange}
            >
            </GeneralTable>
        </div>
    );
};

export default AllCustomer;