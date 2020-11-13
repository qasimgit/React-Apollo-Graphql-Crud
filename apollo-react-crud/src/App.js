import "./App.css";
import { NavbarApp } from "./components/Navbar";
import { UsersTable } from "./components/UsersTable";
import { AddUser } from "./components/AddUser";
import { ApolloProvider } from "@apollo/client";
import client from "./gqp_config/gql_config";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Switch,
} from "react-router-dom";

function App() {
  return (
    <ApolloProvider client={client}>
      <div>
        <Router>
          <NavbarApp />
          <Switch>
            <Route exact path="/" component={UsersTable} />
            <Route exact path="/createuser" component={AddUser} />
          </Switch>
        </Router>
      </div>
    </ApolloProvider>
  );
}

export default App;
