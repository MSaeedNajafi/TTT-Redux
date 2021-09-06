import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import COL from "../Colors";

export default function Score() {
  const player1wins = useSelector((state) => state.player1Score);
  const player2wins = useSelector((state) => state.player2Score);

  return (
    <>
      <View style={styles.score}>
        <Text style={styles.scoreText}>Score</Text>
      </View>
      <View style={styles.player}>
        <View style={styles.playerText}>
          <Text style={styles.playerScore}>Player 1: {player1wins}</Text>
        </View>
        <View style={styles.playerText}>
          <Text style={styles.playerScore}>Player 2: {player2wins}</Text>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  score: {
    flex: 1,
    // padding: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COL.Score_BG_COLOR,
    borderTopWidth: 1,
    borderColor: COL.Section_Border_COLOR,
  },
  scoreText: {
    fontSize: 24,
    textTransform: "uppercase",
    color: COL.Text_COLOR,
    fontWeight: "bold",
  },
  player: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COL.Score_BG_COLOR,
    flexDirection: "row",
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
  },
  playerText: { flex: 1, alignItems: "center", justifyContent: "center" },
  playerScore: {
    fontSize: 24,
    textTransform: "uppercase",
    backgroundColor: COL.Board_BG_COLOR,
    padding: 10,
    borderColor: COL.Section_Border_COLOR,
    borderWidth: 2,
    color: COL.Text_COLOR,
  },
});
