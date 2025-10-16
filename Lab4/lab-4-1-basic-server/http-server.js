const http = require('http');
const url = require('url');
const PORT = 3000;

// TODO: สร้างข้อมูลจำลอง students array
const students = [
    { id: 1, name: 'สมชาย ใจดี', major: 'วิศวกรรมคอมพิวเตอร์', year: 3 },
    { id: 2, name: 'สมหญิง จริงใจ', major: 'วิทยาการคอมพิวเตอร์', year: 2 },
    { id: 3, name: 'สมศักดิ์ รักเรียน', major: 'เทคโนโลยีสารสนเทศ', year: 4 },
    { id: 4, name: 'มานี มีนา', major: 'วิศวกรรมคอมพิวเตอร์', year: 2 },
];

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    const method = req.method;

    // Set CORS headers and Content-Type
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json; charset=utf-8');

    // TODO: จัดการ route GET /
    if (pathname === '/' && method === 'GET') {
        res.writeHead(200);
        res.end(JSON.stringify({
            message: 'Welcome to the Basic HTTP Server!',
            endpoints: [
                'GET /',
                'GET /students',
                'GET /students/:id',
                'GET /students/major/:major'
            ]
        }));
    }
    // TODO: จัดการ route GET /students
    else if (pathname === '/students' && method === 'GET') {
        res.writeHead(200);
        res.end(JSON.stringify(students));
    }
    // TODO: จัดการ route GET /students/:id
    // ใช้ Regex เพื่อจับ /students/[ตัวเลข]
    else if (pathname.match(/^\/students\/(\d+)$/) && method === 'GET') {
        const id = parseInt(pathname.split('/')[2]);
        const student = students.find(s => s.id === id);

        if (student) {
            res.writeHead(200);
            res.end(JSON.stringify(student));
        } else {
            res.writeHead(404);
            res.end(JSON.stringify({ message: `Student with id ${id} not found` }));
        }
    }
    // TODO: จัดการ route GET /students/major/:major
    // ใช้ Regex เพื่อจับ /students/major/[ข้อความ]
    else if (pathname.match(/^\/students\/major\/(.+)$/) && method === 'GET') {
        // decodeURIComponent เพื่อให้รองรับ URL ที่มีภาษาไทย (เช่น %E0%B8%A7%E0%B8%B4%E0%B8%A8%E0%B8%A7...)
        const major = decodeURIComponent(pathname.split('/')[3]);
        const filteredStudents = students.filter(s => s.major.toLowerCase() === major.toLowerCase());

        res.writeHead(200);
        res.end(JSON.stringify(filteredStudents));
    }
    // TODO: จัดการกรณี 404 Not Found
    else {
        res.writeHead(404);
        res.end(JSON.stringify({ message: 'Endpoint not found' }));
    }
});

server.listen(PORT, () => {
    console.log(`🌐 HTTP Server running on http://localhost:${PORT}`);
    console.log('Available endpoints:');
    console.log('  GET /');
    console.log('  GET /students');
    console.log('  GET /students/:id');
    console.log('  GET /students/major/:major');
});