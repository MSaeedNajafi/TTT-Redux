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
          style={[
            styles.cell,
            {
              backgroundColor: mapData[i][j]
                ? mapData[i][j] === "x"
                  ? "#ffdb00"
                  : "#7e9acf"
                : "#7b7b7b",
              borderTopLeftRadius: i === 0 && j === 0 ? 5 : 0,
              borderTopRightRadius: i === 0 && j === row.length - 1 ? 5 : 0,
              borderBottomLeftRadius: i === row.length - 1 && j === 0 ? 5 : 0,
              borderBottomRightRadius:
                i === row.length - 1 && j === row.length - 1 ? 5 : 0,
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
  const [player1wins, setPlayer1Wins] = useState(0);
  const [player2wins, setPlayer2Wins] = useState(0);

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
            backgroundColor: "black",
            borderBottomColor: "white",
            borderBottomWidth: 1,
          }}
        >
          {!winner && (
            <Text style={{ fontSize: 24, color: "white" }}>
              {turnSym === X_Sym
                ? `It's Player 1's Turn: ${turnSym}`
                : `It's Player 2's Turn: ${turnSym}`}
            </Text>
          )}
          {winner && (
            <Text style={{ fontSize: 24, color: "white" }}>{winner}</Text>
          )}
        </View>
        <View
          style={{
            flex: 6,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#e01016",
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
              setWinner(
                turnSym === X_Sym ? `Player 1 wins.` : `Player 2 wins.`
              );
              setPlayer1Wins(turnSym === X_Sym ? player1wins + 1 : player1wins);
              setPlayer2Wins(turnSym === O_Sym ? player2wins + 1 : player2wins);
            }
            if (!win && count === gameMap.length * gameMap.length - 1) {
              setWinner("It's a tie.");
            }
          })}
        </View>
        <View
          style={{
            padding: 10,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "black",
            borderTopWidth: 1,
            borderColor: "white",
          }}
        >
          <Text
            style={{
              fontSize: 24,
              textTransform: "uppercase",
              color: "white",
              fontWeight: "bold",
            }}
          >
            Score
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "black",
            flexDirection: "row",
            paddingLeft: 10,
            paddingRight: 10,
            paddingBottom: 10,
          }}
        >
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <Text
              style={{
                fontSize: 24,
                textTransform: "uppercase",
                backgroundColor: "#e01016",
                padding: 10,
                borderColor: "white",
                borderWidth: 2,
                // borderRadius: 15,
                color: "white",
              }}
            >
              Player 1: {player1wins}
            </Text>
          </View>
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <Text
              style={{
                fontSize: 24,
                textTransform: "uppercase",
                backgroundColor: "#e01016",
                padding: 10,
                borderColor: "white",
                borderWidth: 2,
                color: "white",
              }}
            >
              Player 2: {player2wins}
            </Text>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#e31414",
            borderTopWidth: 1,
            borderColor: "white",
          }}
        >
          <Text style={{ fontSize: 20, color: "white", textAlign: "center" }}>
            <Text style={{ fontSize: 24, color: "white" }}>{count}</Text> moves
            made.
          </Text>
        </View>
        {winner && (
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
              borderTopWidth: 1,
              borderColor: "white",
              backgroundColor: "black",
            }}
          >
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                // backgroundColor: "cornsilk",
                borderRightColor: "white",
                borderRightWidth: 1,
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
                    textTransform: "uppercase",
                    color: "white",
                  }}
                >
                  Reset borad
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flex: 1,
                backgroundColor: "black",
                borderLeftColor: "white",
                borderLeftWidth: 1,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  setGameMap(gameBoard);
                  setTurnSym(X_Sym);
                  setCount(0);
                  setWinner(undefined);
                  setPlayer1Wins(0);
                  setPlayer2Wins(0);
                }}
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 24,
                    textTransform: "uppercase",
                    color: "white",
                  }}
                >
                  reset score
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
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
    width: gameBoard.length === 3 ? 100 : gameBoard.length === 4 ? 75 : 50,
    height: gameBoard.length === 3 ? 100 : gameBoard.length === 4 ? 75 : 50,
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
});
