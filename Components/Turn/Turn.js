import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";

import { X_Sym } from "../../Redux/tttReducer";
import COL from "../Colors";

export default function Turn() {
  const turnSym = useSelector((state) => state.turnSym);
  const winner = useSelector((state) => state.winner);

  return (
    <>
      <View style={styles.winner}>
        {!winner && (
          <Text style={{ fontSize: 24, color: COL.Text_COLOR }}>
            {turnSym === X_Sym
              ? `It's Player 1's Turn: ${turnSym}`
              : `It's Player 2's Turn: ${turnSym}`}
          </Text>
        )}
        {winner && (
          <Text style={{ fontSize: 24, color: COL.Text_COLOR }}>{winner}</Text>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  winner: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COL.Score_BG_COLOR,
    borderBottomColor: COL.Section_Border_COLOR,
    borderBottomWidth: 1,
  },
});
