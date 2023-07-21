import React, { useEffect, useState } from 'react';
import '../styles/Board.css'
// Componente para un cuadro 
function BoardSquare({ isShip, shipSize, onClick, rowIndex, columnIndex }) {
    const shipClass = isShip ? `ship-${shipSize}` : '';

    return <div className={`square ${shipClass}`} onClick={() => onClick(rowIndex, columnIndex)}></div>
}

export default function Board() {

    const [selectedShipSize, setSelectedShipSize] = useState(null);
    const [placedShips, setPlacedShips] = useState([]);
    const [isVertical, setIsVertical] = useState(false);

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
        if (selectedShipSize && !placedShips.includes(selectedShipSize)) {
            // Si se ha seleccionado un tipo y tamaño de barco y aún no se ha colocado este tipo, coloca el barco en la celda seleccionada
            const updatedBoard = [...boardData];
            for (let i = 0; i < selectedShipSize; i++) {
                // Verifica que no haya un barco en las celdas seleccionadas
                const cellValue = isVertical ? updatedBoard[rowIndex + i][columnIndex] : updatedBoard[rowIndex][columnIndex + i];
                if (cellValue !== 0) {
                    alert('No puedes colocar un barco aquí. Hay un barco en el camino.');
                    return;
                }
            }
            for (let i = 0; i < selectedShipSize; i++) {
                if (isVertical) {
                    updatedBoard[rowIndex + i][columnIndex] = selectedShipSize;
                } else {
                    updatedBoard[rowIndex][columnIndex + i] = selectedShipSize;
                }
            }
            setBoardData(updatedBoard);
            setPlacedShips([...placedShips, selectedShipSize]); // Agrega el tipo de barco a los barcos colocados
        } else {
            if (placedShips.includes(selectedShipSize)) {
                alert('Ya has colocado un barco de este tipo. Elige otro tipo de barco.');
            } else {
                alert('Primero debes seleccionar un tipo y tamaño de barco.');
            }
        }
    };
    const resetTable = () => {
        console.profile()
    }
    const toggleOrientation = () => {
        setIsVertical((prev) => !prev);
    };

    return (
        <div className='board'>
            {boardData.map((row, rowIndex) => {
                return row.map((cell, columnIndex) => (
                    <BoardSquare key={`${rowIndex}-${columnIndex}`}
                        isShip={cell === 1 || cell === 2 || cell === 3 || cell === 4 || cell === 5}
                        shipSize={typeShip(cell)}
                        rowIndex={rowIndex}
                        columnIndex={columnIndex}
                        onClick={chooseBoat}
                    />
                ));
            })}
            <div className='ship-selector-container'>
                <div className='ship-selector'>
                    <h3>Selecciona el tamaño del barco:</h3>
                    <button onClick={() => setSelectedShipSize(1)}>Tamaño 1</button>
                    <button onClick={() => setSelectedShipSize(2)}>Tamaño 2</button>
                    <button onClick={() => setSelectedShipSize(3)}>Tamaño 3</button>
                    <button onClick={() => setSelectedShipSize(4)}>Tamaño 4</button>
                    <button onClick={() => setSelectedShipSize(5)}>Tamaño 5</button>
                    <button onClick={resetTable}>Reiniciar tablero</button>
                    
                </div>
                <div className='orientation-selector'>

                        <h3>Orientación del barco:</h3>
                        <button onClick={toggleOrientation}>Horizontal</button>
                        <button onClick={toggleOrientation}>Vertical</button>
                    </div>            </div>
        </div>
    );
}

