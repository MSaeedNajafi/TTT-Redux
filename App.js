import React, { useState } from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";

import TTT from "./TTT";
import boardReducer from "./tttReducer";

const store = createStore(boardReducer);

const App = () => {
  const [boardSize, setBoardSize] = useState("");
  const [board, setBoard] = useState(false);

  function makeFalse() {
    setBoard(false);
  }

  return (
    <Provider store={store}>
      {!board && (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 24 }}>Choose your Board</Text>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                padding: 5,
              }}
            >
              <TouchableOpacity
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 20,
                  backgroundColor: "limegreen",
                  width: "100%",
                  padding: 20,
                  borderWidth: 2,
                  borderRadius: 5,
                }}
                onPress={() => {
                  setBoardSize("3x3"), setBoard(true);
                }}
              >
                <Text style={{ fontSize: 24 }}>3x3</Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                padding: 5,
              }}
            >
              <TouchableOpacity
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 20,
                  backgroundColor: "red",
                  width: "100%",
                  padding: 20,
                  borderWidth: 2,
                  borderRadius: 5,
                }}
                onPress={() => {
                  setBoardSize("4x4"), setBoard(true);
                }}
              >
                <Text style={{ fontSize: 24 }}>4x4</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}

      {board && <TTT boardSize={boardSize} makeFalse={makeFalse} />}
    </Provider>
  );
};

export default App;
