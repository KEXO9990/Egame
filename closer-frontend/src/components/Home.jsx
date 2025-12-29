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
          <h1>Closer</h1>
          <p>Connect Deeper</p>
        </div>
        
        <div className="welcome-text">
          <p>A game designed to bring you and your partner closer through meaningful questions and thoughtful challenges.</p>
        </div>

        <div className="button-group">
          <button className="btn" onClick={() => setMode('create')}>
            Create New Game
          </button>
          <button className="btn btn-secondary" onClick={() => setMode('join')}>
            Join Game
          </button>
        </div>

        <div className="features">
          <div className="feature">
            <span className="feature-icon">💝</span>
            <p>Discover new things about each other</p>
          </div>
          <div className="feature">
            <span className="feature-icon">🎯</span>
            <p>Build deeper connection</p>
          </div>
          <div className="feature">
            <span className="feature-icon">✨</span>
            <p>Create memorable moments</p>
          </div>
        </div>
      </div>
    );
  }

  if (mode === 'create') {
    return (
      <div className="container fade-in">
        <div className="logo">
          <h1>Closer</h1>
        </div>

        <h2 className="form-title">Create New Game</h2>
        
        <input
          type="text"
          className="input"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleCreate()}
          maxLength={20}
        />

        <button className="btn" onClick={handleCreate} disabled={!name.trim()}>
          Create Room
        </button>

        <button className="btn btn-secondary" onClick={() => setMode(null)} style={{ marginTop: '15px' }}>
          Back
        </button>
      </div>
    );
  }

  return (
    <div className="container fade-in">
      <div className="logo">
        <h1>Closer</h1>
      </div>

      <h2 className="form-title">Join Game</h2>
      
      <input
        type="text"
        className="input"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        maxLength={20}
      />

      <input
        type="text"
        className="input"
        placeholder="Enter room code"
        value={joinCode}
        onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
        onKeyPress={(e) => e.key === 'Enter' && handleJoin()}
        maxLength={6}
      />

      <button className="btn" onClick={handleJoin} disabled={!name.trim() || !joinCode.trim()}>
        Join Room
      </button>

      <button className="btn btn-secondary" onClick={() => setMode(null)} style={{ marginTop: '15px' }}>
        Back
      </button>
    </div>
  );
}

export default Home;
