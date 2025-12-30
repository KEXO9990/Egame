import { useState } from 'react';
import './Home.css';

function Home({ onCreateRoom, onJoinRoom }) {
  const [name, setName] = useState('');
  const [joinCode, setJoinCode] = useState('');
  const [mode, setMode] = useState(null);

  const handleCreate = () => {
    if (name.trim()) {
      onCreateRoom(name);
    }
  };

  const handleJoin = () => {
    if (name.trim() && joinCode.trim()) {
      onJoinRoom(name, joinCode.toUpperCase());
    }
  };

  if (!mode) {
    return (
      <div className="container fade-in">
        <div className="logo">
          <h1>كلوزر</h1>
          <p>تواصل أعمق</p>
        </div>
        
        <div className="welcome-text">
          <p>لعبة مصممة لتقربكم أنتم وشريككم من خلال أسئلة ذات معنى وتحديات مدروسة.</p>
        </div>

        <div className="button-group">
          <button className="btn" onClick={() => setMode('create')}>
            إنشاء لعبة جديدة
          </button>
          <button className="btn btn-secondary" onClick={() => setMode('join')}>
            الانضمام للعبة
          </button>
        </div>

        <div className="features">
          <div className="feature">
            <span className="feature-icon">💝</span>
            <p>اكتشفوا أشياء جديدة عن بعضكم</p>
          </div>
          <div className="feature">
            <span className="feature-icon">🎯</span>
            <p>بناء اتصال أعمق</p>
          </div>
          <div className="feature">
            <span className="feature-icon">✨</span>
            <p>خلق لحظات لا تُنسى</p>
          </div>
        </div>
      </div>
    );
  }

  if (mode === 'create') {
    return (
      <div className="container fade-in">
        <div className="logo">
          <h1>كلوزر</h1>
        </div>

        <h2 className="form-title">إنشاء لعبة جديدة</h2>
        
        <input
          type="text"
          className="input"
          placeholder="أدخل اسمك"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleCreate()}
          maxLength={20}
        />

        <button className="btn" onClick={handleCreate} disabled={!name.trim()}>
          إنشاء غرفة
        </button>

        <button className="btn btn-secondary" onClick={() => setMode(null)} style={{ marginTop: '15px' }}>
          رجوع
        </button>
      </div>
    );
  }

  return (
    <div className="container fade-in">
      <div className="logo">
        <h1>كلوزر</h1>
      </div>

      <h2 className="form-title">الانضمام للعبة</h2>
      
      <input
        type="text"
        className="input"
        placeholder="أدخل اسمك"
        value={name}
        onChange={(e) => setName(e.target.value)}
        maxLength={20}
      />

      <input
        type="text"
        className="input"
        placeholder="أدخل كود الغرفة"
        value={joinCode}
        onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
        onKeyPress={(e) => e.key === 'Enter' && handleJoin()}
        maxLength={6}
      />

      <button className="btn" onClick={handleJoin} disabled={!name.trim() || !joinCode.trim()}>
        الانضمام للغرفة
      </button>

      <button className="btn btn-secondary" onClick={() => setMode(null)} style={{ marginTop: '15px' }}>
        رجوع
      </button>
    </div>
  );
}

export default Home;
