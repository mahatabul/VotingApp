// Main app logic for index.html

// Update navigation based on auth status
function updateNav() {
    const token = localStorage.getItem('token');
    const userName = localStorage.getItem('userName');
    const navLinks = document.querySelector('.nav-links');
    
    if (token && userName) {
        navLinks.innerHTML = `
            <a href="index.html">Home</a>
            <a href="create.html">Create Poll</a>
            <a href="admin.html">My Polls</a>
            <span>${userName}</span>
            <a href="#" id="logoutBtn">Logout</a>
        `;
        
        document.getElementById('logoutBtn').addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.clear();
            window.location.reload();
        });
    }
}

// Load all polls on index page
async function loadAllPolls() {
    const pollsList = document.getElementById('pollsList');
    if (!pollsList) return;

    try {
        const data = await api.getAllPolls();
        displayPolls(data.polls);
    } catch (err) {
        pollsList.innerHTML = `<p class="error">Failed to load polls: ${err.message}</p>`;
    }
}

function displayPolls(polls) {
    const pollsList = document.getElementById('pollsList');
    
    if (!polls || polls.length === 0) {
        pollsList.innerHTML = '<p>No polls available yet.</p>';
        return;
    }

    const html = polls.map(poll => {
        const totalVotes = poll.options.reduce((sum, opt) => sum + opt.count, 0);
        const statusClass = poll.isActive ? 'active' : 'closed';
        const statusText = poll.isActive ? '🟢 Active' : '🔴 Closed';
        
        return `
            <div class="poll-card ${statusClass}">
                <h3>${poll.title}</h3>
                ${poll.description ? `<p class="poll-description">${poll.description}</p>` : ''}
                <p class="poll-meta">
                    ${statusText} | 
                    ${totalVotes} votes | 
                    ${poll.options.length} options
                </p>
                <a href="poll.html?id=${poll._id}" class="btn btn-primary">View Poll</a>
            </div>
        `;
    }).join('');

    pollsList.innerHTML = html;
}

// Initialize
if (document.getElementById('pollsList')) {
    updateNav();
    loadAllPolls();
}