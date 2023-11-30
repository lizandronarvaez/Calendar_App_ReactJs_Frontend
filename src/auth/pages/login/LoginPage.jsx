
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

    <div className="login_page">
      <div className='login_page-img'>
        <h1>Citas KingWash</h1>
        <img src="../../../../public/kingwash.png" alt="kigwash" />
      </div>
      <div className="login_page-form col-md-10 m-auto">
        <div className='login_page-form-header'>
          <img src="../../../../public/kingwash.png" alt="kingwash" />
          <h3>Lavadero KingWash</h3>
        </div>
        <hr />
        <div className='login_page-body'>
          <form onSubmit={submitLogin}>
            <div className="form-group mb-2">
              <input
                type="text"
                className="form-control py-3"
                placeholder="Correo"
                name='email'
                value={email}
                onChange={onInputChange}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control py-3"
                placeholder="Contraseña"
                name='password'
                value={password}
                onChange={onInputChange}
              />
            </div>
            <div className="d-grid gap-2">
              <input
                type="submit"
                className="btnSubmit py-3"
                value="Login"
              />
              <hr />
            </div>
          </form>
        </div>
      </div>

    </div>
  )
}
