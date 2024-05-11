import apiClient from './index';

export async function findExistUser(data) {
    return apiClient.post('/auth,findExistUser', data)
    .then((respose) => {
        if (respose && respose.data) {
            return respose.data
        }
        return Promise.reject()
    })
}

export const register = async (data) => {
    return apiClient.post('/auth/register', data)
        .then((respose) => {
            if (respose && respose.data) {
                return respose.data
            }
            return Promise.reject()
        })
}

export async function login(data) {
    return apiClient.post("/auth/login", data)
        .then((response) => {
            if (response && response.data) {
                return response.data;
            }
            return Promise.reject();
        });
}

export async function requestResetPassword(data){
    return apiClient.post('/auth/reset-password',data)
    .then((response)=>{
        if(response && response.data){
            return response.data
        }
        return Promise.reject()
    })
}

export async function updatePassword(data){
    return apiClient.put('/auth/update-password',data)
    .then((response)=>{
        if(response && response.data){
            return response.data
        }
        return Promise.reject()
    })
}

export async function deleteUser(data){
    return apiClient.delete('/auth/deleteUser',data)
    .then((response)=>{
        if(response && response.data){
            return response.data
        }
        return Promise.reject()
    })
}

