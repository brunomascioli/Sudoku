import React, { useState, useEffect } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import '../styles/SudokuTable.css';
import validateMove from '../sudoku-validator';

const SudokuTable = () => {
  const { table } = useLoaderData();
  const [timer, setTimer] = useState(0);
  const [countErrors, setCountErrors] = useState(0);
  const [gameBoard, setGameBoard] = useState([]);
  const [showLostModal, setShowLostModal] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    const convertedBoard = table.map(row => row.map(cell => (cell === 0 ? '' : cell)));
    setGameBoard(convertedBoard);
  }, [table]);

  useEffect(() => {
    if (countErrors === 3) {
      setShowLostModal(true); 
    }
  }, [countErrors]);

  useEffect(() => {
    if(showLostModal) return;

    const interval = setInterval(() => {
      setTimer(time => time + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleCellChange = (rowIndex, colIndex, value) => {
    if (isNaN(value)) return;
    if (table[rowIndex][colIndex] !== 0) return; // impede alteração de células não vazias no board original
    const newBoard = [...gameBoard] ;
    
    if(value === ''){ // nao acrescenta erro no caso em que o usuario apaga o valor
      newBoard[rowIndex][colIndex] = value;
      setGameBoard(newBoard);
      return;
    }

    if (!validateMove(gameBoard, rowIndex, colIndex, value)){
      setCountErrors(countErrors + 1);
    }
    newBoard[rowIndex][colIndex] = value.toUpperCase();
    setGameBoard(newBoard);
  };
  
  const resetGame = () => {
    const convertedBoard = table.map(row => row.map(cell => (cell === 0 ? '' : cell)));
    setGameBoard(convertedBoard);
    setCountErrors(0);
    setTimer(0);
    setShowLostModal(false);
  }
  
  const handleRedirect = () => {
    navigate('/home')
  }
  
  const renderRows = () => {
    return gameBoard.map((row, i) => (
      <tr key={i}>
        {row.map((cell, j) => (
          <td key={j}>
            <input
              className={`cell ${i % 3 === 2 && j % 3 === 2 ? 'bottom-right' : ''} ${table[i][j] !== 0 ? 'default readonly' : ''}`}
              type="text"
              value={cell || ''}
              onChange={(e) => handleCellChange(i, j, e.target.value)}
              maxLength={1}
              readOnly={table[i][j] !== 0}
            />
          </td>
        ))}
      </tr>
    ));
  };

  return (
    <div className="sudoku-container">
      <div className='stats'>
        <p>Erros {countErrors}/3</p>
        <p>Tempo: {timer}s</p>
      </div>
      <table className="sudoku-table">
        <tbody>{renderRows()}</tbody>
      </table>
      <button onClick={() => {}} id='verify-button'>Verificar</button>
      <div className={`end-message ${showLostModal ? 'show' : ''}`}>
        <div className="modal-content">
          <h2>Você perdeu!</h2>
          <button onClick={resetGame}>Reiniciar</button>
          <button onClick={handleRedirect}>Home</button>
        </div>
      </div>
    </div>
  );
};

export default SudokuTable;
