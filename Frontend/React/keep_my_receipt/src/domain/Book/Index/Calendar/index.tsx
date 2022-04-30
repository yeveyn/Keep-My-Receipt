import FullCalendar, { EventContentArg } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

export default function IndexCalendar() {
  const renderEventContent = (eventInfo: EventContentArg) => {
    return (
      <>
        <b>{eventInfo.textColor}</b>
        <i>{eventInfo.event.title}</i>
      </>
    );
  };

  return (
    <>
      {/* <Calendar minDetail="decade" tileContent={'aaa'} /> */}
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        locale="ko"
        events={[
          { title: '-5000', date: '2022-04-23' },
          { title: '+10000', date: '2022-04-23' },
          { title: '-2000', date: '2022-04-23' },
        ]}
        eventContent={renderEventContent}
      />
    </>
  );
}
