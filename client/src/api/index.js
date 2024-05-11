import axios from 'axios';
import {SERVER_URL} from "../constants"

const apiClient = axios.create({
    baseURL : `${SERVER_URL}/api`,
    headers: {
        "Content-type": "application/json"
      }
    
})

export default apiClient
