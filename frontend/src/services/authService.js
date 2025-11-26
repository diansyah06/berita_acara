import api from './api';

const authService = {
    login: async (identifier, password) => {
        const response = await api.post('/auth/login', { identifier, password });

        if (response.data && response.data.data) {
            const { token, user } = response.data.data;

            const sessionData = {
                token: token,
                id: user.id,
                name: user.fullname,
                email: user.email,
                role: user.role,
                companyName: user.companyName
            };

            localStorage.setItem('user_sess', JSON.stringify(sessionData));
            return sessionData;
        }
        
        throw new Error("Gagal mendapatkan data user dari server");
    },

    register: async (data) => {
        const response = await api.post('/auth/register', data);
        return response.data;
    },

    logout: () => {
        localStorage.removeItem('user_sess');
    }
};

export default authService;