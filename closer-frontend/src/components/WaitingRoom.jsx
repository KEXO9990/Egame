import './WaitingRoom.css';

function WaitingRoom({ roomCode, players, onStartGame }) {
  const canStart = players.length === 2;

  return (
    <div className="container fade-in">
      <div className="logo">
        <h1>Closer</h1>
      </div>

      <div className="room-code-display">
        <p className="room-label">Room Code</p>
        <h2 className="room-code">{roomCode}</h2>
        <p className="room-hint">Share this code with your partner</p>
      </div>

      <div className="players-section">
        <h3 className="section-title">Players ({players.length}/2)</h3>
        <div className="players-list">
          {players.map((player, index) => (
            <div key={player.id} className="player-card slide-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="player-avatar">
                {player.name.charAt(0).toUpperCase()}
              </div>
              <div className="player-name">{player.name}</div>
            </div>
          ))}
          {players.length < 2 && (
            <div className="player-card waiting-card">
              <div className="player-avatar waiting-avatar">
                <div className="pulse-loader"></div>
              </div>
              <div className="player-name waiting-text">Waiting...</div>
            </div>
          )}
        </div>
      </div>

      {canStart && (
        <button className="btn fade-in" onClick={onStartGame}>
          Start Game
        </button>
      )}

      {!canStart && (
        <div className="waiting-message fade-in">
          <p>Waiting for your partner to join...</p>
        </div>
      )}
    </div>
  );
}

export default WaitingRoom;
