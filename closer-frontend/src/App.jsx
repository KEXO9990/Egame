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
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:3001';

function App() {
  const [socket, setSocket] = useState(null);
  const [gameState, setGameState] = useState('home');
  const [playerName, setPlayerName] = useState('');
  const [roomCode, setRoomCode] = useState('');
  const [players, setPlayers] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [round, setRound] = useState(0);
  const [answer, setAnswer] = useState('');
  const [revealData, setRevealData] = useState(null);
  const [challenge, setChallenge] = useState(null);
  const [score, setScore] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    const newSocket = io(SOCKET_URL);
    setSocket(newSocket);

    newSocket.on('room-created', ({ roomCode, player }) => {
      setRoomCode(roomCode);
      setPlayers([player]);
      setGameState('waiting');
    });

    newSocket.on('player-joined', ({ players }) => {
      setPlayers(players);
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
        />
      )}
      
      {gameState === 'reveal' && (
        <AnswerReveal
          data={revealData}
          onContinue={() => {}}
        />
      )}
      
      {gameState === 'challenge' && (
        <Challenge
          challenge={challenge}
          onNext={nextRound}
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
