/* eslint-disable no-unused-vars */
import { useDispatch, useSelector } from "react-redux";
import { onAddNewEvent, onDeleteEvent, onLoadingEvents, onSetActiveEvent, onUpdateEvent } from "../store";
import calendarApi from "../api/calendarApi";
import { convertEventsToDate } from "../helpers";
import Swal from "sweetalert2/dist/sweetalert2.all";


export const useCalendarStore = () => {
    const dispatch = useDispatch();
    const { events, activeEvent } = useSelector(slice => slice.calendar);

    const setActiveEvent = (calendarEvent) => {
        dispatch(onSetActiveEvent(calendarEvent))
    }

    const startSavingEvent = async (calendarEvent) => {
        const { client, service, start, end } = calendarEvent;
        const updateEvent = {
            client,
            service,
            start,
            end
        }
        try {

            if (calendarEvent._id) {
                await calendarApi.patch(`/events/${calendarEvent._id}`, updateEvent)
                dispatch(onUpdateEvent({ ...calendarEvent }))
                Swal.fire(
                    "Cita actualizada",
                    "Se actualizó la cita correctamente",
                    "success"
                )
                return;
            }
            const { data } = await calendarApi.post("/events", calendarEvent);
            dispatch(onAddNewEvent({ ...calendarEvent, _id: data._id }))
        } catch (error) {
            console.log(error);
            Swal.fire(
                "Hubo un error",
                error.response.data.message,
                "error"
            )
        }
    }

    const startDeletingEvent = async () => {
        try {
            await calendarApi.delete(`/events/${activeEvent._id}`)
            dispatch(onDeleteEvent());
        } catch (error) {

            Swal.fire(
                "Hubo un error",
                error.response.data.message,
                "error"
            )
        }
    }

    const startLoadingEvents = async () => {

        try {
            const data = await calendarApi.get("/events");
            const events = convertEventsToDate(data.data)
            dispatch(onLoadingEvents(events))
        } catch (error) {
            console.log(error)
        }
    }
    return {

        //* Propiedades
        events,
        activeEvent,
        hasEventSelected: !!activeEvent,


        //* Metodos
        setActiveEvent,
        startSavingEvent,
        startDeletingEvent,
        startLoadingEvents
    }
}
