
import { useEffect } from 'react';
import { useAuthStore, useForm } from '../../../hooks';
import './LoginPage.css';
import Swal from 'sweetalert2/dist/sweetalert2.all';

const loginFormFields = {
  email: "",
  password: ""
}
export const LoginPage = () => {

  const { startLogin, errorMessage } = useAuthStore()
  const { email, password, formState, onInputChange, onResetForm } = useForm(loginFormFields);

  const submitLogin = (e) => {
    e.preventDefault();
    startLogin(formState)
    onResetForm({
      email: "",
      password: ""
    })
  }


  useEffect(() => {
    if (errorMessage !== undefined) {
      Swal.fire(
        "",
        errorMessage,
        "error"
      )
    }
  }, [errorMessage]);

  return (

    <div className="container login-container">

      <div className="col-md-10 m-auto mt-5 login-form-1">
        <h3>Login</h3>
        <form onSubmit={submitLogin}>
          <div className="form-group mb-2">
            <input
              type="text"
              className="form-control"
              placeholder="Correo"
              name='email'
              value={email}
              onChange={onInputChange}
            />
          </div>
          <div className="form-group mb-2">
            <input
              type="password"
              className="form-control"
              placeholder="Contraseña"
              name='password'
              value={password}
              onChange={onInputChange}
            />
          </div>
          <div className="d-grid gap-2">
            <input
              type="submit"
              className="btnSubmit"
              value="Login"
            />
          </div>
        </form>
      </div>

    </div>
  )
}
