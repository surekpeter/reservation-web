import React from "react";
import {ErrorAlert, Spinner} from "@consuri/core-ui-components";
import {useAuth} from "../hooks";
import {ReactKeycloakProvider, useKeycloak} from "@react-keycloak/web";
import Keycloak from "keycloak-js";
import {AppEnv} from "@consuri/core-services";

const keycloak = new Keycloak({
    url: AppEnv.KEYCLOAK_URL!!,
    realm: 'reservation_system',
    clientId: 'reservation-web'
});

const SecuredPageContent = ({logout, children}: { logout: () => void, children: React.ReactNode }) => {

    const authRequest = useAuth();

    if (authRequest.isLoading) return <Spinner/>;
    if (authRequest.status === 401) return <ErrorAlert errorText={'Can not resolve current user data'}/>;
    return <>
        <h2>Hello</h2>
        <button onClick={logout}>Logout</button>
        {children}
    </>
}

const AuthLoginPageContent = ({children}: { children: React.ReactNode }) => {

    const {keycloak, initialized} = useKeycloak()

    const login = () => keycloak.login();
    const loginWithGoogle = () => keycloak.login({idpHint: 'google'});
    const logout = () => keycloak.logout({redirectUri: window.location.origin});
    const register = () => keycloak.register();
    const forgotPassword = () => keycloak.accountManagement();

    if (!initialized) return <Spinner/>;

    return <div style={{padding: 20}}>
        {!keycloak.authenticated ? (
            <>
                <h2>Welcome, please sign in</h2>
                <button onClick={login}>Login</button>
                <button onClick={loginWithGoogle}>Google</button>
                <button onClick={register}>Register</button>
                <button onClick={forgotPassword}>Forgot password?</button>
            </>
        ) : (
            <SecuredPageContent logout={logout}>
                {children}
            </SecuredPageContent>
        )}
    </div>
}

const SecuredPageWrapper = ({children}: { children: React.ReactNode }) => {
    return <ReactKeycloakProvider
        authClient={keycloak}
        initOptions={{onLoad: 'check-sso', pkceMethod: 'S256'}}
    >
        <AuthLoginPageContent>
            {children}
        </AuthLoginPageContent>
    </ReactKeycloakProvider>
}

export default SecuredPageWrapper
