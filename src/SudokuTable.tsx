import React, { useState } from 'react';

type SudokuBoard = (number | string)[][];

const initialBoard: SudokuBoard = [
  [5, 3, '', '', 7, '', '', '', ''],
  [6, '', '', 1, 9, 5, '', '', ''],
  ['', 9, 8, '', '', '', '', 6, ''],
  [8, '', '', '', 6, '', '', '', 3],
  [4, '', '', 8, '', 3, '', '', 1],
  [7, '', '', '', 2, '', '', '', 6],
  ['', 6, '', '', '', '', 2, 8, ''],
  ['', '', '', 4, 1, 9, '', '', 5],
  ['', '', '', '', 8, '', '', 7, 9],
];

const SudokuTable: React.FC = () => {
  const [board, setBoard] = useState<SudokuBoard>(initialBoard);

  const renderRows = (): React.ReactNode[] => {
    const rows: React.ReactNode[] = [];
    board.forEach((row, i) => {
      const cells = row.map((cell, j) => (
        <td key={j}>
          <input
            type="text"
            value={cell}
            onChange={(e) => handleCellChange(i, j, e.target.value)}
            maxLength={1}
          />
        </td>
      ));
      rows.push(<tr key={i}>{cells}</tr>);
    });
    return rows;
  };

  const handleCellChange = (i: number, j: number, value: string) => {
    const newBoard = [...board];
    newBoard[i][j] = value;
    setBoard(newBoard);
  };

  const handlePrintBoard = () => {
    console.log(board);
  };

  const renderBoard = () => {
    return board.map((row, i) => (
      <div key={i}>
        {row.map((cell, j) => (
          <span key={`${i}-${j}`}>{cell} </span>
        ))}
        <br />
      </div>
    ));
  };

  return (
    <div>
      <table>
        <tbody>{renderRows()}</tbody>
      </table>
      <button onClick={handlePrintBoard}>Imprimir Board</button>
      <div>
        <h2>Estado Atual do Tabuleiro:</h2>
        {renderBoard()}
      </div>
    </div>
  );
};

export default SudokuTable;
