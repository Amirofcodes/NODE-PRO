document.addEventListener('DOMContentLoaded', () => {
    const registerBtn = document.getElementById('registerBtn');
    const loginBtn = document.getElementById('loginBtn');
    const createArticleBtn = document.getElementById('createArticleBtn');
    const viewArticlesBtn = document.getElementById('viewArticlesBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const content = document.getElementById('content');

    let token = localStorage.getItem('token');

    registerBtn.addEventListener('click', showRegisterForm);
    loginBtn.addEventListener('click', showLoginForm);
    createArticleBtn.addEventListener('click', showCreateArticleForm);
    viewArticlesBtn.addEventListener('click', viewArticles);
    logoutBtn.addEventListener('click', logout);

    function showRegisterForm() {
        content.innerHTML = `
            <h2>S'inscrire</h2>
            <form id="registerForm">
                <input type="text" id="username" placeholder="Nom d'utilisateur" required>
                <input type="password" id="password" placeholder="Mot de passe" required>
                <button type="submit">S'inscrire</button>
            </form>
        `;
        document.getElementById('registerForm').addEventListener('submit', register);
    }

    function showLoginForm() {
        content.innerHTML = `
            <h2>Se connecter</h2>
            <form id="loginForm">
                <input type="text" id="username" placeholder="Nom d'utilisateur" required>
                <input type="password" id="password" placeholder="Mot de passe" required>
                <button type="submit">Se connecter</button>
            </form>
        `;
        document.getElementById('loginForm').addEventListener('submit', login);
    }

    function showCreateArticleForm() {
        content.innerHTML = `
            <h2>Créer un article</h2>
            <form id="createArticleForm">
                <input type="text" id="nom" placeholder="Nom de l'article" required>
                <input type="text" id="codeArticle" placeholder="Code article" required>
                <textarea id="description" placeholder="Description"></textarea>
                <input type="text" id="image" placeholder="URL de l'image">
                <input type="number" id="prix" placeholder="Prix" required>
                <input type="number" id="quantite" placeholder="Quantité" required>
                <button type="submit">Créer</button>
            </form>
        `;
        document.getElementById('createArticleForm').addEventListener('submit', createArticle);
    }

    async function register(e) {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
            const data = await response.json();
            if (response.ok) {
                alert('Inscription réussie. Veuillez vous connecter.');
                showLoginForm();
            } else {
                alert(`Erreur: ${data.message}`);
            }
        } catch (error) {
            console.error('Erreur:', error);
        }
    }

    async function login(e) {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
            const data = await response.json();
            if (response.ok) {
                token = data.token;
                localStorage.setItem('token', token);
                showLoggedInState();
            } else {
                alert(`Erreur: ${data.message}`);
            }
        } catch (error) {
            console.error('Erreur:', error);
        }
    }

    async function createArticle(e) {
        e.preventDefault();
        const articleData = {
            nom: document.getElementById('nom').value,
            codeArticle: document.getElementById('codeArticle').value,
            description: document.getElementById('description').value,
            image: document.getElementById('image').value,
            prix: document.getElementById('prix').value,
            quantite: document.getElementById('quantite').value
        };
        try {
            const response = await fetch('/api/articles', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(articleData)
            });
            const data = await response.json();
            if (response.ok) {
                alert('Article créé avec succès');
                viewArticles();
            } else {
                alert(`Erreur: ${data.message}`);
            }
        } catch (error) {
            console.error('Erreur:', error);
        }
    }

    async function viewArticles() {
        try {
            const response = await fetch('/api/articles', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const articles = await response.json();
            content.innerHTML = `
                <h2>Liste des articles</h2>
                <ul>
                    ${articles.map(article => `
                        <li>
                            <h3>${article.nom}</h3>
                            <p>Code: ${article.codeArticle}</p>
                            <p>Prix: ${article.prix}€</p>
                            <p>Quantité: ${article.quantite}</p>
                            <button onclick="viewArticleDetails('${article._id}')">Voir détails</button>
                        </li>
                    `).join('')}
                </ul>
            `;
        } catch (error) {
            console.error('Erreur lors de la récupération des articles:', error);
        }
    }

    function showLoggedInState() {
        registerBtn.style.display = 'none';
        loginBtn.style.display = 'none';
        createArticleBtn.style.display = 'inline';
        viewArticlesBtn.style.display = 'inline';
        logoutBtn.style.display = 'inline';
        content.innerHTML = '<h2>Bienvenue! Vous êtes connecté.</h2>';
    }

    function logout() {
        localStorage.removeItem('token');
        token = null;
        showLoggedOutState();
    }

    function showLoggedOutState() {
        registerBtn.style.display = 'inline';
        loginBtn.style.display = 'inline';
        createArticleBtn.style.display = 'none';
        viewArticlesBtn.style.display = 'none';
        logoutBtn.style.display = 'none';
        content.innerHTML = '<h2>Veuillez vous connecter ou vous inscrire.</h2>';
    }

    // Check login state on page load
    if (token) {
        showLoggedInState();
    } else {
        showLoggedOutState();
    }
});

async function viewArticleDetails(id) {
    try {
        const response = await fetch(`/api/articles/${id}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const article = await response.json();
        document.getElementById('content').innerHTML = `
            <h2>${article.nom}</h2>
            <p>Code: ${article.codeArticle}</p>
            <p>Description: ${article.description}</p>
            <img src="${article.image}" alt="${article.nom}">
            <p>Prix: ${article.prix}€</p>
            <p>Quantité: ${article.quantite}</p>
            <button onclick="viewArticles()">Retour à la liste</button>
        `;
    } catch (error) {
        console.error('Erreur lors de la récupération des détails de l\'article:', error);
    }
}