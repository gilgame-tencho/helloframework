(function () {
    const list = document.getElementById('article-list');
    const count = document.getElementById('article-count');
    const message = document.getElementById('message');
    const filter = document.getElementById('status-filter');

    let currentStatus = 'all';

    filter.addEventListener('click', (event) => {
        const button = event.target.closest('button[data-status]');
        if (!button) {
            return;
        }

        currentStatus = button.dataset.status;
        document.querySelectorAll('.segment').forEach((segment) => {
            segment.classList.toggle('active', segment === button);
        });
        loadArticles();
    });

    async function loadArticles() {
        setMessage('');
        list.innerHTML = '<tr><td colspan="4" class="empty">Loading articles...</td></tr>';
        count.textContent = 'Loading...';

        try {
            const query = currentStatus === 'all' ? '' : `?status=${encodeURIComponent(currentStatus)}`;
            const response = await fetch(`/api/articles${query}`);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to load articles');
            }

            renderArticles(data);
        } catch (error) {
            count.textContent = 'Unable to load';
            list.innerHTML = '<tr><td colspan="4" class="empty">No articles available.</td></tr>';
            setMessage(error.message, true);
        }
    }

    function renderArticles(articles) {
        count.textContent = `${articles.length} article${articles.length === 1 ? '' : 's'}`;

        if (articles.length === 0) {
            list.innerHTML = '<tr><td colspan="4" class="empty">No articles found.</td></tr>';
            return;
        }

        list.innerHTML = articles.map((article) => `
            <tr>
                <td>${escapeHtml(article.id)}</td>
                <td><a class="title-link" href="/articles/${encodeURIComponent(article.id)}">${escapeHtml(article.title)}</a></td>
                <td><span class="status ${escapeHtml(article.status)}">${escapeHtml(article.status)}</span></td>
                <td>${formatDate(article.updatedAt || article.createdAt)}</td>
            </tr>
        `).join('');
    }

    function setMessage(text, isError = false) {
        message.hidden = !text;
        message.textContent = text;
        message.classList.toggle('error', isError);
    }

    function formatDate(value) {
        if (!value) {
            return '-';
        }

        return new Intl.DateTimeFormat(undefined, {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        }).format(new Date(value));
    }

    function escapeHtml(value) {
        return String(value ?? '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    loadArticles();
})();
