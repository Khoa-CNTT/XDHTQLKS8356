// import axios from '../axiosConfig'
import axiosDefault from "axios";
export const apiGetPublicProvinces = () =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axiosDefault({
                method: "get",
                url: "https://vapi.vnappmob.com/api/v2/province",
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });
export const apiGetPublicDistrict = (provinceId) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axiosDefault({
                method: "get",
                url: `https://vapi.vnappmob.com/api/v2/province/district/${provinceId}`,
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });
export const apiGetPublicWard = (districtID) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axiosDefault({
                method: "get",
                url: `https://vapi.vnappmob.com/api/v2/province/ward/${districtID}`,
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });
