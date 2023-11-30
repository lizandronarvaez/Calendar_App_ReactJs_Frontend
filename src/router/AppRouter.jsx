/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "../auth";
import { CalendarPage, Spinner } from "../calendar";
import { RegisterPage } from "../auth/pages/register/RegisterPage";
import { useAuthStore } from "../hooks";
import { useEffect } from "react";

export const AppRouter = () => {

    const { status, checkAuthToken } = useAuthStore();
    useEffect(() => {
        checkAuthToken();
    }, [])

    if (status === "checking") return (<Spinner />)
    return (

        <Routes>
            {
                (status == "not-authenticated")
                    ? (
                        <>
                            {/* <Route path="/auth/register" element={<RegisterPage />} /> */}
                            <Route path="/auth/*" element={<LoginPage />} />
                            <Route path="/*" element={<Navigate to="/auth/login" />} />
                        </>
                    )
                    : (
                        <>
                            <Route path="/" element={<CalendarPage />} />
                            <Route path="/*" element={<Navigate to="/" />} />
                        </>

                    )
            }


        </Routes>
    )
}
