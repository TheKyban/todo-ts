import { useEffect } from "react";
import { useSelector } from "react-redux";
import { storeType } from "../store/store";
import { useNavigate } from "react-router-dom";

export default function isAuth(Component: any) {
    return function IsAuth(props: any) {
        const auth = useSelector<storeType>(
            (state) => state.auth.isAuthenticated
        );
        const navigate = useNavigate();

        useEffect(() => {
            if (!auth) {
                return navigate("/");
            }
        }, []);

        if (!auth) {
            return null;
        }

        return <Component {...props} />;
    };
}
