import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import update from "react-addons-update";

const gameBoard = [
  // [null, null, null, null, null],
  // [null, null, null, null, null],
  // [null, null, null, null, null],
  // [null, null, null, null, null],
  // [null, null, null, null, null],
  // [null, null, null, null],
  // [null, null, null, null],
  // [null, null, null, null],
  // [null, null, null, null],
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const X_Sym = "x";
const O_Sym = "o";

const generateBoard = (mapData, updateBoard) => {
  const board = [];
  for (let i = 0; i < mapData.length; i++) {
    const rowContent = [];
    const row = mapData[i];
    for (let j = 0; j < row.length; j++) {
      rowContent.push(
        <TouchableOpacity
          style={styles.cell}
          key={`mapData[${i}][${j}]`}
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
      <View style={styles.row} key={`row[${i}]`}>
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
        // console.log(combination, i);
        return combination[0];
      }
    }
  }
  return null;
};

export default function App() {
  const [gameMap, setGameMap] = useState(gameBoard);
  const [turnSym, setTurnSym] = useState(X_Sym);
  const [startSym, stStartSym] = useState(X_Sym);
  const [count, setCount] = useState(0);
  const [winner, setWinner] = useState();

  const nextSym = () => {
    setTurnSym(turnSym === X_Sym ? O_Sym : X_Sym);
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {!winner && (
            <Text style={{ fontSize: 24 }}>
              {turnSym === X_Sym
                ? `It's Player 1's Turn: ${turnSym}`
                : `It's Player 2's Turn: ${turnSym}`}
            </Text>
          )}
          {winner && <Text style={{ fontSize: 24 }}>{winner}</Text>}
        </View>
        <View
          style={{
            flex: 6,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {generateBoard(gameMap, (i, j) => {
            if (winner) {
              return;
            }
            const newMap = update(gameMap, {
              [i]: {
                [j]: { $set: turnSym },
              },
            });
            setGameMap(newMap);
            nextSym();
            setCount(count + 1);
            const win = getWinner(newMap);
            if (win) {
              console.log(i, j);
              setWinner(
                turnSym === X_Sym ? `Player 1 wins.` : `Player 2 wins.`
              );
            }
            if (!win && count === gameMap.length * gameMap.length - 1) {
              setWinner("It's a tie.");
            }
          })}
        </View>

        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ fontSize: 20, textAlign: "center" }}>
            <Text style={{ fontSize: 24 }}>{count}</Text> moves made.
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
          }}
        >
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
              }}
              onPress={() => {
                setGameMap(gameBoard);
                // setTurnSym(X_Sym);
                stStartSym(startSym === X_Sym ? O_Sym : X_Sym);
                setTurnSym(startSym);
                setCount(0);
                setWinner(undefined);
              }}
            >
              <Text
                style={{
                  fontSize: 24,
                }}
              >
                Reset borad
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#345eef",
  },
  row: {
    flexDirection: "row",
  },
  cell: {
    width: 100,
    height: 100,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "black",
    // margin: 1,
  },
  cellText: {
    fontSize: 24,
    fontWeight: "bold",
    // color: "white",
  },
});
