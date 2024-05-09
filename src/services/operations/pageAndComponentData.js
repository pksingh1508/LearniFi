
import toast from "react-hot-toast";

import { apiConnector } from '../apiconnector';
import { catalogData } from "../api";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const url = BASE_URL + '/course/getCategoryPageDetails';

export const getCatalogPageData = async (categoryId) => {
    const toastId = toast.loading("Loading...");
    let result = [];
    try {
        console.log(categoryId);
        // const response = await apiConnector("POST", catalogData.CATALOGPAGEDATA_API, categoryId);
        const response = await axios.post(url, {
            categoryId: categoryId
        })

        console.log("getCatalogPageData Response: ", response);
        if (!response?.data?.success) {
            throw new Error("Could not fetch category page data");
        }
        result = response?.data;

    } catch (err) {
        console.log("CATALOG PAGE DATA API ERROR: ", err);
        toast.error(err.message);
        result = err.response?.data;
    }
    toast.dismiss(toastId);
    return result;
}