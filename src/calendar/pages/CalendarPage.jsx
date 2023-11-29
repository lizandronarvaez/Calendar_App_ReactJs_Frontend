/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { Calendar, } from 'react-big-calendar'
import "react-big-calendar/lib/css/react-big-calendar.css";
import { calendarMessagesEs, localizer } from "../../helpers"
import { useEffect, useState } from 'react';
import { CalendarBoxEvent, FabAddNew, FabDelete, ModalCalendar, NavBar } from '..';
import { useCalendarStore, useUiStore } from '../../hooks';


export const CalendarPage = () => {

  const { openDateModal } = useUiStore();
  const { events, activeEvent, setActiveEvent, startLoadingEvents } = useCalendarStore();
  const [lastView, setLastView] = useState(localStorage.getItem("lastView") || "agenda");

  const eventStyleGetter = (event, start, end, isSelected) => {

    const filterService = (event.service.toLowerCase() === "lavado integral")

    const style = {
      backgroundColor: filterService ? "#dc3545" : "#347cf7",
      borderRadius: "0px",
      opacity: isSelected ? 1 : .8,
      color: "white",
      textAlign: "center",
      fontSize: ".9rem",
      cursor: "pointer",
      textTransform: "capitalize"
    }
    return {
      style
    }

  }

  const onDoubleClick = () => openDateModal();
  const onSelect = (e) => setActiveEvent(e);
  const onViewChanged = (e) => {
    localStorage.setItem("lastView", e);
    setLastView(e);
  }

  useEffect(() => {
    startLoadingEvents()
  }, [])

  return (
    <>
      <NavBar />
      <Calendar
        culture="es"
        localizer={localizer}
        events={events}
        defaultView={lastView}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "calc(100vh - 80px)" }}
        messages={calendarMessagesEs()}
        components={{ event: CalendarBoxEvent }}
        eventPropGetter={eventStyleGetter}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChanged}
      />
      <ModalCalendar />
      <FabAddNew />
      {activeEvent && activeEvent._id && (
        <FabDelete />
      )}
    </>
  )
}
