import React, { useState } from 'react';
import '../styles/Board.css'
// Componente para un cuadro 
function BoardSquare({ isShip, shipSize, onClick, rowIndex, columnIndex }) {
    const shipClass = isShip ? `ship-${shipSize}` : '';

    return <div className={`square ${shipClass}`} onClick={() => onClick(rowIndex, columnIndex)}></div>
}

export default function Board() {

    const [selectedShipSize, setSelectedShipSize] = useState(1);

    const [boardData, setBoardData] = useState([
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ]);

    const typeShip = (cell) => {
        switch (cell) {
            case 1:
                return 1;
            case 2:
                return 2;
            case 3:
                return 3;
            case 4:
                return 4;
            case 5:
                return 5;
            default:
                return 0;
        }
    }
    const chooseBoat = (rowIndex, columnIndex) => {
        if (boardData[rowIndex][columnIndex] === 0) {
            // Si no hay un barco, coloca uno nuevo en la celda seleccionada
            const updatedBoard = [...boardData];
            updatedBoard[rowIndex][columnIndex] = selectedShipSize; 
            setBoardData(updatedBoard);
        }
    }

    return (
        <div className='board'>
            {boardData.map((row, rowIndex) => {
                return row.map((cell, columnIndex) => (
                    <BoardSquare key={`${rowIndex}-${columnIndex}`}
                        isShip={cell === 1 || cell === 2 || cell === 3 || cell === 4|| cell === 5}
                        shipSize={typeShip(cell)}
                        rowIndex={rowIndex}
                        columnIndex={columnIndex}
                        onClick={chooseBoat}
                    />
                ));
            })}
            <div className='ship-selector'>
                <h3>Selecciona el tamaño del barco:</h3>
                <button onClick={() => setSelectedShipSize(1)}>Tamaño 1</button>
                <button onClick={() => setSelectedShipSize(2)}>Tamaño 2</button>
                <button onClick={() => setSelectedShipSize(3)}>Tamaño 3</button>
                <button onClick={() => setSelectedShipSize(4)}>Tamaño 4</button>
                <button onClick={() => setSelectedShipSize(5)}>Tamaño 5</button>
            </div>
        </div>
    );
}

