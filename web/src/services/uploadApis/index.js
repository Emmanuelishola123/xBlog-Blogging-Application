import axios from "axios";
import api, { uploadApi } from "../api";

export const convert2Base64 = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      resolve(fileReader.result);
    };

    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};

/**
 * Upload file to cloud 
 * 
 * @param {*} file 
 * @returns 
 */
export const uploadSingleFile = async (file) => {
  const {data} = await uploadApi().post("/upload", file);
  return data;
};

export const uploadMultipleFiles = async (files) => {
  const url = await uploadApi().post("/upload/multiple", { files });
  return url;
};
