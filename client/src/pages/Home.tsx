import { useState } from "react";
import Login from "../components/Login";
import Signup from "../components/Signup";

const Home = () => {
    const [page, setPage] = useState<String>("login");
    return (
        <div className="home">
            <div className="formWrapper">
                <div className="home_btns">
                    <button
                        className="home_btn"
                        onClick={() => setPage("login")}
                    >
                        Login
                    </button>
                    <button
                        className="home_btn"
                        onClick={() => setPage("signup")}
                    >
                        Signup
                    </button>
                </div>

                <div>{page === "login" ? <Login /> : <Signup />}</div>
            </div>
        </div>
    );
};

export default Home;
