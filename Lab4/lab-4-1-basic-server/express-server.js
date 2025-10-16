const express = require('express');
const app = express();
const PORT = 3001;

// TODO: สร้างข้อมูลจำลอง students array เดียวกับใน http-server.js
const students = [
    { id: 1, name: 'สมชาย ใจดี', major: 'วิศวกรรมคอมพิวเตอร์', year: 3 },
    { id: 2, name: 'สมหญิง จริงใจ', major: 'วิทยาการคอมพิวเตอร์', year: 2 },
    { id: 3, name: 'สมศักดิ์ รักเรียน', major: 'เทคโนโลยีสารสนเทศ', year: 4 },
    { id: 4, name: 'มานี มีนา', major: 'วิศวกรรมคอมพิวเตอร์', year: 2 },
];

// Middleware
app.use(express.json());

// TODO: Route GET /
app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to the Express Server!',
        endpoints: [
            'GET /',
            'GET /students',
            'GET /students/:id',
            'GET /students/major/:major',
            'GET /stats'
        ]
    });
});

// TODO: Route GET /students
app.get('/students', (req, res) => {
    res.json(students);
});

// TODO: Route GET /students/:id
app.get('/students/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const student = students.find(s => s.id === id);
    if (student) {
        res.json(student);
    } else {
        res.status(404).json({ message: `Student with id ${id} not found` });
    }
});

// TODO: Route GET /students/major/:major
app.get('/students/major/:major', (req, res) => {
    const major = req.params.major;
    const filteredStudents = students.filter(s => s.major.toLowerCase() === major.toLowerCase());
    res.json(filteredStudents);
});

// TODO: Route GET /stats
app.get('/stats', (req, res) => {
    const totalStudents = students.length;
    // นับจำนวนนักศึกษาในแต่ละสาขา
    const studentsByMajor = students.reduce((acc, student) => {
        acc[student.major] = (acc[student.major] || 0) + 1;
        return acc;
    }, {});

    res.json({
        totalStudents,
        studentsByMajor
    });
});

// TODO: Middleware จัดการ 404
app.use((req, res, next) => {
    res.status(404).json({ message: 'API endpoint not found' });
});

app.listen(PORT, () => {
    console.log(`🚀 Express Server running on http://localhost:${PORT}`);
    console.log('Available endpoints:');
    console.log('  GET /');
    console.log('  GET /students');
    console.log('  GET /students/:id');
    console.log('  GET /students/major/:major');
    console.log('  GET /stats');
});