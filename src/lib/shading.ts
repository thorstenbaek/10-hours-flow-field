import Vector2 from "./vector2";

export function fade(t: number): number {
    return 6 * (t ** 5) - 15 * (t ** 4) + 10 * (t ** 3);
}

export function lerp(v0: number, v1: number, t: number): number {
    const max = Math.max(v0, v1);
    const min = Math.min(v0, v1);

    const before = `${v0}/${v1}`;
    const after = `${min}/${max}`;
    
    if (before !== after) {
        t = 1 - t;
    }

    return (max - min) * t + min;
}

export function getRandomGradientVectors(width: number, height: number, gridSize: number): Array<Array<Vector2>> {
    const possibleGradientVectors = [
        new Vector2(1, 1),
        new Vector2(-1, 1),
        new Vector2(1, -1),
        new Vector2(-1, -1),
      ]
    
      // + 1 because we need two vectors per grid cell.
      const gridCellsX = Math.ceil(width / gridSize) + 1
      const gridCellsY = Math.ceil(height / gridSize) + 1
    
      const gridCells: Array<Array<Vector2>> = []
    
      for (let y = 0; y < gridCellsY; y++) {
        gridCells[y] = []
        for (let x = 0; x < gridCellsX; x++) {
          const gradientVector: Vector2 = possibleGradientVectors[
            Math.floor(Math.random() * 3)
          ]
    
          gridCells[y].push(gradientVector)
        }
      }
    
      return gridCells
}