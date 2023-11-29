/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit';
import { addHours } from 'date-fns';


export const calendarSlice = createSlice({
    name: 'calendar',

    initialState: {
        events: [

        ],
        activeEvent: null,
        isLoadingEvents: true
    },

    reducers: {

        onSetActiveEvent: (state, action) => {
            state.activeEvent = action.payload
        },
        onAddNewEvent: (state, action) => {
            state.events.push(action.payload);
            state.activeEvent = null;
        },
        onUpdateEvent: (state, action) => {
            state.events = state.events.map(event => {
                if (event._id === action.payload._id) {
                    return action.payload;
                }

                return event;
            })
        },
        onDeleteEvent: (state, action) => {
            if (state.activeEvent) {
                state.events = state.events.filter(event => event._id !== state.activeEvent._id);
                state.activeEvent = null;
            }
        },

        onLoadingEvents: (state, { payload = [] }) => {
            state.isLoadingEvents = false;
            // state.events = payload;
            payload.forEach(event => {
                const exist = state.events.some(eventDB => eventDB._id === event._id)
                if (!exist) state.events.push(event);
            });
        },

        onLogoutCalendar: (state) => {
            state.events = [];
            state.activeEvent = null;
            state.isLoadingEvents = true;
        }
    },
});

export const {
    onSetActiveEvent,
    onAddNewEvent,
    onUpdateEvent,
    onDeleteEvent,
    onLoadingEvents,
    onLogoutCalendar
} = calendarSlice.actions