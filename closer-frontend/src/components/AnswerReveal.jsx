import './AnswerReveal.css';

function AnswerReveal({ data, onExit }) {
  return (
    <div className="container fade-in">
      <div className="reveal-header">
        <h2 className="reveal-title">
          {data.match ? '✨ تطابق تام! ✨' : '💭 آراء مختلفة'}
        </h2>
        <div className="score-display">
          <span className="score-badge">النقاط: {data.score}</span>
        </div>
        <button className="exit-btn" onClick={onExit} title="الخروج للصفحة الرئيسية">
          ✕
        </button>
      </div>

      <div className="answers-container">
        {data.answers.map((playerAnswer, index) => (
          <div key={index} className="answer-card card slide-in" style={{ animationDelay: `${index * 0.2}s` }}>
            <div className="player-label">{playerAnswer.name}</div>
            <div className="player-answer">{playerAnswer.answer}</div>
          </div>
        ))}
      </div>

      {!data.match && data.discussionPrompt && (
        <div className="discussion-card card fade-in">
          <div className="discussion-icon">💬</div>
          <h3 className="discussion-title">موضوع للنقاش</h3>
          <p className="discussion-text">{data.discussionPrompt}</p>
        </div>
      )}

      {data.match && (
        <div className="match-celebration fade-in">
          <p className="celebration-text">أنتم على نفس الموجة! 🎉</p>
        </div>
      )}
    </div>
  );
}

export default AnswerReveal;
