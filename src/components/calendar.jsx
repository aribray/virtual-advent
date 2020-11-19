import BigCalendar from 'react-big-calendar'
import moment from 'moment'

const localizer = BigCalendar.momentLocalizer(moment)

const MyCalendar = props => (
  <div>
    <BigCalendar
      localizer={localizer}
      defaultDate={new Date(2020,0,1)}
      events={[]}
      startAccessor="start"
      endAccessor="end"
    />
  </div>
)