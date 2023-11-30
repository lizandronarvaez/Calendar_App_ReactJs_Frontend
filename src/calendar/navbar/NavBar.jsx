import { useAuthStore } from "../../hooks"
import "./Navbar.css";
import KingWash from "../../../public/images/kingwash.png"
export const NavBar = () => {

    const { startLogout, user } = useAuthStore();

    return (
        <div className="nav">
            <span className="nav_title">
                <i className="fas fa-calendar-alt"></i>
                &nbsp;
                Gestión Cita KingWash
            </span>
            <img src={KingWash} alt="kingwash" />
            <button
                onClick={startLogout}
                className="nav_button"
            >
                <span>
                    {user}&nbsp;&nbsp;
                </span>
                <i className="fas fa-sign-out-alt"></i>
                <span className="text-white">&nbsp;Cerrar sesión</span>
            </button>
        </div>
    )
}
