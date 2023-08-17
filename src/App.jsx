import { Outlet } from "react-router-dom";
import HeaderComponent from "./components/common/HeaderComponent/HeaderComponent";
import Cart from "./components/common/Cart/Cart";
import { useState } from "react";
import { useSelector } from "react-redux";
import "./App.css";

function App() {
  const { isLogged } = useSelector((store) => store.auth);
  const [isCartVisible, setIsCartVisible] = useState(false);

  const handleCartVisible = () => {
    setIsCartVisible(!isCartVisible);
  };

  return (
    <div>
      <header className="app__header">
        <div style={{ position: "relative" }}>
          <HeaderComponent
            handleCartVisible={handleCartVisible}
            isCartVisible={isCartVisible}
          />
        </div>
        {isLogged && <Cart isCartVisible={isCartVisible} />}
      </header>
      <main className="app__main ">
        <Outlet />
      </main>
      <footer>
        <div></div>
      </footer>
    </div>
  );
}

export default App;
