import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import API from "../api/axios";

const CalendarView = ({ pitchId, onDateSelect }) => {
  const [events, setEvents] = useState([]);
  const [reservedSlots, setReservedSlots] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const res = await API.get(`/reservations/${pitchId}`);
        const formattedEvents = res.data.map((reservation) => ({
          title: "Reserved",
          start: `${reservation.date}T${reservation.hour}`,
          allDay: false,
        }));
        const reserved = res.data.map(
          (reservation) => `${reservation.date}T${reservation.hour}`
        );
        setEvents(formattedEvents);
        setReservedSlots(reserved);
      } catch (err) {
        setError("Failed to load reservations");
      }
    };
    fetchReservations();
  }, [pitchId]);

  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        events={events}
        editable={false}
        selectable={true}
        slotMinTime="08:00:00"
        slotMaxTime="22:00:00"
        slotDuration="01:00:00"
        height="auto"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        dateClick={(info) => {
          const selectedDateTime = `${info.dateStr}`;
          if (reservedSlots.includes(selectedDateTime)) {
            alert("This slot is already reserved!");
            return;
          }
          const selectedDate = info.dateStr.split("T")[0];
          const selectedTime = info.dateStr.split("T")[1]?.substring(0, 5); // HH:mm time format
          if (onDateSelect) {
            onDateSelect(selectedDate, selectedTime);
          }
        }}
      />
    </div>
  );
};

export default CalendarView;