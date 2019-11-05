import React from "react";
import { ConnectedRouter } from "connected-react-router";
import { History } from "history";
import routes from "./routes";
import Header from "./components/Header/Header";

interface AppProps {
  history: History;
}

const App = ({ history }: AppProps) => {
  return (
    <div className="app">
      <Header />
      <ConnectedRouter history={history}>{routes}</ConnectedRouter>
    </div>
  );
};

export default App;
