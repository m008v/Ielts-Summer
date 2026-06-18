import { useState, useEffect } from 'react';
import { Calendar, Target, BookOpen, CheckCircle, X, Edit3, Sun, Moon } from 'lucide-react';

function PracticeTest({ test }) {
  const storageKey = `ielts_summer_answers_${test.id}`;
  const savedAnswers = JSON.parse(localStorage.getItem(storageKey)) || {};
  
  const [answers, setAnswers] = useState(savedAnswers);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(answers));
  }, [answers, storageKey]);

  const handleChange = (qId, val) => {
    setAnswers(prev => ({ ...prev, [qId]: val }));
  };

  const evaluateAnswer = (userAns, correctAns) => {
    const u = (userAns || '').trim().toLowerCase();
    const c = (correctAns || '').trim().toLowerCase();
    if (u === c) return true;
    if (c.includes('/') && c.split('/').some(opt => opt.trim() === u)) return true;
    if (u.length > 3 && c.includes(u)) return true;
    return false;
  };

  const handleSubmit = () => {
    let s = 0;
    test.questions.forEach(q => {
      if (evaluateAnswer(answers[q.id], q.answer)) {
        s++;
      }
    });
    setScore(s);
    setSubmitted(true);
  };

  return (
    <div style={{ animation: 'fadeIn 0.5s ease' }}>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '0 0 1.5rem 0'}}>
        <h2 style={{ fontSize: '1.8rem' }}><Edit3 style={{display: 'inline', marginRight: '10px'}}/> {test.title}</h2>
        {submitted && <span className="badge" style={{fontSize: '1.1rem'}}>Điểm: {score}/{test.questions.length}</span>}
      </div>
      <div className="quiz-container">
        <div className="quiz-passage">
          {test.content.map((p, idx) => (
            <p key={idx}>{p}</p>
          ))}
        </div>
        <div className="quiz-questions">
          {test.questions.map(q => {
            const isCorrect = evaluateAnswer(answers[q.id], q.answer);

            return (
              <div key={q.id} className="question-item">
                <label>{q.text}</label>
                {q.type === 'tfng' ? (
                  <select 
                    value={answers[q.id] || ''} 
                    onChange={e => handleChange(q.id, e.target.value)}
                    disabled={submitted}
                  >
                    <option value="">-- Chọn đáp án --</option>
                    <option value="True">True / Yes</option>
                    <option value="False">False / No</option>
                    <option value="Not Given">Not Given</option>
                  </select>
                ) : (
                  <input 
                    type="text" 
                    value={answers[q.id] || ''} 
                    onChange={e => handleChange(q.id, e.target.value)}
                    disabled={submitted}
                    placeholder="Nhập câu trả lời..."
                  />
                )}
                {submitted && (
                  <span className={isCorrect ? 'result-correct' : 'result-incorrect'}>
                    {isCorrect ? '✓ Chính xác!' : `✗ Sai. Đáp án đúng: ${q.answer}`}
                  </span>
                )}
              </div>
            );
          })}
          
          <div style={{ marginTop: '2rem' }}>
            {!submitted ? (
              <button className="btn-primary" style={{ width: '100%' }} onClick={handleSubmit}>Nộp bài ngay</button>
            ) : (
              <button className="btn-secondary" style={{ width: '100%' }} onClick={() => setSubmitted(false)}>Làm lại từ đầu</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('60days');
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [selectedPracticeId, setSelectedPracticeId] = useState(null);
  
  // Theme state
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark');
      document.body.classList.remove('light');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.add('light');
      document.body.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  useEffect(() => {
    fetch('http://localhost:8000/api.php')
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching data:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="loading">Đang tải dữ liệu học tập...</div>;
  }

  if (!data) {
    return <div className="loading" style={{color: '#ef4444'}}>Lỗi kết nối máy chủ! Hãy đảm bảo PHP server đang chạy.</div>;
  }

  return (
    <div className="app-layout">
      {/* Sidebar Navigation */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="brand">
            <h1>IELTS Summer</h1>
            <p>Premium Dashboard</p>
          </div>
          <button className="theme-toggle-btn" onClick={() => setIsDarkMode(!isDarkMode)} title="Chuyển đổi Sáng/Tối">
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>

        <nav className="nav-links">
          <button 
            className={`nav-btn ${activeTab === '60days' ? 'active' : ''}`}
            onClick={() => setActiveTab('60days')}
          >
            <Calendar size={20} />
            <span>Thử thách 60 Ngày</span>
          </button>
          
          <button 
            className={`nav-btn ${activeTab === 'routeA' ? 'active' : ''}`}
            onClick={() => setActiveTab('routeA')}
          >
            <BookOpen size={20} />
            <span>Lộ trình A</span>
          </button>
          
          <button 
            className={`nav-btn ${activeTab === 'routeB' ? 'active' : ''}`}
            onClick={() => setActiveTab('routeB')}
          >
            <Target size={20} />
            <span>Lộ trình B</span>
          </button>
          
          <button 
            className={`nav-btn ${activeTab === 'practice' ? 'active' : ''}`}
            onClick={() => setActiveTab('practice')}
          >
            <Edit3 size={20} />
            <span>Luyện tập</span>
          </button>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="main-content">
        {activeTab === '60days' && (
          <div>
            <div className="page-header">
              <h2>Kế hoạch 60 ngày thử thách</h2>
              <p>Cam kết luyện tập liên tục trong 60 ngày để hình thành thói quen học tiếng Anh chủ động.</p>
            </div>
            <div className="grid">
              {data.challenge_60_days.map((item) => (
                <div key={item.day} className="card">
                  <div className="card-header">
                    <span className="badge">Ngày {item.day}</span>
                  </div>
                  <div className="card-body">
                    <h3 className="card-title">{item.topic}</h3>
                    <div className="task-box">
                      <p style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <CheckCircle size={16} color="var(--primary)" /> 
                        {item.task}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'routeA' && (
          <div>
            <div className="page-header">
              <h2>Lộ trình A: Foundation to 6.0+</h2>
              <p>Dành cho người mất gốc, lâu chưa học hoặc đang kẹt ở 3.0 - 5.0. Mục tiêu: Tạo bộ xương tiếng Anh.</p>
            </div>
            <div className="grid">
              {data.route_a.map((item) => (
                <div key={item.week} className="card clickable-card" onClick={() => setSelectedLesson(item)}>
                  <div className="card-header">
                    <span className="badge">Tuần {item.week}</span>
                  </div>
                  <div className="card-body">
                    <h3 className="card-title">{item.topic}</h3>
                    <p style={{marginBottom: '1rem', fontWeight: 500, color: 'var(--primary)'}}>Mục tiêu: {item.focus}</p>
                    <div className="task-box">
                      <p>Xem chi tiết bài học →</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'routeB' && (
          <div>
            <div className="page-header">
              <h2>Lộ trình B: Trần band 6+</h2>
              <p>Dành cho người có nền tảng tốt nhưng bị kẹt điểm. Mục tiêu: Kiểm soát lỗi và tăng độ sâu lập luận.</p>
            </div>
            <div className="grid">
              {data.route_b.map((item) => (
                <div key={item.week} className="card clickable-card" onClick={() => setSelectedLesson(item)}>
                  <div className="card-header">
                    <span className="badge">Tuần {item.week}</span>
                  </div>
                  <div className="card-body">
                    <h3 className="card-title">{item.topic}</h3>
                    <p style={{marginBottom: '1rem', fontWeight: 500, color: 'var(--primary)'}}>Mục tiêu: {item.focus}</p>
                    <div className="task-box">
                      <p>Xem chi tiết bài học →</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'practice' && data.practice_tests && data.practice_tests.length > 0 && (
          <div style={{ animation: 'fadeIn 0.5s ease' }}>
            {!selectedPracticeId ? (
              <div>
                <div className="page-header">
                  <h2>Danh sách Bài Luyện tập</h2>
                  <p>Chọn một bài đọc, bấm giờ và nộp bài để tự động chấm điểm.</p>
                </div>
                <div className="grid">
                  {data.practice_tests.map(test => (
                    <div key={test.id} className="card clickable-card" onClick={() => setSelectedPracticeId(test.id)}>
                      <div className="card-body">
                        <h3 className="card-title">{test.title}</h3>
                        <p style={{marginBottom: '1rem', color: 'var(--text-muted)'}}>Số lượng: {test.questions.length} câu hỏi</p>
                        <div className="task-box">
                          <p style={{ color: 'var(--primary)', fontWeight: 600 }}>Bắt đầu làm bài →</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div>
                <button 
                  className="btn-secondary" 
                  style={{marginBottom: '2rem'}} 
                  onClick={() => setSelectedPracticeId(null)}
                >
                  ← Quay lại danh sách
                </button>
                <PracticeTest test={data.practice_tests.find(t => t.id === selectedPracticeId)} />
              </div>
            )}
          </div>
        )}
      </main>

      {/* Modal Popup (Glassmorphism) */}
      {selectedLesson && (
        <div className="modal-overlay" onClick={() => setSelectedLesson(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedLesson(null)}>
              <X size={24} />
            </button>
            <div style={{marginBottom: '2rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1.5rem'}}>
              <span className="badge" style={{marginBottom: '1rem'}}>Tuần {selectedLesson.week}</span>
              <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{selectedLesson.topic}</h2>
              <p style={{fontWeight: 500, color: 'var(--primary)', fontSize: '1.1rem'}}>Mục tiêu: {selectedLesson.focus}</p>
            </div>
            
            {selectedLesson.checkpoint && (
              <div style={{background: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.3)', padding: '1.5rem', borderRadius: '16px', marginBottom: '2rem'}}>
                <strong style={{color: '#d97706', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '8px'}}>
                  <Target size={20} /> Mốc kiểm tra:
                </strong>
                <p style={{color: '#b45309', margin: 0, marginTop: '0.5rem', fontSize: '1rem', lineHeight: '1.5'}}>{selectedLesson.checkpoint}</p>
              </div>
            )}

            <h3 style={{ marginBottom: '1.5rem', fontSize: '1.4rem' }}>Nội dung bài học chi tiết</h3>
            
            {selectedLesson.daily_plan && selectedLesson.daily_plan.length > 0 ? (
              <div className="lesson-list">
                {selectedLesson.daily_plan.map(dp => (
                  <div key={dp.day} className="lesson-item">
                    <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.5rem', color: 'var(--text-main)' }}>
                      <Calendar size={18} color="var(--primary)" /> Ngày {dp.day}: {dp.task}
                    </h4>
                    <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>{dp.detail}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{marginTop: '1rem', fontStyle: 'italic', color: 'var(--text-muted)'}}>Nội dung chi tiết đang được cập nhật...</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
