import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";

export default function Moves() {
  const moves = useSelector((state) => state.moves);

  return (
    <>
      <View style={styles.move}>
        <Text style={{ fontSize: 20, color: "white", textAlign: "center" }}>
          <Text style={{ fontSize: 24, color: "white" }}>{moves}</Text> moves
          made.
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
    backgroundColor: "#e31414",
    borderTopWidth: 1,
    borderColor: "white",
  },
});
