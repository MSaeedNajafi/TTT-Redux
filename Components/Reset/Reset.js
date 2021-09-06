import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import { resetBoard, resetScore } from "../../tttReducer";

export default function Reset(props) {
  const dispatch = useDispatch();
  const winner = useSelector((state) => state.winner);

  return (
    <>
      {winner && (
        <View style={styles.winner}>
          <View
            style={[
              styles.button,
              { borderRightColor: "white", borderRightWidth: 1 },
            ]}
          >
            <TouchableOpacity
              style={styles.click}
              onPress={() => {
                dispatch(resetBoard());
              }}
            >
              <Text style={styles.clickText}>Reset borad</Text>
            </TouchableOpacity>
          </View>
          <View
            style={[
              styles.button,
              { borderRightColor: "white", borderRightWidth: 1 },
            ]}
          >
            <TouchableOpacity
              onPress={() => {
                dispatch(resetScore());
              }}
              style={styles.click}
            >
              <Text style={styles.clickText}>reset score</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.button}>
            <TouchableOpacity
              onPress={() => {
                props.makeFalse();
                dispatch(resetBoard());
                dispatch(resetScore());
              }}
              style={styles.click}
            >
              <Text style={styles.clickText}>Change Grid</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  winner: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
    flexDirection: "row",
    borderTopWidth: 1,
    borderColor: "white",
  },
  button: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  click: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  clickText: {
    // fontSize: 20,
    textTransform: "uppercase",
    color: "white",
    textAlign: "center",
  },
});
