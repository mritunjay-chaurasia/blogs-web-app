import apiClient from './index';

export const findExistUser = async (data) => {
    try {
        const response = await apiClient.post('/auth/findExistUser', data);
        if (response && response.data) {
            return response.data;
        }
        return Promise.reject();
    } catch (error) {
        if (error.response && error.response.status) {
            return { success: false, message: error.response.data.message };
        } else {
            return { success: false, message: "Something went wrong. Please try again later." };
        }
    }
};


export const register = async (data) => {
    try {
        const response = await apiClient.post('/auth/register', data)
        if (response && response.data) {
            return response.data;
        }
        return Promise.reject()

    }
    catch (error) {
        console.error("Error during register", error);
        if (error.response && error.response.status) {
            return { success: false, message: error.response.data.message };
        } else {
            return { success: false, message: "Something went wrong. Please try again later." };
        }
    }
}

export async function login(data) {
    try {
        const response = await apiClient.post("/auth/login", data);
        if (response && response.data) {
            return response.data;
        }
        return Promise.reject();
    }
    catch (error) {
        console.log("Error during login", error.response.data.message)
        if (error.response && error.response.status) {
            return { success: false, message: error.response.data.message };
        } else {
            return { success: false, message: "Something went wrong. Please try again later." };
        }
    }
}

export async function requestResetPassword(data) {
    return apiClient.post('/auth/reset-password', data)
        .then((response) => {
            if (response && response.data) {
                return response.data
            }
            return Promise.reject()
        })
}

export async function updatePassword(data) {
    return apiClient.put('/auth/update-password', data)
        .then((response) => {
            if (response && response.data) {
                return response.data
            }
            return Promise.reject()
        })
}

export async function deleteUser(data) {
    return apiClient.delete('/auth/deleteUser', data)
        .then((response) => {
            if (response && response.data) {
                return response.data
            }
            return Promise.reject()
        })
}

