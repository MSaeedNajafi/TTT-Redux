import React, { useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import {
  updateBoard,
  updateBoard4x4,
  updateBoard5x5,
  player1Score,
  player2Score,
  tie,
  player1Win,
  player2Win,
  X_Sym,
  O_Sym,
} from "../../tttReducer";

const generateBoard = (mapData, updateBoard) => {
  const board = [];
  for (let i = 0; i < mapData.length; i++) {
    const rowContent = [];
    const row = mapData[i];
    for (let j = 0; j < row.length; j++) {
      rowContent.push(
        <TouchableOpacity
          style={[
            styles.cell,
            {
              backgroundColor: mapData[i][j]
                ? mapData[i][j] === X_Sym
                  ? "#ffdb00"
                  : "#7e9acf"
                : "#7b7b7b",
              borderTopLeftRadius: i === 0 && j === 0 ? 5 : 0,
              borderTopRightRadius: i === 0 && j === row.length - 1 ? 5 : 0,
              borderBottomLeftRadius: i === row.length - 1 && j === 0 ? 5 : 0,
              borderBottomRightRadius:
                i === row.length - 1 && j === row.length - 1 ? 5 : 0,
              width:
                mapData.length === 3 ? 100 : mapData.length === 4 ? 75 : 60,
              height:
                mapData.length === 3 ? 100 : mapData.length === 4 ? 75 : 60,
            },
          ]}
          key={`cellID[${i}][${j}]`}
          onPress={() => {
            updateBoard(i, j);
          }}
          disabled={mapData[i][j] ? true : false}
        >
          <Text style={styles.cellText}>{mapData[i][j]}</Text>
        </TouchableOpacity>
      );
    }
    board.push(
      <View style={styles.row} key={`rowID_[${i}]`}>
        {rowContent}
      </View>
    );
  }
  return board;
};

const getWinner = (board) => {
  let rows = [];
  let cols = [];
  let diagonals = [];
  for (let i = 0; i < board.length; i++) {
    rows.push([]);
    cols.push([]);
    if (i < 2) {
      diagonals.push([]);
    }
  }

  for (let i = 0; i < board.length; i++) {
    const row = board[i];
    for (let j = 0; j < row.length; j++) {
      rows[i][j] = board[i][j];
      cols[i][j] = board[j][i];
      if (i === j) {
        diagonals[0][i] = board[i][j];
      }
      if (i === Math.abs(j - (row.length - 1))) {
        diagonals[1][i] = board[i][j];
      }
    }
  }

  const allcombinations = rows.concat(cols).concat(diagonals);

  for (let i = 0; i < allcombinations.length; i++) {
    if (!allcombinations[i].includes(null)) {
      const combination = allcombinations[i];
      const isEqual = combination.every((item) => item === combination[0]);
      if (isEqual) {
        return combination[0];
      }
    }
  }
  return null;
};

export default function Board(props) {
  const dispatch = useDispatch();
  const gboard = useSelector((state) =>
    props.boardSize === "4x4"
      ? state.board4x4
      : props.boardSize === "5x5"
      ? state.board5x5
      : state.board
  );
  const turnSym = useSelector((state) => state.turnSym);
  const winner = useSelector((state) => state.winner);
  const moves = useSelector((state) => state.moves);

  useEffect(() => {
    const win = getWinner(gboard);
    if (win) {
      if (turnSym === X_Sym) {
        dispatch(player2Win());
        dispatch(player2Score());
      }
      if (turnSym === O_Sym) {
        dispatch(player1Win());
        dispatch(player1Score());
      }
    }
    if (!win && moves === gboard.length * gboard.length) {
      dispatch(tie());
    }
  }, [gboard]);

  return (
    <>
      <View style={styles.board}>
        {generateBoard(gboard, (i, j) => {
          if (winner) {
            return;
          }
          if (props.boardSize === "4x4") {
            dispatch(updateBoard4x4(i, j));
          } else if (props.boardSize === "3x3") {
            dispatch(updateBoard(i, j));
          } else if (props.boardSize === "5x5") {
            dispatch(updateBoard5x5(i, j));
          }
        })}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  board: {
    flex: 6,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e01016",
  },
  cell: {
    // width: 100,
    // height: 100,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "white",
    // margin: 1,
  },
  cellText: {
    fontSize: 24,
    fontWeight: "bold",
    // color: "white",
  },
  row: {
    flexDirection: "row",
  },
});
