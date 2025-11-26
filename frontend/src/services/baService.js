import api from './api';

const baService = {
    getAll: async () => {
        try {
            const response = await api.get('/report-documents');
            return response.data.data;
        } catch (error) {
            console.error("Error fetching BA data:", error);
            throw error;
        }
    },

    create: async (payload) => {
        try {
            const response = await api.post('/report-documents', payload);
            return response.data;
        } catch (error) {
            console.error("Error creating BA:", error);
            throw error;
        }
    },

    updateStatus: async (id, status) => {
        try {
            const isApproved = status === 'Disetujui';
            const payload = {
                isApproved: isApproved,
                rejectionReason: !isApproved ? 'Ditolak oleh pihak internal.' : undefined
            };
            const response = await api.put(`/report-documents/${id}/approve`, payload);
            return response.data;
        } catch (error) {
            console.error("Error updating status:", error);
            throw error;
        }
    }
};

export default baService;