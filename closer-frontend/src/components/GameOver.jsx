import './GameOver.css';

function GameOver({ score, rounds, onPlayAgain }) {
  const getScoreMessage = (score, rounds) => {
    const percentage = (score / (rounds * 10)) * 100;
    
    if (percentage >= 80) {
      return {
        title: '🌟 توأم روح! 🌟',
        message: 'أنتما متناغمان بشكل لا يصدق! ارتباطكما مميز حقاً.',
      };
    } else if (percentage >= 60) {
      return {
        title: '💕 اتصال رائع! 💕',
        message: 'أنتما تفهمان بعضكما جيداً ولديكما رابط جميل.',
      };
    } else if (percentage >= 40) {
      return {
        title: '✨ تنموان معاً ✨',
        message: 'أنتم تتعلمون المزيد عن بعضكم. استمروا في الاستكشاف!',
      };
    } else {
      return {
        title: '🌱 مجرد بداية 🌱',
        message: 'كل ثنائي فريد! استخدموا هذه الرؤى للتقرب أكثر.',
      };
    }
  };

  const scoreData = getScoreMessage(score, rounds);

  return (
    <div className="container fade-in">
      <div className="game-over-header">
        <h1 className="game-over-title">اكتملت اللعبة!</h1>
      </div>

      <div className="stats-card card">
        <div className="stat-item">
          <div className="stat-label">مجموع النقاط</div>
          <div className="stat-value">{score}</div>
        </div>
        <div className="stat-divider"></div>
        <div className="stat-item">
          <div className="stat-label">الجولات الملعوبة</div>
          <div className="stat-value">{rounds}</div>
        </div>
      </div>

      <div className="result-card card fade-in">
        <h2 className="result-title">{scoreData.title}</h2>
        <p className="result-message">{scoreData.message}</p>
      </div>

      <div className="final-message fade-in">
        <p>شكراً للعب كلوزر. نتمنى أن يزداد ارتباطكما عمقاً. 💝</p>
      </div>

      <button className="btn" onClick={onPlayAgain}>
        العب مرة أخرى
      </button>
    </div>
  );
}

export default GameOver;
