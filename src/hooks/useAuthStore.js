import { useDispatch, useSelector } from "react-redux";
import { calendarApi } from "../api";
import { clearErrorMessage, onChecking, onLogin, onLogout, onLogoutCalendar } from "../store";
import Swal from "sweetalert2/dist/sweetalert2.all";

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
            if (!tokenStorage) return dispatch(onLogout());
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
        Swal.fire({
            title: "Cerrar sesión?",
            text: "¡Revisa guardar todo!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Confirmar",
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.clear();
                dispatch(onLogoutCalendar())
                dispatch(onLogout())
                Swal.fire({
                    title: "Sesión cerrada",
                    text: "¡Hasta pronto!",
                    icon: "success"
                });
            }
        });


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
