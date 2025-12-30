import './Challenge.css';

function Challenge({ challenge, onNext, onExit }) {
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

  const getTypeText = (type) => {
    switch(type) {
      case 'light': return 'خفيف';
      case 'romantic': return 'رومانسي';
      case 'deep': return 'عميق';
      default: return 'تحدي';
    }
  };

  return (
    <div className="container fade-in">
      <div className="challenge-header">
        <h2 className="challenge-title">وقت التحدي!</h2>
      </div>

      <div className="challenge-card card" style={{ borderColor: getTypeColor(challenge.type) }}>
        <div className="challenge-type-badge" style={{ background: getTypeColor(challenge.type) }}>
          <span className="type-emoji">{getTypeEmoji(challenge.type)}</span>
          <span className="type-text">{getTypeText(challenge.type)}</span>
        </div>
        
        <div className="challenge-text">
          {challenge.text}
        </div>
      </div>

      <div className="challenge-instructions fade-in">
        <p>أكملوا هذا التحدي معاً، ثم انتقلوا إلى الجولة التالية.</p>
      </div>

      <div className="challenge-buttons">
        <button className="btn" onClick={onNext}>
          الجولة التالية
        </button>
        <button className="btn btn-secondary" onClick={onExit}>
          الخروج للصفحة الرئيسية
        </button>
      </div>
    </div>
  );
}

export default Challenge;
