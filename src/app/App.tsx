import { Suspense } from "react";
import "./styles/index.scss";
import { Routes, Route, Link } from "react-router-dom";
import { AboutPageAsync } from "pages/AboutPage/AboutPage.async";
import { MainPageAsync } from "pages/MainPage/MainPage.async";
import classNames from "helpers/classNames/classNames";
import { useTheme } from "app/provider/ThemeProvider";

const App = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <div className={classNames("app", {}, [theme])}>
            <button onClick={toggleTheme}>Theme</button>
            <Link to={"/"}>Главная</Link>
            <Link to={"/about"}>О себе</Link>
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route path="/about" element={<AboutPageAsync />} />
                    <Route path="/" element={<MainPageAsync />} />
                </Routes>
            </Suspense>
        </div>
    );
};

export default App;
