(function () {
    const form = document.getElementById('article-form');
    const message = document.getElementById('message');
    const title = document.getElementById('title');
    const content = document.getElementById('content');
    const author = document.getElementById('author');
    const status = document.getElementById('status');
    const pageTitle = document.getElementById('page-title');
    const saveButton = document.getElementById('save-button');
    const publishButton = document.getElementById('publish-button');
    const archiveButton = document.getElementById('archive-button');
    const deleteButton = document.getElementById('delete-button');
    const meta = document.getElementById('meta');
    const metaId = document.getElementById('meta-id');
    const metaPublished = document.getElementById('meta-published');
    const metaUpdated = document.getElementById('meta-updated');

    const articleId = getArticleId();
    const isNew = articleId === null;
    let currentArticle = null;

    form.addEventListener('submit', saveArticle);
    publishButton.addEventListener('click', () => runAction('publish'));
    archiveButton.addEventListener('click', () => runAction('archive'));
    deleteButton.addEventListener('click', deleteArticle);

    if (isNew) {
        pageTitle.textContent = 'New article';
        setExistingControls(false);
    } else {
        pageTitle.textContent = 'Edit article';
        setExistingControls(true);
        loadArticle();
    }

    async function loadArticle() {
        setBusy(true);
        setMessage('');

        try {
            const response = await fetch(`/api/articles/${encodeURIComponent(articleId)}`);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to load article');
            }

            currentArticle = data;
            fillForm(data);
        } catch (error) {
            setMessage(error.message, true);
        } finally {
            setBusy(false);
        }
    }

    async function saveArticle(event) {
        event.preventDefault();
        setBusy(true);
        setMessage('');

        try {
            const payload = {
                title: title.value.trim(),
                body: content.value.trim(),
                author: author.value.trim() || null
            };

            if (!isNew) {
                payload.status = status.value;
            }

            const response = await fetch(isNew ? '/api/articles' : `/api/articles/${encodeURIComponent(articleId)}`, {
                method: isNew ? 'POST' : 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });
            const data = response.status === 204 ? null : await response.json();

            if (!response.ok) {
                throw new Error((data && data.error) || 'Failed to save article');
            }

            if (isNew) {
                window.location.href = `/articles/${data.id}`;
                return;
            }

            currentArticle = data;
            fillForm(data);
            setMessage('Saved.');
        } catch (error) {
            setMessage(error.message, true);
        } finally {
            setBusy(false);
        }
    }

    async function runAction(action) {
        setBusy(true);
        setMessage('');

        try {
            const response = await fetch(`/api/articles/${encodeURIComponent(articleId)}/${action}`, {
                method: 'PATCH'
            });
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || `Failed to ${action} article`);
            }

            currentArticle = data;
            fillForm(data);
            setMessage(action === 'publish' ? 'Published.' : 'Archived.');
        } catch (error) {
            setMessage(error.message, true);
        } finally {
            setBusy(false);
        }
    }

    async function deleteArticle() {
        if (!window.confirm('Delete this article?')) {
            return;
        }

        setBusy(true);
        setMessage('');

        try {
            const response = await fetch(`/api/articles/${encodeURIComponent(articleId)}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Failed to delete article');
            }

            window.location.href = '/articles';
        } catch (error) {
            setMessage(error.message, true);
            setBusy(false);
        }
    }

    function fillForm(article) {
        title.value = article.title || '';
        content.value = article.body || '';
        author.value = article.author || '';
        status.value = article.status || 'draft';
        meta.hidden = false;
        metaId.textContent = article.id;
        metaPublished.textContent = formatDate(article.publishedAt);
        metaUpdated.textContent = formatDate(article.updatedAt);

        const archived = article.status === 'archived';
        title.disabled = archived;
        content.disabled = archived;
        author.disabled = archived;
        status.disabled = archived;
        saveButton.disabled = archived;
        publishButton.disabled = archived;
        archiveButton.disabled = archived;
    }

    function setExistingControls(enabled) {
        publishButton.hidden = !enabled;
        archiveButton.hidden = !enabled;
        deleteButton.hidden = !enabled;
        meta.hidden = !enabled;
    }

    function setBusy(isBusy) {
        saveButton.disabled = isBusy || (currentArticle && currentArticle.status === 'archived');
        publishButton.disabled = isBusy || (currentArticle && currentArticle.status === 'archived');
        archiveButton.disabled = isBusy || (currentArticle && currentArticle.status === 'archived');
        deleteButton.disabled = isBusy;
    }

    function setMessage(text, isError = false) {
        message.hidden = !text;
        message.textContent = text;
        message.classList.toggle('error', isError);
    }

    function getArticleId() {
        const match = window.location.pathname.match(/^\/articles\/(\d+)$/);
        return match ? Number(match[1]) : null;
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
})();
