const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// In-memory storage
let articles = [];

// Load articles from file if it exists
if (fs.existsSync('articles.json')) {
    articles = JSON.parse(fs.readFileSync('articles.json', 'utf-8'));
}

// Utility: Save articles to file
const saveToFile = () => {
    fs.writeFileSync('articles.json', JSON.stringify(articles, null, 2));
};

// POST /articles: Add a new article
app.post('/articles', (req, res) => {
    const { title, content, tags } = req.body;

    if (!title || !content) {
        return res.status(400).json({ error: 'Title and content are required.' });
    }

    const newArticle = {
        id: articles.length + 1,
        title,
        content,
        tags: tags || [],
        date: new Date(),
    };

    articles.push(newArticle);
    saveToFile();
    res.status(201).json(newArticle);
});

// GET /articles/search: Search articles
app.get('/articles/search', (req, res) => {
    const { keyword, tag, sort } = req.query;

    let filteredArticles = articles;

    // Filter by keyword in title or content
    if (keyword) {
        filteredArticles = filteredArticles.filter(article =>
            article.title.includes(keyword) || article.content.includes(keyword)
        );
    }

    // Filter by tag
    if (tag) {
        filteredArticles = filteredArticles.filter(article => article.tags.includes(tag));
    }

    // Sort results
    if (sort === 'relevance') {
        filteredArticles.sort((a, b) => {
            const freqA = (a.content.match(new RegExp(keyword, 'gi')) || []).length;
            const freqB = (b.content.match(new RegExp(keyword, 'gi')) || []).length;
            return freqB - freqA; // Descending order of frequency
        });
    } else if (sort === 'date') {
        filteredArticles.sort((a, b) => new Date(b.date) - new Date(a.date)); // Descending by date
    }

    res.json(filteredArticles);
});

// GET /articles/:id: Retrieve full article details by ID
app.get('/articles/:id', (req, res) => {
    const { id } = req.params;
    const article = articles.find(article => article.id === parseInt(id));

    if (!article) {
        return res.status(404).json({ error: 'Article not found.' });
    }

    res.json(article);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
