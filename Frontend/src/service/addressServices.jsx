import axios from 'axios';

export const apiGetPublicProvinces = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        method: "get",
        url: "https://provinces.open-api.vn/api/p/",
      });
      resolve(response); 
    } catch (error) {
      reject(error); 
    }
  });
export const apiGetPublicDistrict = (provinceID) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axios({
                method: "get",
                url: `https://provinces.open-api.vn/api/p/${provinceID}?depth=2`,
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });
export const apiGetPublicWard = (districtID) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axios({
                method: "get",
                url: `https://provinces.open-api.vn/api/d/${districtID}?depth=2`,
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });
