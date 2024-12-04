Mini Search Engine
A simple backend application that mimics the behavior of a search engine, allowing users to upload and search for articles efficiently using keyword searches and relevance-based sorting.

Features
Add Articles: Users can add articles with a title, content, and tags.
Search Articles: Perform keyword-based searches on titles and content.
Sort Results: Sort search results by relevance or date.
Retrieve Articles by ID: Fetch the full details of a specific article using its unique ID.
Endpoints
1. Add Article (POST /articles)
Description: Adds a new article with metadata.
Request Body:
json
Copy code
{
    "title": "Article Title",
    "content": "This is the content of the article.",
    "tags": ["tag1", "tag2"]
}
2. Search Articles (GET /articles/search)
Description: Searches articles by keywords in the title or content.
Query Parameters:
keyword (required): The term to search for.
tag (optional): Filter articles by a specific tag.
sort (optional): Sort by "relevance" or "date".
3. Get Article (GET /articles/:id)
Description: Retrieves full article details by ID.
Technologies Used
Backend: Node.js
Framework: Express.js
Language: JavaScript
Database: In-memory storage (can be extended for persistent storage)
Getting Started
1. Prerequisites
Install Node.js.
Install dependencies:
bash
Copy code
npm install
2. Running the Server
Start the server:
bash
Copy code
node index.js
The server runs at http://localhost:3000.
Example Usage
Add Article
Request:
bash
Copy code
POST /articles
Body:
json
Copy code
{
    "title": "Introduction to Node.js",
    "content": "Node.js is a JavaScript runtime...",
    "tags": ["nodejs", "javascript"]
}
Search Articles
Request:
bash
Copy code
GET /articles/search?keyword=Node.js&sort=relevance
Get Article by ID
Request:
bash
Copy code
GET /articles/1
Future Enhancements
Add a database for persistent article storage.
Implement advanced search features like fuzzy matching.
Add authentication for user-specific article management.
Contributing
Contributions are welcome! Please fork the repository and submit a pull request.

License
This project is licensed under the MIT License.

