const API_BASE = '/api/v1';

const api = {
    // Helper function for API calls
    async request(endpoint, options = {}) {
        const token = localStorage.getItem('token');
        const headers = {
            'Content-Type': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` })
        };

        const response = await fetch(`${API_BASE}${endpoint}`, {
            ...options,
            headers: { ...headers, ...options.headers }
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.msg || data.message || 'Request failed');
        }

        return data;
    },

    // Auth endpoints
    async register(name, email, password) {
        return this.request('/auth/register', {
            method: 'POST',
            body: JSON.stringify({ name, email, password })
        });
    },

    async login(email, password) {
        return this.request('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password })
        });
    },

    // Poll endpoints
    async getAllPolls() {
        return this.request('/polls');
    },

    async getPoll(id) {
        const data = await this.request(`/polls/${id}`);
        return data.poll;
    },

    async createPoll(title, description, options) {
        return this.request('/polls/create', {
            method: 'POST',
            body: JSON.stringify({ title, description, options })
        });
    },

    async voteOnPoll(pollId, optionIDX) {
        return this.request(`/polls/${pollId}/vote`, {
            method: 'POST',
            body: JSON.stringify({ optionIDX })
        });
    },

    // User's polls
    async getMyPolls() {
        return this.request('/auth/getPolls');
    },

    async closePoll(pollId) {
        return this.request(`/auth/getPolls/${pollId}/closePoll`, {
            method: 'PATCH'
        });
    }
};