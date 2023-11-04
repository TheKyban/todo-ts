import { ChangeEvent, FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAuth } from "../store/slice/authSlice";
import { storeType } from "../store/store";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const dispatch = useDispatch();
    const auth = useSelector<storeType>((state) => state.auth);
    const navigate = useNavigate();
    const [user, setUser] = useState<LoginType>({
        email: "",
        password: "",
    });
    const submitHandler = async (e: FormEvent) => {
        e.preventDefault();
        if (!user.email || !user.password) return;
        const config: RequestInit = {
            method: "POST",
            body: JSON.stringify(user),
            credentials: "include",
            headers: {
                "content-type": "application/json",
            },
        };
        const data = await fetch(
            `${import.meta.env.VITE_ENDPOINT}/user/login`,
            config
        );

        const json = await data.json();
        console.log(json);
        if (json.success) {
            dispatch(setAuth(json?.user));
            navigate("/todos");
        }
    };
    const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const name: string = e.target.name;
        const value: string = e.target.value;
        setUser((prev) => ({ ...prev, [name]: value }));
    };
    return (
        <div className="login">
            <h3>Login</h3>
            <form onSubmit={submitHandler}>
                <input
                    name="email"
                    type="email"
                    placeholder="Enter Email"
                    onChange={changeHandler}
                    value={user.email}
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Enter Password"
                    onChange={changeHandler}
                    value={user.password}
                />
                <button>Submit</button>
            </form>
        </div>
    );
};

export default Login;
