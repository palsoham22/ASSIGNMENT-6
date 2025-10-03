const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const routes = {
	'/home': 'index.html',
	'/about': 'about.html',
	'/contact': 'contact.html',
	'/services': 'services.html',
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

	
	const requestedPath = url.replace(/^\//, ''); 
	const potential = path.join(__dirname, requestedPath);
	if (fs.existsSync(potential) && fs.lstatSync(potential).isFile()) {
		
		const ext = path.extname(potential).toLowerCase();
		const contentType = ext === '.css' ? 'text/css' : 'text/html';
		serveFile(res, requestedPath, 200, contentType);
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