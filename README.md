# ASSIGNMENT-6

https://palsohamassignment6.netlify.app/

In this assignment, I created a Node.js server using the built-in http module. The server listens on a specific port and waits for client requests. Based on the request URL, it responds with different HTML pages for routes like /home, /about, and /contact. For each route, the server uses res.writeHead() to set the response and res.end() to send the output. If the user tries to access a route that doesn’t exist, it returns a “404 Page Not Found” message. This demonstrates how Node.js can handle basic routing and serve simple web pages.
