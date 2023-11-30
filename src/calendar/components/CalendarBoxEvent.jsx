/* eslint-disable react/prop-types */
export const CalendarBoxEvent = ({ event }) => {
    const { service, client } = event;
    return (
        <>
            <strong>{service}</strong>
            <span> - {client}</span>
        </>
    )
}
