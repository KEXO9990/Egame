import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import './App.css';
import Home from './components/Home';
import WaitingRoom from './components/WaitingRoom';
import GamePlay from './components/GamePlay';
import AnswerReveal from './components/AnswerReveal';
import Challenge from './components/Challenge';
import GameOver from './components/GameOver';

// Update this with your deployed backend URL
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'https://closer-backend-production.up.railway.app';

function App() {
  const [socket, setSocket] = useState(null);
  const [gameState, setGameState] = useState(() => {
    const saved = localStorage.getItem('gameState');
    return saved || 'home';
  });
  const [playerName, setPlayerName] = useState(() => {
    return localStorage.getItem('playerName') || '';
  });
  const [roomCode, setRoomCode] = useState(() => {
    return localStorage.getItem('roomCode') || '';
  });
  const [players, setPlayers] = useState(() => {
    const saved = localStorage.getItem('players');
    return saved ? JSON.parse(saved) : [];
  });
  const [currentQuestion, setCurrentQuestion] = useState(() => {
    const saved = localStorage.getItem('currentQuestion');
    return saved ? JSON.parse(saved) : null;
  });
  const [round, setRound] = useState(() => {
    const saved = localStorage.getItem('round');
    return saved ? parseInt(saved) : 0;
  });
  const [answer, setAnswer] = useState('');
  const [revealData, setRevealData] = useState(() => {
    const saved = localStorage.getItem('revealData');
    return saved ? JSON.parse(saved) : null;
  });
  const [challenge, setChallenge] = useState(() => {
    const saved = localStorage.getItem('challenge');
    return saved ? JSON.parse(saved) : null;
  });
  const [score, setScore] = useState(() => {
    const saved = localStorage.getItem('score');
    return saved ? parseInt(saved) : 0;
  });
  const [error, setError] = useState('');

  // Save state to localStorage whenever it changes
  useEffect(() => {
    if (gameState !== 'home') {
      localStorage.setItem('gameState', gameState);
      localStorage.setItem('playerName', playerName);
      localStorage.setItem('roomCode', roomCode);
      localStorage.setItem('players', JSON.stringify(players));
      localStorage.setItem('currentQuestion', JSON.stringify(currentQuestion));
      localStorage.setItem('round', round.toString());
      localStorage.setItem('revealData', JSON.stringify(revealData));
      localStorage.setItem('challenge', JSON.stringify(challenge));
      localStorage.setItem('score', score.toString());
    }
  }, [gameState, playerName, roomCode, players, currentQuestion, round, revealData, challenge, score]);

  useEffect(() => {
    const newSocket = io(SOCKET_URL);
    setSocket(newSocket);

    // Rejoin room if coming back from refresh
    const savedRoomCode = localStorage.getItem('roomCode');
    const savedPlayerName = localStorage.getItem('playerName');
    if (savedRoomCode && savedPlayerName && gameState !== 'home') {
      newSocket.emit('rejoin-room', { 
        roomCode: savedRoomCode, 
        playerName: savedPlayerName 
      });
    }

    newSocket.on('room-created', ({ roomCode, player }) => {
      setRoomCode(roomCode);
      setPlayers([player]);
      setGameState('waiting');
    });

    newSocket.on('player-joined', ({ players }) => {
      setPlayers(players);
    });

    newSocket.on('rejoin-success', ({ players }) => {
      setPlayers(players);
      console.log('Successfully rejoined room');
    });

    newSocket.on('game-started', ({ question, round }) => {
      setCurrentQuestion(question);
      setRound(round);
      setAnswer('');
      setGameState('playing');
    });

    newSocket.on('answers-revealed', (data) => {
      setRevealData(data);
      setScore(data.score);
      setGameState('reveal');
    });

    newSocket.on('challenge-time', (challengeData) => {
      setChallenge(challengeData);
      setGameState('challenge');
    });

    newSocket.on('next-question', ({ question, round }) => {
      setCurrentQuestion(question);
      setRound(round);
      setAnswer('');
      setGameState('playing');
    });

    newSocket.on('game-over', ({ score, rounds }) => {
      setScore(score);
      setRound(rounds);
      setGameState('gameover');
    });

    newSocket.on('player-left', ({ players }) => {
      setPlayers(players);
      if (players.length < 2 && gameState !== 'home' && gameState !== 'waiting') {
        setError('Your partner left the game');
        setTimeout(() => {
          resetGame();
        }, 3000);
      }
    });

    newSocket.on('error', ({ message }) => {
      setError(message);
      setTimeout(() => setError(''), 3000);
    });

    return () => newSocket.close();
  }, []);

  const createRoom = (name) => {
    setPlayerName(name);
    socket.emit('create-room', name);
  };

  const joinRoom = (name, code) => {
    setPlayerName(name);
    socket.emit('join-room', { roomCode: code, playerName: name });
    setRoomCode(code);
    setGameState('waiting');
  };

  const startGame = () => {
    socket.emit('start-game', roomCode);
  };

  const submitAnswer = () => {
    if (answer.trim()) {
      socket.emit('submit-answer', { roomCode, answer });
      setGameState('waiting-reveal');
    }
  };

  const nextRound = () => {
    socket.emit('next-round', roomCode);
  };

  const resetGame = () => {
    setGameState('home');
    setPlayerName('');
    setRoomCode('');
    setPlayers([]);
    setCurrentQuestion(null);
    setRound(0);
    setAnswer('');
    setRevealData(null);
    setChallenge(null);
    setScore(0);
    setError('');
  };

  const exitToHome = () => {
    if (socket && roomCode) {
      socket.emit('leave-room', roomCode);
    }
    // Clear localStorage when explicitly exiting
    localStorage.removeItem('gameState');
    localStorage.removeItem('playerName');
    localStorage.removeItem('roomCode');
    localStorage.removeItem('players');
    localStorage.removeItem('currentQuestion');
    localStorage.removeItem('round');
    localStorage.removeItem('revealData');
    localStorage.removeItem('challenge');
    localStorage.removeItem('score');
    resetGame();
  };

  return (
    <div className="app">
      {error && (
        <div className="error-banner fade-in">
          {error}
        </div>
      )}
      
      {gameState === 'home' && (
        <Home onCreateRoom={createRoom} onJoinRoom={joinRoom} />
      )}
      
      {gameState === 'waiting' && (
        <WaitingRoom
          roomCode={roomCode}
          players={players}
          onStartGame={startGame}
        />
      )}
      
      {(gameState === 'playing' || gameState === 'waiting-reveal') && (
        <GamePlay
          question={currentQuestion}
          round={round}
          score={score}
          answer={answer}
          setAnswer={setAnswer}
          onSubmit={submitAnswer}
          waiting={gameState === 'waiting-reveal'}
          onExit={exitToHome}
        />
      )}
      
      {gameState === 'reveal' && (
        <AnswerReveal
          data={revealData}
          onContinue={() => {}}
          onExit={exitToHome}
        />
      )}
      
      {gameState === 'challenge' && (
        <Challenge
          challenge={challenge}
          onNext={nextRound}
          onExit={exitToHome}
        />
      )}
      
      {gameState === 'gameover' && (
        <GameOver
          score={score}
          rounds={round}
          onPlayAgain={resetGame}
        />
      )}
    </div>
  );
}

export default App;
