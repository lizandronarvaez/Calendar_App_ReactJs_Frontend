import { useDispatch, useSelector } from "react-redux";
import { calendarApi } from "../api";
import { clearErrorMessage, onChecking, onLogin, onLogout, onLogoutCalendar } from "../store";

export const useAuthStore = () => {

    const dispatch = useDispatch()
    const { status, user, errorMessage } = useSelector(state => state.auth)

    const startLogin = async ({ email, password }) => {

        dispatch(onChecking());

        try {
            const data = await calendarApi.post("/auth/login", { email, password });
            const { fullname, token } = data.data.user;

            localStorage.setItem("token", token);
            localStorage.setItem("token-init-date", new Date().getTime());

            dispatch(onLogin(fullname))
        } catch (error) {
            dispatch(onLogout("Credenciales inválidas"));

            setTimeout(() => {
                dispatch(clearErrorMessage())
            }, 10)
        }
    }


    const startRegister = async ({ fullname, email, password }) => {

        dispatch(onChecking());

        try {
            const data = await calendarApi.post("/auth/register", { fullname, email, password })
            const { fullname: nameUser, token } = data.data.user;

            localStorage.setItem("token", token);
            localStorage.setItem("token-init-date", new Date().getTime());

            dispatch(onLogin(nameUser))
        } catch (error) {
            dispatch(onLogout(error.response.data?.message || " Hubo un error en el registro"));

            setTimeout(() => {
                dispatch(clearErrorMessage())
            }, 10)
        }
    }

    const checkAuthToken = async () => {
        const tokenStorage = localStorage.getItem("token");

        try {
            if (!tokenStorage) return dispatch(onLogout("La sesión expiró vuelva a autenticarse"));
            const data = await calendarApi.get("/auth/reset");
            const { fullname, token } = data.data;

            localStorage.setItem("token", token)
            localStorage.setItem("token-init-date", new Date().getTime());

            dispatch(onLogin(fullname))
        } catch (error) {
            localStorage.clear();
            console.log(error)
        }
    }

    const startLogout = () => {
        localStorage.clear();
        dispatch(onLogoutCalendar())
        dispatch(onLogout())
    }
    return {
        // * propiedades
        status,
        user,
        errorMessage,

        // * metodos
        startLogin,
        startRegister,
        checkAuthToken,
        startLogout
    }
}
