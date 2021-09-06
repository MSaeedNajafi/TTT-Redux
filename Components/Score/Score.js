import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";

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
    backgroundColor: "black",
    borderTopWidth: 1,
    borderColor: "white",
  },
  scoreText: {
    fontSize: 24,
    textTransform: "uppercase",
    color: "white",
    fontWeight: "bold",
  },
  player: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
    flexDirection: "row",
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
  },
  playerText: { flex: 1, alignItems: "center", justifyContent: "center" },
  playerScore: {
    fontSize: 24,
    textTransform: "uppercase",
    backgroundColor: "#e01016",
    padding: 10,
    borderColor: "white",
    borderWidth: 2,
    color: "white",
  },
});
