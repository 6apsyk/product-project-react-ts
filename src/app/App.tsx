import { Suspense } from "react";
import "./styles/index.scss";
import { Routes, Route, Link } from "react-router-dom";
import { AboutPage } from "pages/AboutPage";
import { MainPage } from "pages/MainPage";
import classNames from "shared/lib/classNames/classNames";
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
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/" element={<MainPage />} />
                </Routes>
            </Suspense>
        </div>
    );
};

export default App;
