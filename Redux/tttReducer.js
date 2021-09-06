// Borad Actions
const UPDATEBOARD = "UPDATEBOARD";
const UPDATEBOARD4X4 = "UPDATEBOARD4X4";
const UPDATEBOARD5X5 = "UPDATEBOARD5X5";
const RESETBOARD = "RESETBOARD";
const RESETSCORE = "RESETSCORE";
const PLAYER1SCORE = "PLAYER1SCORE";
const PLAYER2SCORE = "PLAYER2SCORE";

export const updateBoard = (i, j) => ({
  type: UPDATEBOARD,
  payload: { i, j },
});

export const updateBoard4x4 = (ii, jj) => ({
  type: UPDATEBOARD4X4,
  payload: { ii, jj },
});

export const updateBoard5x5 = (iii, jjj) => ({
  type: UPDATEBOARD5X5,
  payload: { iii, jjj },
});

export const resetBoard = () => ({
  type: RESETBOARD,
});

export const resetScore = () => ({
  type: RESETSCORE,
});

export const player1Score = () => ({
  type: PLAYER1SCORE,
});

export const player2Score = () => ({
  type: PLAYER2SCORE,
});

// Players Actions
const PLAYER1WIN = "PLAYER1WIN";
const PLAYER2WIN = "PLAYER2WIN";
const TIE = "TIE";

export const player1Win = () => ({
  type: PLAYER1WIN,
});

export const player2Win = () => ({
  type: PLAYER2WIN,
});

export const tie = () => ({
  type: TIE,
});

// Symbols
export const X_Sym = "X";
export const O_Sym = "O";

// Initial state
const initialState = {
  moves: 0,
  board: [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ],
  board4x4: [
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
  ],
  board5x5: [
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
  ],
  turnSym: X_Sym,
  startSym: X_Sym,
  winner: undefined,
  player1Score: 0,
  player2Score: 0,
};

const boardReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATEBOARD:
      const { i, j } = action.payload;
      return {
        ...state,
        moves: state.moves + 1,
        board: state.board.map((item1, index1) =>
          index1 === i
            ? item1.map((item2, index2) =>
                index2 === j ? state.turnSym : item2
              )
            : item1
        ),
        turnSym: state.turnSym === X_Sym ? O_Sym : X_Sym,
      };
    case UPDATEBOARD4X4:
      const { ii, jj } = action.payload;
      return {
        ...state,
        moves: state.moves + 1,
        board4x4: state.board4x4.map((item1, index1) =>
          index1 === ii
            ? item1.map((item2, index2) =>
                index2 === jj ? state.turnSym : item2
              )
            : item1
        ),
        turnSym: state.turnSym === X_Sym ? O_Sym : X_Sym,
      };
    case UPDATEBOARD5X5:
      const { iii, jjj } = action.payload;
      return {
        ...state,
        moves: state.moves + 1,
        board5x5: state.board5x5.map((item1, index1) =>
          index1 === iii
            ? item1.map((item2, index2) =>
                index2 === jjj ? state.turnSym : item2
              )
            : item1
        ),
        turnSym: state.turnSym === X_Sym ? O_Sym : X_Sym,
      };
    case RESETBOARD:
      return {
        ...state,
        moves: 0,
        board: [
          [null, null, null],
          [null, null, null],
          [null, null, null],
        ],
        board4x4: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
        board5x5: [
          [null, null, null, null, null],
          [null, null, null, null, null],
          [null, null, null, null, null],
          [null, null, null, null, null],
          [null, null, null, null, null],
        ],
        turnSym: state.startSym === X_Sym ? O_Sym : X_Sym,
        startSym: state.startSym === X_Sym ? O_Sym : X_Sym,
        winner: undefined,
      };
    case RESETSCORE:
      return {
        ...state,
        moves: 0,
        board: [
          [null, null, null],
          [null, null, null],
          [null, null, null],
        ],
        board4x4: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
        board5x5: [
          [null, null, null, null, null],
          [null, null, null, null, null],
          [null, null, null, null, null],
          [null, null, null, null, null],
          [null, null, null, null, null],
        ],
        startSym: X_Sym,
        turnSym: X_Sym,
        winner: undefined,
        player1Score: 0,
        player2Score: 0,
      };
    case PLAYER1SCORE:
      return {
        ...state,
        player1Score: state.player1Score + 1,
      };
    case PLAYER2SCORE:
      return {
        ...state,
        player2Score: state.player2Score + 1,
      };
    case PLAYER1WIN:
      return {
        ...state,
        winner: "Player 1 wins.",
      };
    case PLAYER2WIN:
      return {
        ...state,
        winner: "Player 2 wins.",
      };
    case TIE:
      return {
        ...state,
        winner: "It's a tie.",
      };
    default:
      return state;
  }
};

export default boardReducer;
