import axios from "axios"
import authHeader from "../../../src/core/service/AuthHeader"

const API_URL =  'http://localhost:9002/api/';


export const ListAllTrans = () => { return axios.get(API_URL + "transaction/", {headers: authHeader()}); }
export const SaveTransaction = (data) => { return axios.post(API_URL + "transaction/create/", data, {headers: authHeader()}); }
