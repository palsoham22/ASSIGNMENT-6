const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const routes = {
	'/home': 'home.html',
	'/about': 'about.html',
	'/contact': 'contact.html',
	'/services': 'services.html', // This file does not exist, will cause error if accessed
	'/404': '404.html',
};

function serveFile(res, filePath, statusCode = 200, contentType = 'text/html') {
	fs.readFile(path.join(__dirname, filePath), (err, data) => {
		if (err) {
			res.writeHead(500, { 'Content-Type': 'text/plain' });
			res.end('500 Internal Server Error');
		} else {
			res.writeHead(statusCode, { 'Content-Type': contentType });
			res.end(data);
		}
	});
}

const server = http.createServer((req, res) => {
	const url = req.url === '/' ? '/home' : req.url;
	if (url === '/styles.css') {
		serveFile(res, 'styles.css', 200, 'text/css');
		return;
	}
	if (routes[url]) {
		serveFile(res, routes[url]);
	} else {
		serveFile(res, routes['/404'], 404);
	}
});

server.listen(PORT, () => {
	console.log(`Server running at http://localhost:${PORT}/`);
});