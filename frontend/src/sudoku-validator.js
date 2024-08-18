const validateMove = (board, posLine, posCol, value) => {
    const verifyCol = () => {
        for (let line = 0; line < 9; line++) {
            if (board[line][posCol] == value) {
                return false;
            }
        }
        return true;
    }
  
    const verifyLine = () => {
        for (let col = 0; col < 9; col++) {
            if (board[posLine][col] == value) {
                return false;
            }
        }
        return true;
    }

    const verifyQuadrant = () => {
        const quadrantStartLine = Math.floor(posLine / 3) * 3;
        const quadrantStartCol = Math.floor(posCol / 3) * 3;
        
        for (let i = quadrantStartLine; i < quadrantStartLine + 3; i++) {
            for (let j = quadrantStartCol; j < quadrantStartCol + 3; j++) {
                if (board[i][j] == value) {
                    return false;
                }
            }
        }
        return true;
    }
  
    if (!verifyCol() || !verifyLine() || !verifyQuadrant()) {
        return false;
    }
    return true;
}

export default validateMove;