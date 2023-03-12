import React, { useState, useEffect } from "react";

function Grid(props) {
  const { grid } = props; // Récupération de la propriété grid
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
    newGrid[rowIndex][cellIndex] = 2;

    // Mise à jour de l'état de la grille
    setCurrentGrid(newGrid);
  };

  useEffect(() => {
    generateNewCell(); // Appel de la fonction generateNewCell au chargement du composant
  }, []);

  return (
    <div className="grid-container">
      {currentGrid.map((row, rowIndex) => {
        return (
          <div className="grid-row" key={rowIndex}>
            {row.map((cell, cellIndex) => {
              return (
                <div className="grid-cell" key={cellIndex}>
                  {cell !== 0 ? cell : ""} {/* Affiche le nombre si la cellule n'est pas vide */}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export default Grid;
