import './Challenge.css';

function Challenge({ challenge, onNext }) {
  const getTypeColor = (type) => {
    switch(type) {
      case 'light': return '#4ecdc4';
      case 'romantic': return '#ff6b9d';
      case 'deep': return '#9b59b6';
      default: return '#d4af37';
    }
  };

  const getTypeEmoji = (type) => {
    switch(type) {
      case 'light': return '😄';
      case 'romantic': return '💕';
      case 'deep': return '🌟';
      default: return '✨';
    }
  };

  return (
    <div className="container fade-in">
      <div className="challenge-header">
        <h2 className="challenge-title">Challenge Time!</h2>
      </div>

      <div className="challenge-card card" style={{ borderColor: getTypeColor(challenge.type) }}>
        <div className="challenge-type-badge" style={{ background: getTypeColor(challenge.type) }}>
          <span className="type-emoji">{getTypeEmoji(challenge.type)}</span>
          <span className="type-text">{challenge.type}</span>
        </div>
        
        <div className="challenge-text">
          {challenge.text}
        </div>
      </div>

      <div className="challenge-instructions fade-in">
        <p>Complete this challenge together, then continue to the next round.</p>
      </div>

      <button className="btn" onClick={onNext}>
        Next Round
      </button>
    </div>
  );
}

export default Challenge;
