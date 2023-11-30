import "./Spinner.css";

export const Spinner = () => {
    return (
        <>
            <div className="message_spinner">
                <div className="lds-ring">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <h3>¡La aplicación esta cargando, espera un momento..!</h3>
            </div>
        </>
    )
}
