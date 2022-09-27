import "./styles/index.scss";
import { Link } from "react-router-dom";
import classNames from "shared/lib/classNames/classNames";
import { useTheme } from "app/provider/ThemeProvider";
import { AppRouter } from "app/provider/router";

const App = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <div className={classNames("app", {}, [theme])}>
            <button onClick={toggleTheme}>Theme</button>
            <Link to={"/"}>Главная</Link>
            <Link to={"/about"}>О себе</Link>
            <AppRouter />
        </div>
    );
};

export default App;
