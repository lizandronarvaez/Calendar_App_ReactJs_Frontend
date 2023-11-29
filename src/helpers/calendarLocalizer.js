import { format, parse, startOfWeek, getDay } from 'date-fns'
import { dateFnsLocalizer } from 'react-big-calendar'
import esES from 'date-fns/locale/es'

const locales = {
    // Cambie el idioma español
    'es': esES,
}

export const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
})