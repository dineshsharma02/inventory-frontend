import ReactDOM from "react-dom";
import App from "./App";
import {FC} from 'react';
import StoreProvider from "./utils/store";
import { Route } from "react-router-dom";
import Home from "./pages/Home";

ReactDOM.render(<StoreProvider><App/></StoreProvider>, document.getElementById('root'))