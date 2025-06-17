'use client'
import Loading from "@/app/loading";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ReactNode, useContext, useEffect, useState } from "react";
import { createContext } from "react";
interface User {
    _id?: string;
    email?: string;
    name?: string;
    avatar: string;
}
interface UserContextType {
    email?: string;
    user?: User | null;
    loading: boolean;
    error?: string | null;
    logOut: () => void;
    setToken: React.Dispatch<React.SetStateAction<string | null>>;
}
const AuthContext = createContext<UserContextType | undefined>(undefined);
export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [token, setToken] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    useEffect(() => {

        if (typeof window !== 'undefined') {
            const storedToken = sessionStorage.getItem('token');
            // setToken(storedToken);

            if (!storedToken) {
                setLoading(false);
                return;
            }
            // Fetch user for stay logged in
            const fetchUser = async () => {
                try {
                    setLoading(true);
                    const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/user-data`, {
                        headers: {
                            authorization: `Bearer ${storedToken}`,
                        }
                    }
                    );
                    if (!response) {
                        return
                    }
                    if (response?.data?.user) {
                        setUser(response.data.user);
                    } else {
                        setError('User data not found');
                    }
                } catch (err) {
                    setError(`Error fetching user data: ${err}`);
                } finally {
                    setLoading(false);
                }
            };

            fetchUser();
        }
    }, [token]); // Run on mount and when token changes

    // Logout and redirect to login page
    const logOut = () => {
        sessionStorage.removeItem('token');
        setUser(null);
        router.replace('/login');
    };
    return (
        <AuthContext.Provider value={{ user, loading, error, logOut, setToken }}>
            {loading ? <div><Loading /></div> : error ? <div>{error}</div> : children}
        </AuthContext.Provider>
    );
};

// Custom hook to access the context to all over site
export const useAuth = (): UserContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('Failed to process......');
    }
    return context;
};