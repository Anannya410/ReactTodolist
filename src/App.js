import logo from "./logo.svg";
import "./App.css";
import Header from "./MyComponents/Header.js";
import Todos from "./MyComponents/Todos.js";
import Footer from "./MyComponents/Footer.js";

function App() {
  let myvariable = 345;
  return (
    <>
      <Header  title="My Todo List"/>
      <Todos />
      <Footer />
    </>
  );
}

export default App;
