import './GamePlay.css';

function GamePlay({ question, round, score, answer, setAnswer, onSubmit, waiting, onExit }) {
  return (
    <div className="container fade-in">
      <div className="game-header">
        <div className="round-info">
          <span className="round-badge">الجولة {round}</span>
        </div>
        <div className="score-info">
          <span className="score-badge">النقاط: {score}</span>
        </div>
        <button className="exit-btn" onClick={onExit} title="الخروج للصفحة الرئيسية">
          ✕
        </button>
      </div>

      <div className="question-card card slide-in">
        <div className="question-icon">💭</div>
        <h2 className="question-text">{question?.question}</h2>
      </div>

      {!waiting ? (
        <div className="answer-section fade-in">
          <p className="answer-label">إجابتك:</p>
          <textarea
            className="answer-input"
            placeholder="اكتب إجابتك هنا..."
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            rows={4}
            maxLength={200}
          />
          <p className="char-count">{answer.length}/200</p>
          <button className="btn" onClick={onSubmit} disabled={!answer.trim()}>
            إرسال الإجابة
          </button>
        </div>
      ) : (
        <div className="waiting-section fade-in">
          <div className="waiting-spinner"></div>
          <p className="waiting-text">في انتظار شريكك...</p>
        </div>
      )}
    </div>
  );
}

export default GamePlay;
