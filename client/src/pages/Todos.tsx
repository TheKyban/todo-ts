import React from "react";
import isAuth from "../utils/isAuth";

const Todos = () => {
    return (
        <div className="todos">
            <h1>Todos</h1>
            <form>
                <input type="text" />
                <input type="text" />
                <button>Add</button>
            </form>
        </div>
    );
};

export default isAuth(Todos);
