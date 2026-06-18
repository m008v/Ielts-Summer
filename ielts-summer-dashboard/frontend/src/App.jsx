import { useState, useEffect } from 'react';
import { Calendar, Target, BookOpen, CheckCircle, X } from 'lucide-react';

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('60days');
  const [selectedLesson, setSelectedLesson] = useState(null);

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
    return <div className="loading" style={{color: 'red'}}>Lỗi kết nối máy chủ! Hãy đảm bảo PHP server đang chạy.</div>;
  }

  return (
    <div className="app-container">
      <header className="header">
        <h1>IELTS Summer Dashboard</h1>
        <p>Học chắc. Sửa thật. Nói như người thật. Viết như người có suy nghĩ. Đọc như người biết nghi ngờ.</p>
      </header>

      <div className="tabs">
        <button 
          className={`tab-btn ${activeTab === '60days' ? 'active' : ''}`}
          onClick={() => setActiveTab('60days')}
        >
          <Calendar size={18} style={{display: 'inline', marginRight: '8px', verticalAlign: 'text-bottom'}} />
          Thử thách 60 Ngày
        </button>
        <button 
          className={`tab-btn ${activeTab === 'routeA' ? 'active' : ''}`}
          onClick={() => setActiveTab('routeA')}
        >
          <BookOpen size={18} style={{display: 'inline', marginRight: '8px', verticalAlign: 'text-bottom'}} />
          Lộ trình A (Nền tảng)
        </button>
        <button 
          className={`tab-btn ${activeTab === 'routeB' ? 'active' : ''}`}
          onClick={() => setActiveTab('routeB')}
        >
          <Target size={18} style={{display: 'inline', marginRight: '8px', verticalAlign: 'text-bottom'}} />
          Lộ trình B (Nâng cao)
        </button>
      </div>

      <main>
        {activeTab === '60days' && (
          <div>
            <h2><Calendar style={{display: 'inline', marginRight: '10px'}}/> Kế hoạch 60 ngày thử thách</h2>
            <div className="timeline-grid">
              {data.challenge_60_days.map((item) => (
                <div key={item.day} className="card">
                  <div className="card-header">
                    <span className="badge">Ngày {item.day}</span>
                  </div>
                  <div className="card-body">
                    <h3 className="card-title">{item.topic}</h3>
                    <div className="task-box">
                      <p><CheckCircle size={16} color="var(--primary)" style={{flexShrink: 0, marginTop: '3px'}} /> {item.task}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'routeA' && (
          <div>
            <h2><BookOpen style={{display: 'inline', marginRight: '10px'}}/> Lộ trình A: Foundation to 6.0+</h2>
            <p style={{marginBottom: '2rem'}}>Dành cho người mất gốc, lâu chưa học hoặc đang kẹt ở 3.0 - 5.0. Mục tiêu: Tạo bộ xương tiếng Anh.</p>
            <div className="grid">
              {data.route_a.map((item) => (
                <div key={item.week} className="card clickable-card" onClick={() => setSelectedLesson(item)}>
                  <div className="card-header">
                    <span className="badge">Tuần {item.week}</span>
                  </div>
                  <div className="card-body">
                    <h3 className="card-title">{item.topic}</h3>
                    <p style={{marginBottom: '1rem', fontWeight: 500, color: 'var(--primary-dark)'}}>Mục tiêu: {item.focus}</p>
                    <div className="task-box">
                      <p>Xem chi tiết bài học</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'routeB' && (
          <div>
            <h2><Target style={{display: 'inline', marginRight: '10px'}}/> Lộ trình B: Trần band 6+</h2>
            <p style={{marginBottom: '2rem'}}>Dành cho người có nền tảng tốt nhưng bị kẹt điểm. Mục tiêu: Kiểm soát lỗi và tăng độ sâu lập luận.</p>
            <div className="grid">
              {data.route_b.map((item) => (
                <div key={item.week} className="card clickable-card" onClick={() => setSelectedLesson(item)}>
                  <div className="card-header">
                    <span className="badge">Tuần {item.week}</span>
                  </div>
                  <div className="card-body">
                    <h3 className="card-title">{item.topic}</h3>
                    <p style={{marginBottom: '1rem', fontWeight: 500, color: 'var(--primary-dark)'}}>Mục tiêu: {item.focus}</p>
                    <div className="task-box">
                      <p>Xem chi tiết bài học</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Modal Popup */}
      {selectedLesson && (
        <div className="modal-overlay" onClick={() => setSelectedLesson(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedLesson(null)}>
              <X size={24} />
            </button>
            <div style={{marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem'}}>
              <span className="badge" style={{marginBottom: '0.5rem', display: 'inline-block'}}>Tuần {selectedLesson.week}</span>
              <h2>{selectedLesson.topic}</h2>
              <p style={{fontWeight: 500, color: 'var(--primary-dark)'}}>Mục tiêu: {selectedLesson.focus}</p>
            </div>
            
            {selectedLesson.checkpoint && (
              <div style={{background: '#fef3c7', padding: '1rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem'}}>
                <strong style={{color: '#b45309'}}>📌 Mốc kiểm tra:</strong>
                <p style={{color: '#92400e', margin: 0, marginTop: '0.25rem', fontSize: '0.95rem'}}>{selectedLesson.checkpoint}</p>
              </div>
            )}

            <h3>Nội dung bài học chi tiết</h3>
            
            {selectedLesson.daily_plan && selectedLesson.daily_plan.length > 0 ? (
              <div className="lesson-list">
                {selectedLesson.daily_plan.map(dp => (
                  <div key={dp.day} className="lesson-item">
                    <h4><Calendar size={16} /> Ngày {dp.day}: {dp.task}</h4>
                    <p>{dp.detail}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{marginTop: '1rem', fontStyle: 'italic', color: '#64748b'}}>Nội dung chi tiết đang được cập nhật...</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
