/* eslint-disable no-unused-vars */
import Swal from "sweetalert2/dist/sweetalert2.all";
import { useAuthStore, useForm } from "../../../hooks";
import "./RegisterPage.css";
import { useEffect } from "react";

const registerFormFields = {
    fullname: "",
    email: "",
    password: "",
    passwordRepeat: ""
}
export const RegisterPage = () => {

    const { fullname, email, password, passwordRepeat, onInputChange, onResetForm } = useForm(registerFormFields);
    const { startRegister, errorMessage } = useAuthStore()

    const submitRegister = (e) => {
        e.preventDefault();
        if (password !== passwordRepeat) {
            Swal.fire(
                "Error en registro",
                "Las contraseñas no coinciden",
                "error"
            )
        }
        startRegister({ fullname, email, password })
        onResetForm({
            fullname: "",
            email: "",
            password: "",
            passwordRepeat: ""
        })
    }

    useEffect(() => {
        if (errorMessage !== undefined) {
            Swal.fire(
                "Error en el registro",
                errorMessage,
                "error"
            )
        }
    }, [errorMessage]);
    return (
        <div className="col-md-6 mx-5 mt-5 login-form-2">
            <h3>Registro</h3>
            <form onSubmit={submitRegister}>
                <div className="form-group mb-2">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Nombre"
                        name="fullname"
                        value={fullname}
                        onChange={onInputChange}
                    />
                </div>
                <div className="form-group mb-2">
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Correo"
                        name="email"
                        value={email}
                        onChange={onInputChange}

                    />
                </div>
                <div className="form-group mb-2">
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Contraseña"
                        name="password"
                        value={password}
                        onChange={onInputChange}

                    />
                </div>

                <div className="form-group mb-2">
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Repita la contraseña"
                        name="passwordRepeat"
                        value={passwordRepeat}
                        onChange={onInputChange}
                    />
                </div>

                <div className="d-grid gap-2">
                    <input
                        type="submit"
                        className="btnSubmit"
                        value="Crear cuenta" />
                </div>
            </form>
        </div>
    )
}
