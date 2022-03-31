const http = require('http');
const fs = require('fs')

// data - JSON точек
function saveToFile(data) {
    fs.writeFile("output.txt", data, (err) => {
        console.error(err)
    })
}

let app = http.createServer((req, res) => {
        const headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
            'Access-Control-Max-Age': 2592000, // 30 дней

        };
    
        if (req.method === 'OPTIONS') {
            res.writeHead(204, headers);
            res.end();
            return;
        }
    
        if (['GET', 'POST'].indexOf(req.method) > -1) {
            res.writeHead(200, headers);
            let data = ''
            req.on('data', chunk => {
                data += chunk
            })
            req.on('end', () => {
                saveToFile(data)
            })
            res.end('Hello World');
            return;
        }
        
        res.writeHead(405, headers);
    
});


app.listen(3080, '127.0.0.1');
console.log('server running'); 
