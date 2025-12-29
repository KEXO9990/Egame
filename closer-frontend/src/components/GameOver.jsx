import './GameOver.css';

function GameOver({ score, rounds, onPlayAgain }) {
  const getScoreMessage = (score, rounds) => {
    const percentage = (score / (rounds * 10)) * 100;
    
    if (percentage >= 80) {
      return {
        title: '🌟 Soulmates! 🌟',
        message: 'You two are incredibly in sync! Your connection is truly special.',
      };
    } else if (percentage >= 60) {
      return {
        title: '💕 Great Connection! 💕',
        message: 'You understand each other well and have a beautiful bond.',
      };
    } else if (percentage >= 40) {
      return {
        title: '✨ Growing Together ✨',
        message: 'You\'re learning more about each other. Keep exploring!',
      };
    } else {
      return {
        title: '🌱 Just Getting Started 🌱',
        message: 'Every couple is unique! Use these insights to grow closer.',
      };
    }
  };

  const scoreData = getScoreMessage(score, rounds);

  return (
    <div className="container fade-in">
      <div className="game-over-header">
        <h1 className="game-over-title">Game Complete!</h1>
      </div>

      <div className="stats-card card">
        <div className="stat-item">
          <div className="stat-label">Total Score</div>
          <div className="stat-value">{score}</div>
        </div>
        <div className="stat-divider"></div>
        <div className="stat-item">
          <div className="stat-label">Rounds Played</div>
          <div className="stat-value">{rounds}</div>
        </div>
      </div>

      <div className="result-card card fade-in">
        <h2 className="result-title">{scoreData.title}</h2>
        <p className="result-message">{scoreData.message}</p>
      </div>

      <div className="final-message fade-in">
        <p>Thank you for playing Closer. May your bond continue to deepen. 💝</p>
      </div>

      <button className="btn" onClick={onPlayAgain}>
        Play Again
      </button>
    </div>
  );
}

export default GameOver;
