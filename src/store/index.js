import {
    authSlice,
    clearErrorMessage,
    onChecking,
    onLogin,
    onLogout
} from "./auth/authSlice";
import {
    calendarSlice,
    onAddNewEvent,
    onDeleteEvent,
    onLoadingEvents,
    onLogoutCalendar,
    onSetActiveEvent,
    onUpdateEvent
} from "./calendar/calendarSlice";
import { store } from "./store";
import {
    onCloseDateModal,
    onOpenDateModal,
    uiSlice
} from "./ui/uiSlice";


export {
    store,
    //* uiSlice
    uiSlice,
    onCloseDateModal,
    onOpenDateModal,

    // * calendarSlice
    calendarSlice,
    onSetActiveEvent,
    onAddNewEvent,
    onUpdateEvent,
    onDeleteEvent,
    onLoadingEvents,
    onLogoutCalendar,

    // * authSlice
    authSlice,
    onChecking,
    onLogin,
    onLogout,
    clearErrorMessage
}
