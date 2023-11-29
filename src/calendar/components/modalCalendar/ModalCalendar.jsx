/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo, useState } from "react";
import Modal from "react-modal";
import "./ModalCalendar.css";
import { addHours, differenceInSeconds } from "date-fns";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from 'date-fns/locale/es';
import Swal from "sweetalert2/dist/sweetalert2.all"
import { useCalendarStore, useUiStore } from "../../../hooks";

registerLocale('es', es);
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

Modal.setAppElement('#root');

const formData = {
    service: "Barberia",
    client: "Lizandro Narvaez",
    start: new Date(),
    end: addHours(new Date(), 1)
}

export const ModalCalendar = () => {

    const { isDateModalOpen, closeDateModal } = useUiStore();
    const { activeEvent, startSavingEvent } = useCalendarStore();
    const [formValues, setFormValues] = useState(formData);
    const [formSubmit, setFormSubmit] = useState(false);

    const isEmpty = useMemo(() => {
        if (!formSubmit) return "";

        return (formValues.client.length > 0 ? "" : "is-invalid")
    }, [formValues.client, formSubmit])

    useEffect(() => {
        if (activeEvent !== null) setFormValues({ ...activeEvent })
    }, [activeEvent])

    const onInputChanged = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        })
    }

    const onDateChanged = (event, changing) => {
        setFormValues({
            ...formValues,
            [changing]: event
        })
    }
    const onCloseModal = () => closeDateModal();

    const onSumitForm = async (e) => {
        e.preventDefault();
        setFormSubmit(true);

        const difference = differenceInSeconds(formValues.end, formValues.start);

        if (isNaN(difference)) {
            Swal.fire({
                title: "Error",
                text: "Selecciona una fecha",
                icon: "error"
            });
            return
        }
        if (difference <= 0) {
            Swal.fire({
                title: "Error",
                text: "La fecha no puede ser anterior a la de inicio",
                icon: "error"
            });
            return
        }
        if (formValues.client.length <= 0 || formValues.service.length <= 0) {
            Swal.fire({
                title: "Faltan datos",
                text: `Ingresa el nombre del ${formValues.client.length <= 0 ? "cliente" : "servicio"}`,
                icon: "error"
            });
            return
        }
        // TODO: Enviar formulario al backend
        await startSavingEvent(formValues);
        closeDateModal();
        setFormSubmit(false);
    }
    return (
        <Modal
            isOpen={isDateModalOpen}
            onRequestClose={onCloseModal}
            style={customStyles}
            contentLabel="Example Modal"
            className="modal"
            overlayClassName="modal-fondo"
            closeTimeoutMS={200}
        >
            <h1> Registrar nueva cita </h1>
            <small id="emailHelp" className="form-text text-muted">Hora cita</small>

            <hr />
            <form className="container" onSubmit={onSumitForm}>

                <div className="form-group mb-2 d-grid">
                    <label>Fecha y hora inicio</label>
                    <DatePicker
                        selected={formValues.start}
                        className="form-control"
                        onChange={(e) => onDateChanged(e, "start")}
                        dateFormat="Pp"
                        showTimeSelect
                        locale="es"
                        timeCaption="Hora"
                    />
                </div>

                <div className="form-group mb-2 d-grid">
                    <label>Fecha y hora fin</label>
                    <DatePicker
                        minDate={formValues.start}
                        selected={formValues.end}
                        className="form-control"
                        onChange={(e) => onDateChanged(e, "end")}
                        dateFormat="Pp"
                        showTimeSelect
                        locale="es"
                        timeCaption="Hora"
                    />
                </div>
                <small id="emailHelp" className="form-text text-muted">Informacion servicio</small>

                <hr />
                <div className="form-group my-4">
                    <label>Nombre Cliente</label>
                    <input
                        type="text"
                        className={`form-control ${isEmpty}`}
                        placeholder="Nombre cliente"
                        rows="5"
                        name="client"
                        value={formValues.client}
                        onChange={onInputChanged}
                    />
                </div>
                <div className="form-group my-4">
                    <label>Servicio</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Título del servicio"
                        name="service"
                        autoComplete="off"
                        value={formValues.service}
                        onChange={onInputChanged}
                    />
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block mt-5"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>
            </form>
        </Modal>
    )
}
