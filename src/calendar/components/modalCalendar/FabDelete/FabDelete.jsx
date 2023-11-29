import Swal from "sweetalert2/dist/sweetalert2.all";
import { useCalendarStore } from "../../../../hooks";
import "./FabDelete.css";

export const FabDelete = () => {

    const { startDeletingEvent, hasEventSelected } = useCalendarStore();

    const handleClickDelete = () => {
        Swal.fire({
            title: "Eliminar cita?",
            text: "",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Eliminar",
            cancelButtonText: "Cancelar"

        }).then((result) => {
            if (result.isConfirmed) {
                startDeletingEvent();

                Swal.fire({
                    title: "KingWash",
                    text: "Cita eliminar correctamente",
                    icon: "success"
                });
            }
        });
    }
    return (
        <button
            className="btn btn-danger fab-danger"
            onClick={handleClickDelete}
            style={{
                display: hasEventSelected ? "" : "none"
            }}
        >
            <i className="fas fa-trash-alt"></i>
        </button>
    )
}
