import React from "react";
import {useAuth} from "../hooks/useAuth";
import {Spinner} from "@consuri/core-ui-components";
import LoginPage from "../pages/LoginPage";


const SecuredPageContent = ({children}: { children: React.ReactNode }) => {
    const authRequest = useAuth();
    if (authRequest.isLoading) return <Spinner/>;
    if (authRequest.status === 401) return <LoginPage/>;

    return children;
}

const SecuredPageWrapper = ({children}: { children: React.ReactNode }) => {
    return <SecuredPageContent>
        {children}
    </SecuredPageContent>
}


export default SecuredPageWrapper
