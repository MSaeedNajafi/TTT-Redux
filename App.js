import React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";

import TTT from "./TTT";
import boardReducer from "./tttReducer";

const store = createStore(boardReducer);

const App = () => {
  return (
    <Provider store={store}>
      <TTT />
    </Provider>
  );
};

export default App;
