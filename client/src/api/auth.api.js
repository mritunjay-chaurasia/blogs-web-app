import apiClient from './index';

export async function login(data){
    return apiClient.post("/auth/login",data)
    .then((response)=>{
        if(response){
            return response.data;
        }
        return Promise.reject();
    });
}