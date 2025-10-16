import React from 'react';
import ProfileCard from './ProfileCard';

function App() {
    // ข้อมูลโปรไฟล์ตัวอย่าง
    const sampleProfile = {
        name: "Thanakon Padungsin",
        studentId: "67543210030-2",
        major: "วิศวกรรมซอฟต์แวร์",
        year: 3,
        age: 21,
        gpa: 3.75,
        email: "thanakon_pa67@live.rmutl.ac.th",
        hobbies: [
            "เขียนโค้ด",
            "เล่นเกม",
            "ดูหนัง",
            "ฟังเพลง",
            "วาดรูป"
        ],
        skills: [
            "JavaScript",
            "React.js",
            "HTML/CSS",
            "Python",
            "Git",
            "Node.js"
        ],
        // TODO: นักศึกษาจะเพิ่ม fields เพิ่มเติมใน Challenge
    socialLinks: [
        { platform: "GitHub", url: "https://github.com/thanakon17" },
        { platform: "Facebook", url: "https://www.facebook.com/f.frank.kub/" },
        { platform: "Instagram", url: "https://www.instagram.com/frankkub0/" },
        // เพิ่มเติมตามต้องการ
    ],
    };

    return (
        <div style={{ 
            minHeight: '100vh', 
            background: 'linear-gradient(45deg, #f0f2f5 0%, #e8eaf6 100%)',
            padding: '20px'
        }}>
            <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                <h1 style={{ 
                    color: '#333', 
                    fontSize: '32px',
                    margin: '20px 0'
                }}>
                    🎓 Personal Profile Card
                </h1>
                <p style={{ color: '#666', fontSize: '16px' }}>
                    Lab 3.1 - ทำความรู้จักกับ React.js และ JSX
                </p>
            </div>
            
            <ProfileCard profile={sampleProfile} />
        </div>
    );
}

export default App;