import React from "react";
import {Button} from "react-bootstrap";

const LoginPage: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
            <div className="p-6 bg-white rounded-2xl shadow-md text-center">
                <h1 className="text-2xl font-semibold mb-6 text-gray-800">
                    Welcome to My App
                </h1>
                <Button onClick={() => {
                    window.location.href = "/oauth2/authorization/google"
                }}>Login</Button>
                <p className="mt-4 text-sm text-gray-500">
                    Sign in securely with your Google account.
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
