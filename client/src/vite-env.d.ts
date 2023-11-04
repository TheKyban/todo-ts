/// <reference types="vite/client" />
interface User {
    name: string;
    email: string;
}
interface AuthState {
    isAuthenticated: boolean;
    user: User;
}

interface SignupType {
    name: string;
    email: string;
    password: string;
}

type LoginType = Pick<Signup,"email" | "password">;
