import { useState, useEffect } from 'react';
import { Routes, Route, NavLink, useNavigate, useParams, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Calendar, Target, BookOpen, CheckCircle, Edit3, Sun, Moon, ArrowLeft } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

function PracticeTest({ test, isMini }) {
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
        <h2 style={{ fontSize: isMini ? '1.4rem' : '1.8rem', color: 'var(--text-main)' }}>
          <Edit3 style={{display: 'inline', marginRight: '10px'}}/> {test.title}
        </h2>
        {submitted && <span className="badge" style={{fontSize: '1.1rem'}}>Điểm: {score}/{test.questions.length}</span>}
      </div>
      <div className={isMini ? "mini-quiz-container" : "quiz-container"}>
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

function Dashboard({ data }) {
  return (
    <div style={{ animation: 'fadeIn 0.5s ease' }}>
      <Helmet>
        <title>Thử thách 60 Ngày - IELTS Summer</title>
        <meta name="description" content="Cam kết luyện tập liên tục trong 60 ngày để hình thành thói quen học tiếng Anh chủ động." />
      </Helmet>
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
  );
}

function RoutePage({ title, description, routeData, routePrefix }) {
  const navigate = useNavigate();
  return (
    <div style={{ animation: 'fadeIn 0.5s ease' }}>
      <Helmet>
        <title>{`${title} - IELTS Summer`}</title>
        <meta name="description" content={description} />
      </Helmet>
      <div className="page-header">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <div className="grid">
        {routeData.map((item) => (
          <div key={item.week} className="card clickable-card" onClick={() => navigate(`/${routePrefix}/tuan/${item.week}`)}>
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
  );
}

function LessonDetailPage({ data, routePrefix }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [expandedDay, setExpandedDay] = useState(null);
  const [expandedPracticeDay, setExpandedPracticeDay] = useState(null);

  const routeData = routePrefix === 'route-a' ? data.route_a : data.route_b;
  const lesson = routeData.find(item => item.week.toString() === id);

  if (!lesson) {
    return <div style={{padding: '2rem'}}>Không tìm thấy bài học!</div>;
  }

  return (
    <div style={{ animation: 'fadeIn 0.5s ease' }}>
      <Helmet>
        <title>{`Tuần ${lesson.week}: ${lesson.topic} - IELTS Summer`}</title>
        <meta name="description" content={`Chi tiết bài học tuần ${lesson.week} - ${lesson.topic}`} />
      </Helmet>
      
      <button 
        className="btn-secondary" 
        onClick={() => navigate(`/${routePrefix}`)}
        style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '8px' }}
      >
        <ArrowLeft size={18} /> Quay lại danh sách
      </button>

      <div className="card" style={{ padding: '2.5rem', marginBottom: '2rem', cursor: 'default' }}>
        <div style={{marginBottom: '2rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1.5rem'}}>
          <span className="badge" style={{marginBottom: '1rem'}}>Tuần {lesson.week}</span>
          <h2 style={{ fontSize: '2.2rem', marginBottom: '0.5rem', color: 'var(--text-main)' }}>{lesson.topic}</h2>
          <p style={{fontWeight: 500, color: 'var(--primary)', fontSize: '1.2rem'}}>Mục tiêu: {lesson.focus}</p>
        </div>
        
        {lesson.checkpoint && (
          <div style={{background: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.3)', padding: '1.5rem', borderRadius: '16px', marginBottom: '2.5rem'}}>
            <strong style={{color: '#d97706', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '8px'}}>
              <Target size={20} /> Mốc kiểm tra:
            </strong>
            <p style={{color: '#b45309', margin: 0, marginTop: '0.5rem', fontSize: '1.05rem', lineHeight: '1.6'}}>{lesson.checkpoint}</p>
          </div>
        )}

        <h3 style={{ marginBottom: '2rem', fontSize: '1.6rem', color: 'var(--text-main)' }}>Lịch trình chi tiết</h3>
        
        {lesson.daily_plan && lesson.daily_plan.length > 0 ? (
          <div className="lesson-list">
            {lesson.daily_plan.map(dp => (
              <div key={dp.day} className="lesson-item" style={{ marginBottom: '1.5rem' }}>
                <div 
                  style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} 
                  onClick={() => {
                    setExpandedDay(expandedDay === dp.day ? null : dp.day);
                    if (expandedDay !== dp.day) setExpandedPracticeDay(null);
                  }}
                >
                  <div>
                    <h4 style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '0 0 0.5rem 0', color: 'var(--text-main)', fontSize: '1.2rem' }}>
                      <Calendar size={20} color="var(--primary)" /> Ngày {dp.day}: {dp.task}
                    </h4>
                    <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', margin: 0, fontSize: '1.05rem' }}>{dp.detail}</p>
                  </div>
                  <div style={{ color: 'var(--primary)', fontWeight: 'bold', fontSize: '1rem', flexShrink: 0, paddingLeft: '1.5rem' }}>
                    {expandedDay === dp.day ? '▲ Thu gọn' : '▼ Chi tiết'}
                  </div>
                </div>
                
                {expandedDay === dp.day && dp.deep_dive && (
                  <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid var(--border-color)', animation: 'fadeIn 0.3s ease' }}>
                    <div className="markdown-body">
                      <ReactMarkdown>{dp.deep_dive}</ReactMarkdown>
                    </div>
                    
                    {dp.practice && (
                      <div style={{ marginTop: '2.5rem' }}>
                        <button 
                          className="btn-primary" 
                          style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', padding: '1rem' }}
                          onClick={() => setExpandedPracticeDay(expandedPracticeDay === dp.day ? null : dp.day)}
                        >
                          <Edit3 size={18} /> {expandedPracticeDay === dp.day ? 'Đóng bài tập' : 'Mở bài tập Luyện tập'}
                        </button>
                        
                        {expandedPracticeDay === dp.day && (
                          <div style={{ marginTop: '1.5rem', padding: '2rem', borderRadius: '16px', border: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.02)' }}>
                            <PracticeTest test={dp.practice} isMini={true} />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p style={{marginTop: '1rem', fontStyle: 'italic', color: 'var(--text-muted)'}}>Nội dung chi tiết đang được cập nhật...</p>
        )}
      </div>
    </div>
  );
}

function PracticeListPage({ data }) {
  const [selectedPracticeId, setSelectedPracticeId] = useState(null);

  if (!data.practice_tests || data.practice_tests.length === 0) {
    return <div style={{padding: '2rem'}}>Không có bài luyện tập nào!</div>;
  }

  return (
    <div style={{ animation: 'fadeIn 0.5s ease' }}>
      <Helmet>
        <title>Danh sách Luyện tập - IELTS Summer</title>
        <meta name="description" content="Tuyển tập các bài test ngắn bám sát format IELTS, tự động chấm điểm." />
      </Helmet>
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
            style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '8px' }} 
            onClick={() => setSelectedPracticeId(null)}
          >
            <ArrowLeft size={18} /> Quay lại danh sách
          </button>
          <PracticeTest test={data.practice_tests.find(t => t.id === selectedPracticeId)} />
        </div>
      )}
    </div>
  );
}

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  
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
          <NavLink to="/" end className={({isActive}) => isActive ? 'nav-btn active' : 'nav-btn'}>
            <Calendar size={20} />
            <span>Thử thách 60 Ngày</span>
          </NavLink>
          
          <NavLink to="/route-a" className={({isActive}) => isActive || location.pathname.includes('/route-a') ? 'nav-btn active' : 'nav-btn'}>
            <BookOpen size={20} />
            <span>Lộ trình A</span>
          </NavLink>
          
          <NavLink to="/route-b" className={({isActive}) => isActive || location.pathname.includes('/route-b') ? 'nav-btn active' : 'nav-btn'}>
            <Target size={20} />
            <span>Lộ trình B</span>
          </NavLink>
          
          <NavLink to="/practice" className={({isActive}) => isActive ? 'nav-btn active' : 'nav-btn'}>
            <Edit3 size={20} />
            <span>Luyện tập</span>
          </NavLink>
        </nav>
      </aside>

      {/* Main Content Area via Routes */}
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Dashboard data={data} />} />
          
          <Route path="/route-a" element={<RoutePage title="Lộ trình A: Foundation to 6.0+" description="Dành cho người mất gốc, lâu chưa học hoặc đang kẹt ở 3.0 - 5.0. Mục tiêu: Tạo bộ xương tiếng Anh." routeData={data.route_a} routePrefix="route-a" />} />
          <Route path="/route-a/tuan/:id" element={<LessonDetailPage data={data} routePrefix="route-a" />} />
          
          <Route path="/route-b" element={<RoutePage title="Lộ trình B: Trần band 6+" description="Dành cho người có nền tảng tốt nhưng bị kẹt điểm. Mục tiêu: Kiểm soát lỗi và tăng độ sâu lập luận." routeData={data.route_b} routePrefix="route-b" />} />
          <Route path="/route-b/tuan/:id" element={<LessonDetailPage data={data} routePrefix="route-b" />} />
          
          <Route path="/practice" element={<PracticeListPage data={data} />} />
          <Route path="*" element={<div style={{padding: '2rem'}}>Đang tải trang hoặc trang không tồn tại... (404)</div>} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
