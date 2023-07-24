import React, {  useEffect, useRef, useState } from 'react';
import '../styles/Board.css'
// Componente para un cuadro 
function BoardSquare({ isShip, shipSize, onClick, rowIndex, columnIndex, isRevealed  }) {
    const shipClass = isShip ? `ship-${shipSize}` : '';
    const content = isRevealed ? (isShip ? 'X' : '') : '';
  
    return (
      <div className={`square ${shipClass}`} onClick={isRevealed ? null : () => onClick(rowIndex, columnIndex)}>
        {content}
      </div>
    );
  }



export default function Board() {
    const isFirstRender = useRef(true);
    const [selectedShipSize, setSelectedShipSize] = useState(null);
    const [placedShips, setPlacedShips] = useState([]);
    const [isVertical, setIsVertical] = useState(false);
    const [revealedCells, setRevealedCells] = useState(new Array(10).fill(0).map(() => new Array(10).fill(false)));
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

    const [rivalBoardData, setRivalBoardData] = useState([
        // Inicializa el tablero del rival con todas las celdas vacías (valor 0)
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


    const generateRandomPosition = () => {
        return Math.floor(Math.random() * 10);
    };

    const generateRandomShips = () => {
        const updatedRivalBoard = [...rivalBoardData];
        let shipSize = 5; 
      
        while (shipSize >= 1) {
          let isValidPosition = false;
      
          while (!isValidPosition) {
            const isVertical = Math.random() < 0.5;
            const rowIndex = generateRandomPosition();
            const columnIndex = generateRandomPosition();
            isValidPosition = true;
      
            if (isVertical && rowIndex + shipSize > 10) {
              isValidPosition = false;
            } else if (!isVertical && columnIndex + shipSize > 10) {
              isValidPosition = false;
            }
      
            for (let i = 0; i < shipSize; i++) {
              const rowIndexToCheck = isVertical ? rowIndex + i : rowIndex;
              const columnIndexToCheck = isVertical ? columnIndex : columnIndex + i;
      
              if (
                rowIndexToCheck >= 0 &&
                rowIndexToCheck < 10 &&
                columnIndexToCheck >= 0 &&
                columnIndexToCheck < 10 &&
                updatedRivalBoard[rowIndexToCheck][columnIndexToCheck] !== 0
              ) {
                isValidPosition = false;
                break;
              }
            }
      
            if (isValidPosition) {
              for (let i = 0; i < shipSize; i++) {
                if (isVertical) {
                  updatedRivalBoard[rowIndex + i][columnIndex] = shipSize;
                } else {
                  updatedRivalBoard[rowIndex][columnIndex + i] = shipSize;
                }
              }
            }
          }
      
          shipSize--;
        }
      
        setRivalBoardData(updatedRivalBoard);
      };
      
    

      useEffect(() => {
        if (isFirstRender.current) {
          generateRandomShips();
          isFirstRender.current = false;
        }
      }, []);
      


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
            const updatedBoard = [...boardData];
            for (let i = 0; i < selectedShipSize; i++) {
                // Verifica que no haya un barco en las celdas 
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
            setPlacedShips([...placedShips, selectedShipSize]);
        } else {
            if (placedShips.includes(selectedShipSize)) {
                alert('Ya has colocado un barco de este tipo. Elige otro tipo de barco.');
            } else {
                alert('Primero debes seleccionar un tipo y tamaño de barco.');
            }
        }
    };
    const resetTable = () => {
        const emptyBoard = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ];
        setBoardData(emptyBoard);
        setPlacedShips([]);
        setSelectedShipSize(null);
        setIsVertical(false);
    }
    const toggleOrientation = () => {
        setIsVertical((prev) => !prev);
    };

    return (
        <>
            <div className='container'>
                <div className='board'>
                    {boardData.map((row, rowIndex) => {
                        return row.map((cell, columnIndex) => (
                            <BoardSquare key={`${rowIndex}-${columnIndex}`}
                                isShip={cell === 1 || cell === 2 || cell === 3 || cell === 4 || cell === 5}
                                shipSize={typeShip(cell)}
                                rowIndex={rowIndex}
                                columnIndex={columnIndex}
                                onClick={chooseBoat}
                                isRevealed={revealedCells[rowIndex][columnIndex]}

                            />
                        ));
                    })}
                </div>
                <div className='board'>
                    {rivalBoardData.map((row, rowIndex) => {
                        return row.map((cell, columnIndex) => (
                            <BoardSquare
                                key={`rival-${rowIndex}-${columnIndex}`}
                                isShip={cell === 1 || cell === 2 || cell === 3 || cell === 4 || cell === 5}
                                shipSize={typeShip(cell)}
                                rowIndex={rowIndex}
                                columnIndex={columnIndex}
                                onClick={()=>{console.log('hola')}}
                                isRevealed={revealedCells[rowIndex][columnIndex]}
                            />
                        ));
                    })}
                </div>
            </div>
            <div className='ship-selector-container'>
                <div className='ship-selector'>
                    <h3>Selecciona el tamaño del barco:</h3>
                    <button className='ship-1' onClick={() => setSelectedShipSize(1)}>Tamaño 1</button>
                    <button className='ship-2' onClick={() => setSelectedShipSize(2)}>Tamaño 2</button>
                    <button className='ship-3'onClick={() => setSelectedShipSize(3)}>Tamaño 3</button>
                    <button className='ship-4'onClick={() => setSelectedShipSize(4)}>Tamaño 4</button>
                    <button className='ship-5'onClick={() => setSelectedShipSize(5)}>Tamaño 5</button>
                </div>
                <div className='orientation-selector'>
                    <h3>Orientación del barco:</h3>
                    <button onClick={toggleOrientation}>Orientacion {isVertical ? 'Vertical' : 'Horizontal'}</button>
                </div>

            </div>
            <button className='reset'onClick={resetTable}>🔃</button>
        </>
    );
}

