import React from "react";
import { StyleSheet, SafeAreaView } from "react-native";

import Score from "./Score/Score";
import Moves from "./Moves/Moves";
import Reset from "./Reset/Reset";
import Turn from "./Turn/Turn";
import Board from "./Board/Board";

export default function TTT(props) {
  return (
    <>
      <SafeAreaView style={styles.container}>
        <Turn />
        <Board boardSize={props.boardSize} />
        <Score />
        <Moves />
        <Reset makeFalse={props.makeFalse} />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
