import { addHours } from "date-fns";
import { useCalendarStore, useUiStore } from "../../../../hooks";
import "./FabAddNew.css";

export const FabAddNew = () => {

    const { openDateModal } = useUiStore();
    const { setActiveEvent } = useCalendarStore();
    const handleClickNew = () => {

        //! TODO:VOY POR AQUI 
        setActiveEvent(
            {
                service: "",
                client: "",
                start: new Date(),
                end: addHours(new Date(), 1)
            })
        openDateModal();
    }
    return (
        <button
            className="btn btn-primary fab"
            onClick={handleClickNew}
        >
            <i className="fas fa-plus"></i>
        </button>
    )
}
