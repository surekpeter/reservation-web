import React, { useEffect } from "react";
import {AppEnv} from "@consuri/core-services";
import {ErrorAlert, Spinner} from "@consuri/core-ui-components";
import {useAuth} from "../hooks";
import { AuthProvider } from "react-oidc-context";
import { useAuth as useAuthOidc, useAutoSignin } from "react-oidc-context";

const oidcConfig = {
    authority: `${AppEnv.KEYCLOAK_URL}/realms/reservation_system`,
    client_id: 'reservaation-web',
    redirect_uri: 'http://localhost:3001', //window.location.origin,
    response_type: "code",
    scope: "openid profile email",
};


const SecuredPageContent = ({logout, children}: { logout: () => void, children: React.ReactNode }) => {


    const authRequest = useAuth();

    if (authRequest.isLoading) return <Spinner/>;
    if (authRequest.status === 401) return <ErrorAlert errorText={'Can not resolve current user data'}/>;
    return <>
        <button onClick={logout}>Logout</button>
        {children}
    </>
}

const AuthLoginPageContent = ({children}: { children: React.ReactNode }) => {
    // If you provide no signinMethod at all, the default is signinRedirect
    const { isLoading, isAuthenticated, error } = useAutoSignin({signinMethod: "signinRedirect"});
    const auth = useAuthOidc();


    if (auth.isLoading) {
        return <Spinner/>
    }

    if (auth.error) {
        return <div>Oops... {auth.error.message}</div>;
    }

    const logout = () => auth.removeUser();
    // const register = () => keycloak.register();
    // const forgotPassword = () => keycloak.accountManagement();

    return <div style={{padding: 20}}>
        {!auth.isAuthenticated ? (
            <>
                <h2>Welcome, please sign in</h2>
                <button onClick={() => void auth.signinRedirect()}>Login</button>
                {/*<button onClick={register}>Register</button>*/}
                {/*<button onClick={forgotPassword}>Forgot password?</button>*/}
            </>
        ) : (
            <SecuredPageContent logout={logout}>
                {children}
            </SecuredPageContent>
        )}
    </div>
}

const SecuredPageWrapper = ({children}: { children: React.ReactNode }) => {
    return <AuthProvider {...oidcConfig}>
        <AuthLoginPageContent>
            {children}
        </AuthLoginPageContent>
    </AuthProvider>
}

export default SecuredPageWrapper
