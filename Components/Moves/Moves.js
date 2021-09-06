import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import COL from "../Colors";

export default function Moves() {
  const moves = useSelector((state) => state.moves);

  return (
    <>
      <View style={styles.move}>
        <Text
          style={{ fontSize: 20, color: COL.Text_COLOR, textAlign: "center" }}
        >
          <Text style={{ fontSize: 24, color: COL.Text_COLOR }}>{moves}</Text>{" "}
          moves made.
        </Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  move: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COL.Board_BG_COLOR,
    borderTopWidth: 1,
    borderColor: COL.Section_Border_COLOR,
  },
});
