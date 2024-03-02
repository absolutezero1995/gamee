import { useState, useEffect, useRef } from 'react';
import AudioPlayer from 'react-audio-player';
import './Modal.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  question: {
    question: string;
    answer: string;
    rate: number;
  };
  setCount: (count: number) => void;
  setUserTotal: (total: number) => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, question, setCount, setUserTotal }) => {
  const [timer, setTimer] = useState<number>(30);
  const [isSongPlayed, setIsSongPlayed] = useState<boolean>(false);
  const [userAnswer, setUserAnswer] = useState('');
  const inputRef = useRef<HTMLInputElement>(null); // Создаем ref для input

  useEffect(() => {
    if (timer > 0) {
      const intervalId = setInterval(() => {
        setTimer((prev: number) => prev - 1);
      }, 1000);

      return () => clearInterval(intervalId);
    } else if (!isSongPlayed) {
      onClose();
      setIsSongPlayed(true);
      subtractPoints();
      console.log('SONG HAS PLAYED COMPLETELY');
    }
  }, [timer, isSongPlayed, onClose]);

  useEffect(() => {
    // Установим фокус на input, когда компонент отрисован и isOpen=true
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const subtractPoints = async () => {
    console.log('время вышло');
    setUserTotal((prev) => prev - question.rate);
    setCount((prev) => prev + 1);
  };

  const setAnswer = () => {
    if (userAnswer.trim().toUpperCase() === question.answer.trim().toUpperCase()) {
      onClose();
      console.log('правильно');
      setUserTotal((prev) => prev + question.rate);
      setCount((prev) => prev + 1);
    } else {
      onClose();
      console.log('не правильно');
      setUserTotal((prev) => prev - question.rate);
      setCount((prev) => prev + 1);
    }
  };

  const handlePlay = () => {
    // Добавьте свою логику, которая выполняется при начале проигрывания
  };

  const handlePause = () => {
    // Добавьте свою логику, которая выполняется при паузе
  };

  const handleEnded = () => {
    setIsSongPlayed(true);
    onClose();
    console.log('SONG HAS PLAYED COMPLETELY');
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setAnswer();
    }
  };

  return (
    isOpen && (
      <>
        <div className="modal-overlay">
          <div className="modal-content">
            <div className='content-block'>
              <p className='content-timer'>Таймер: {timer}</p>
              <p className='content-question'>Вопрос: {question.question}</p>
              <p>Очки: {question.rate}</p>
            </div>
            <div className='content-user'>
              <p>Введите ответ:</p>
              <input ref={inputRef} type="text" onChange={(e) => setUserAnswer(e.target.value)} onKeyPress={handleKeyPress} />
              <button onClick={setAnswer}>Ответить</button>
            </div>
            <div>
              <AudioPlayer
                src="../../public/SvoyaIgra/svoya_igra-30-sec.mp3"
                autoPlay
                controls={false}
                onPlay={handlePlay}
                onPause={handlePause}
                onEnded={handleEnded}
              />
            </div>
          </div>
        </div>
      </>
    )
  );
};

export default Modal;
