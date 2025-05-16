import React, { useEffect, useState, useRef } from "react";
import { RiCloseLine } from "react-icons/ri";
import Select from "./Select";
import InputReadOnly from "./InputReadOnly";
import { apiGetPublicProvinces, apiGetPublicDistrict,apiGetPublicWard,} from "../../service/addressServices";
import Loading from "../Loading";

const Address = ({ onFieldChange, titleModal,functionButton, handleClose, handleButton,initialAddress }) => {
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [province, setProvince] = useState("");
    const [district, setDistrict] = useState("");
    const [ward, setWard] = useState("");
    const [numberAddress, setNumberAddress] = useState("");
    const [reset, setReset] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        if (initialAddress) {
          initializeAddressFromString(initialAddress);
        }
      }, [initialAddress]);
    useEffect(() => {
        const fetchPublicProvince = async () => {
            const response = await apiGetPublicProvinces();
            console.log("tỉnh", response?.data)
            if (response.status === 200) {setProvinces(response?.data)}
        };
        fetchPublicProvince();
    }, []);
    useEffect(() => {
        setDistrict("");
        const fetchPublicDistrict = async () => {
            const response = await apiGetPublicDistrict(province);
            if (response.status === 200) {setDistricts(response.data.districts)}
        };
        province && fetchPublicDistrict();
        !province ? setReset(true) : setReset(false);
        !province && setDistricts([]);
    }, [province]);
    useEffect(() => {
        setWard("");
        const fetchPublicWard = async () => {
            const response = await apiGetPublicWard(district);
            if (response.status === 200) {setWards(response.data.wards)}
        };
        district && fetchPublicWard();
        !district ? setReset(true) : setReset(false);
        !district && setWards([]);
    }, [district]);
    const fullAddress = `${numberAddress ? `${numberAddress}, ` : ""}${ ward ? `${wards?.find((item) => item.code == ward)?.name}, ` : ""}${district ? `${districts?.find((item) => item.code == district)?.name}, ` : ""}${province ? provinces?.find((item) => item.code == province)?.name : ""}`;
      useEffect(() => {
        onFieldChange("address", fullAddress);
        onFieldChange("city", province ? provinces.find((item) => item.code === province)?.name : "");
      }, [fullAddress]);
      const initializeAddressFromString = async (address) => {
        if (!address) return;
        setIsLoading(true); 
        const parts = address.split(",").map((p) => p.trim());
        const number = parts[0] || "";
        const wardName = parts[1] || "";
        const districtName = parts[2] || "";
        const provinceName = parts[3] || "";
        setNumberAddress(number)
        let provinceList = provinces;
        if (!provinceList || provinceList.length === 0) {
            const res = await apiGetPublicProvinces();
            if (res.status === 200) {
                provinceList = res.data;
                setProvinces(provinceList);
            } else {
                console.error("Failed to fetch provinces");
                return;
            }
        }
        const foundProvince = provinceList.find((p) => p.name === provinceName);
        if (!foundProvince) return;
        setProvince(foundProvince.code);
    
        const districtRes = await apiGetPublicDistrict(foundProvince.code);
        if (districtRes.status !== 200) return;
        const districtList = districtRes.data.districts || [];
       
        const foundDistrict = districtList.find((d) => d.name === districtName);
        if (!foundDistrict) return;
        setDistrict(foundDistrict.code);

        const wardRes = await apiGetPublicWard(foundDistrict.code);
        if (wardRes.status !== 200) return;
        const wardList = wardRes.data.wards || [];
    
        const foundWard = wardList.find((w) => w.name === wardName);
        if (!foundWard) return;
        setWard(foundWard.code);
        setIsLoading(false); 
    }; 
    const renderBody = () => (
        <>
            {isLoading ? (<Loading />) : (
                <> <div className="flex items-center justify-between">
                <Select
                    type="province"
                    value={province}
                    setValue={setProvince}
                    options={provinces}
                    label="Tỉnh/Thành phố"
                />
                <Select
                    reset={reset}
                    type="district"
                    value={district}
                    setValue={setDistrict}
                    options={districts}
                    label="Quận/Huyện"
                />
                <Select
                    reset={reset}
                    type="ward"
                    value={ward}
                    setValue={setWard}
                    options={wards}
                    label="Phường/Xã"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 mt-4" htmlFor="address">
                    Tên đường, số nhà
                </label>
                <input
                    type="text"
                    name="address"
                    id="address"
                    value={numberAddress}
                    placeholder="Tên đường, số nhà"
                    className="w-full rounded-md border border-gray-300 p-2 outline-none bg-white mb-4"
                    onChange={(e) => setNumberAddress(e.target.value)}
                />
            </div>
            <InputReadOnly
                label="Địa chỉ cụ thể"
                value={`${numberAddress ? `${numberAddress}, ` : ""}${ ward ? `${wards?.find((item) => item.code == ward)?.name},` : ""} ${district? `${districts?.find((item) => item.code == district)?.name},`: ""} ${province ? provinces?.find((item) => item.code == province)?.name : ""}`}
            /></>
            )}     
        </>
    );
    return (
        <>
            <div className="w-full">
                {titleModal ? (
                    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
                    <div className="relative mx-auto my-6 w-auto">
                        <div className="relative flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none">
                            <button
                                className="cursor-pointer background-transparent absolute right-3 top-3 text-sm font-bold uppercase text-red-500 outline-none transition-all duration-150 ease-linear focus:outline-none"
                                type="button"
                                onClick={() => handleClose()}
                            >
                                <RiCloseLine className="h-10 w-10 text-gray-300" />
                            </button>
                            <div className="border-gray-200 flex items-start justify-between rounded-t border-b border-solid p-5">
                                <h3 className="text-3xl font-semibold">{titleModal}</h3>
                            </div>
                            {/*body*/}
                                <div className="flex flex-col gap-2.5 p-5">
                                    <div className="flex items-center gap-4">
                                        <Select
                                            type="province"
                                            value={province}
                                            setValue={setProvince}
                                            options={provinces}
                                            label="Tỉnh/Thành phố"
                                        />
                                        <Select
                                            reset={reset}
                                            type="district"
                                            value={district}
                                            setValue={setDistrict}
                                            options={districts}
                                            label="Quận/Huyện"
                                        />
                                        <Select
                                            reset={reset}
                                            type="ward"
                                            value={ward}
                                            setValue={setWard}
                                            options={wards}
                                            label="Phường/Xã"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="address">
                                            Tên đường, số nhà
                                        </label>
                                        <input
                                            type="text"
                                            name="address"
                                            id="address"
                                            value={numberAddress}
                                            placeholder="Tên đường, số nhà"
                                            className="w-full rounded-md border border-gray-300 p-2 outline-none bg-white"
                                            onChange={(e) => setNumberAddress(e.target.value)}
                                        />
                                    </div>
                                    <InputReadOnly
                                        label="Địa chỉ cụ thể"
                                        value={`${numberAddress ? `${numberAddress}, ` : ""}${
                                            ward ? `${wards?.find((item) => item.code == ward)?.name},`: ""
                                        } ${district ? `${districts?.find((item) =>item.code == district)?.name
                                                },`
                                                : ""
                                        } ${
                                            province
                                                ? provinces?.find(
                                                    (item) => item.code == province
                                                )?.name
                                                : ""
                                        }`}
                                    />
                                </div>
                            {functionButton &&  (<div className="border-gray-200 flex items-center justify-end rounded-b border-t border-solid p-6">
                                <button
                                    className="mb-1 mr-1 rounded bg-blue-500 px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-emerald-600"
                                    type="button"
                                    onClick={handleButton}
                                >
                                    {functionButton}
                                </button>
                            </div>)
                            }
                        </div>
                    </div>
                </div>
                ) : (<div className="p-5">{renderBody()}</div>)
                }
                {titleModal && <div className="fixed inset-0 z-40 bg-black opacity-25"></div>}
            </div>
        </>
    );
};

export default Address;

