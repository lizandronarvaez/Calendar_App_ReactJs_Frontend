import { useAuthStore } from "../../hooks"

export const NavBar = () => {

    // const dispatch=useDispatch()
    const { startLogout, user } = useAuthStore();

    return (
        <div className="navbar navbar-dark bg-dark mb-4 px-4">
            <span className="navbar-brand">
                <i className="fas fa-calendar-alt"></i>
                &nbsp;
                Gestión Cita KingWash
            </span>

            <button
                onClick={startLogout}
                className="btn btn-outline-danger"
            >
                <span className="text-white text-capitalize" >
                    {user}&nbsp;&nbsp;
                </span>
                <i className="fas fa-sign-out-alt"></i>
                <span className="text-white">&nbsp;Salir</span>
            </button>
        </div>
    )
}
