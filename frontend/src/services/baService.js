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

    // --- FITUR REVISI (BARU) ---
    resubmit: async (id, payload) => {
        try {
            // Payload diharapkan berisi: { contractNumber, paymentNominal, description }
            const response = await api.patch(`/report-documents/${id}/resubmit`, payload);
            return response.data;
        } catch (error) {
            console.error("Error resubmitting BA:", error);
            throw error;
        }
    },
    // ---------------------------

    approve: async (id, status) => {
        try {
            const payload = {
                status: status === 'Disetujui' ? 'approved' : 'rejected',
                notes: status === 'Disetujui' ? 'Dokumen disetujui.' : 'Ditolak, mohon revisi.'
            };
            const response = await api.patch(`/report-documents/${id}/approve`, payload);
            return response.data;
        } catch (error) {
            console.error("Error approving:", error);
            throw error;
        }
    },

    verify: async (id, status, notes, files) => {
        try {
            const formData = new FormData();

            formData.append('checkStatus', status === 'Disetujui' ? 'approved' : 'rejected');
            formData.append('notes', notes);

            if (files && files.length > 0) {
                Array.from(files).forEach((file) => {
                    formData.append('images', file);
                });
            }

            const response = await api.patch(`/report-documents/${id}/verify`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            return response.data;
        } catch (error) {
            console.error("Error verifying:", error);
            throw error;
        }
    },

    delete: async (id) => {
        try {
            const response = await api.delete(`/report-documents/${id}`);
            return response.data;
        } catch (error) {
            console.error("Error deleting BA:", error);
            throw error;
        }
    }
};

export default baService;