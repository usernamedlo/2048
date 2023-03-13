import React, { useState, useEffect } from "react";
import Grid from "./Grid";

function Game() {
  // Créer un tableau de 4x4 pour stocker les valeurs de chaque cellule dans la grille
  const [grid, setGrid] = useState([
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ]);

  const [score, setScore] = useState(0); // Initialisation de l'état du score

  const [currentGrid, setCurrentGrid] = useState(grid); // Initialisation de l'état de la grille

  // Fonction pour générer une nouvelle cellule aléatoire dans la grille
  const generateNewCell = () => {
    const emptyCells = []; // Tableau pour stocker les positions des cellules vides

    // Boucle à travers la grille pour trouver les positions des cellules vides
    for (let i = 0; i < currentGrid.length; i++) {
      for (let j = 0; j < currentGrid[i].length; j++) {
        if (currentGrid[i][j] === 0) {
          emptyCells.push([i, j]); // Ajout de la position de la cellule vide au tableau
        }
      }
    }

    // Génération d'un nombre aléatoire compris entre 0 et le nombre de cellules vides disponibles
    const randomIndex = Math.floor(Math.random() * emptyCells.length);

    // Récupération d'une position aléatoire dans le tableau des cellules vides
    const [rowIndex, cellIndex] = emptyCells[randomIndex];

    // Création d'une copie de la grille actuelle
    const newGrid = [...currentGrid];

    // Assignation de la valeur 2 à la position aléatoire dans la grille
    newGrid[rowIndex][cellIndex] = Math.random() < 0.5 ? 2 : 4;

    // Mise à jour de l'état de la grille
    setCurrentGrid(newGrid);
  };

  // Fonction pour calculer le score et mettre à jour l'état du score
  const calculateScore = (mergedValue) => {
    setScore(score + mergedValue);
  };

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
      } else {
        return;
      }
      generateNewCell();
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
        for (let col = 0; col < 4; col++) {
          let merged = false;
          for (let row = 2; row >= 0; row--) {
            if (newGrid[row][col] !== 0) {
              for (let i = row; i < 3; i++) {
                if (
                  newGrid[i + 1][col] === 0 ||
                  (newGrid[i + 1][col] === newGrid[i][col] && !merged)
                ) {
                  if (newGrid[i + 1][col] === newGrid[i][col]) {
                    merged = true;
                    newGrid[i + 1][col] *= 2;
                  } else {
                    newGrid[i + 1][col] = newGrid[i][col];
                  }
                  newGrid[i][col] = 0;
                }
              }
            }
          }
        }
        break;
      case "left":
        for (let col = 1; col < 4; col++) {
          let merged = false;
          for (let row = 0; row < 4; row++) {
            if (newGrid[row][col] !== 0) {
              for (let i = col; i > 0; i--) {
                if (
                  newGrid[row][i - 1] === 0 ||
                  (newGrid[row][i - 1] === newGrid[row][i] && !merged)
                ) {
                  if (newGrid[row][i - 1] === newGrid[row][i]) {
                    merged = true;
                    newGrid[row][i - 1] *= 2;
                  } else {
                    newGrid[row][i - 1] = newGrid[row][i];
                  }
                  newGrid[row][i] = 0;
                }
              }
              merged = false;
            }
          }
        }
        break;
      case "right":
        for (let col = 2; col >= 0; col--) {
          let merged = false;
          for (let row = 0; row < 4; row++) {
            if (newGrid[row][col] !== 0) {
              for (let i = col; i < 3; i++) {
                if (
                  newGrid[row][i + 1] === 0 ||
                  (newGrid[row][i + 1] === newGrid[row][i] && !merged)
                ) {
                  if (newGrid[row][i + 1] === newGrid[row][i]) {
                    merged = true;
                    newGrid[row][i + 1] *= 2;
                  } else {
                    newGrid[row][i + 1] = newGrid[row][i];
                  }
                  newGrid[row][i] = 0;
                }
              }
              merged = false;
            }
          }
        }
        break;
      default:
        break;
    }
    setGrid(newGrid);
  };

  return (
    <div>
      <h1>2048</h1>
      <div>Score: {score}</div> {/* Affichage du score */}
      <Grid grid={grid} />
    </div>
  );
}

export default Game;
