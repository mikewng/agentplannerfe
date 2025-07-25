import React, { createContext, useState, ReactNode, useContext } from "react";
import axios from 'axios';

interface AuthContextType {
    isAuthenticated: boolean;
    loginCalendar: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(
    undefined
);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const loginCalendar = async () => {
        try {
            const { data } = await axios.get('http://localhost:3001/calendarlogin');
            const authUrl = data.value;

            const popup = window.open(authUrl, 'CalendarLogin', 'width=500,height=600');

            const interval = setInterval(() => {
                if (!popup || popup.closed) {
                    clearInterval(interval);
                    axios.get('http://localhost:3001/apitest').then(res => {
                        console.log("what is res", res)
                        setIsAuthenticated(res ? true : false);
                    });
                }
            }, 500);
        } catch (err) {
            console.error('Error during login:', err);
        }
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, loginCalendar }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within a AuthProvider");
    return context;
};
