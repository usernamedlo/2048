import React, { useState, useEffect } from "react";
import Grid from "./Grid";

function Game() {
  // Créer un tableau de 4x4 pour stocker les valeurs de chaque cellule dans la grille
  const [grid, setGrid] = useState([
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ]);

  // Ajouter des écouteurs d'événements de touche de direction pour déplacer les cellules dans la grille
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowUp") {
        moveCells("up");
      } else if (event.key === "ArrowDown") {
        moveCells("down");
      } else if (event.key === "ArrowLeft") {
        moveCells("left");
      } else if (event.key === "ArrowRight") {
        moveCells("right");
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Fonction pour déplacer les cellules dans la grille
  const moveCells = (direction) => {
    let newGrid = [...grid];

    // Déplacer les cellules dans la direction appropriée
    switch (direction) {
      case "up":
        for (let col = 0; col < 4; col++) {
          let merged = false;
          for (let row = 1; row < 4; row++) {
            if (newGrid[row][col] !== 0) {
              for (let i = row; i > 0; i--) {
                if (
                  newGrid[i - 1][col] === 0 ||
                  (newGrid[i - 1][col] === newGrid[i][col] && !merged)
                ) {
                  if (newGrid[i - 1][col] === newGrid[i][col]) {
                    merged = true;
                    newGrid[i - 1][col] *= 2;
                  } else {
                    newGrid[i - 1][col] = newGrid[i][col];
                  }
                  newGrid[i][col] = 0;
                }
              }
              merged = false;
            }
          }
        }
        break;
      case "down":
        // Déplacer les cellules vers le bas
        // ...
        break;
      case "left":
        // Déplacer les cellules vers la gauche
        // ...
        break;
      case "right":
        // Déplacer les cellules vers la droite
        // ...
        break;
      default:
        break;
    }

    setGrid(newGrid);
  };

  return (
    <div>
      <h1>2048</h1>
      <Grid grid={grid} /> {/* Affichage de la grille avec le tableau grid comme propriété */}
      {/* Ajout d'autres éléments pour le jeu, comme le score et les boutons */}
    </div>
  );
}

export default Game;
