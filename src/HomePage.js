import React, {useState, useEffect, useContext } from "react";
import SignIn from "./components/signInForm"
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import Modal from "react-bootstrap/Modal";
import CalendarForm from "./CalendarForm";
import { observer } from "mobx-react";
import CalendarDataService  from "./requests";
import EventContainer from "./components/event"
// import AgendaView from "./components/agendaView"
import firebase from "firebase";
import { firebaseAuth }from './providers/AuthProvider';


const localizer = momentLocalizer(moment);

function HomePage({ calendarStore }) {
  const [showAddModal, setShowAddModal] = React.useState(false);
  const [showEditModal, setShowEditModal] = React.useState(false);
  const [calendarEvent, setCalendarEvent] = React.useState({});
  const [initialized, setInitialized] = React.useState(false);

  const hideModals = () => {
    setShowAddModal(false);
    setShowEditModal(false);
  };

  const editButtonClickHandler = (event, e) => {
    setShowAddModal(false);
    setShowEditModal(true);
    let { id, title, start, end, allDay, description, supplyList } = event;
    start = new Date(start);
    end = new Date(end);
    const data = { id, title, start, end, allDay, description, supplyList };
    setCalendarEvent(data);
};

  const getCalendarEvents = async () => {
    const response = await CalendarDataService.getAllEvents();
    console.log(response)
    response.get().then(querySnapshot => {
        const data = querySnapshot.docs.map(doc => doc.data());
        console.log(data);
    })
    // const evs = response.data.map(d => {
    //   return {
    //     ...d,
    //     start: new Date(d.start),
    //     end: new Date(d.end)
    //   };
    // });
    // calendarStore.setCalendarEvents(evs);
    setInitialized(true);
  };

  const handleSelect = (event, e) => {
    const { start, end } = event;
    const data = { title: "", start, end, allDay: false, description: "", supplyList: "" };
    setShowAddModal(true);
    setShowEditModal(false);
    setCalendarEvent(data);
  };

    const handleSelectEvent = (event, e) => {

    };

  React.useEffect(() => {
    if (!initialized) {
      getCalendarEvents();
    }
  });

  return (
    <div className="page">
      <Modal show={showAddModal} onHide={hideModals}>
        <Modal.Header closeButton>
          <Modal.Title>Add Advent Event</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <CalendarForm
            calendarStore={calendarStore}
            calendarEvent={calendarEvent}
            onCancel={hideModals.bind(this)}
            edit={false}
          />
        </Modal.Body>
      </Modal>

      <Modal show={showEditModal} onHide={hideModals}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Advent Event</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <CalendarForm
            calendarStore={calendarStore}
            calendarEvent={calendarEvent}
            onCancel={hideModals.bind(this)}
            edit={true}
          />
        </Modal.Body>
      </Modal>
      <Calendar
        defaultDate={new Date(2020,11,1)}
        localizer={localizer}
        events={calendarStore.calendarEvents}
        startAccessor="start"
        endAccessor="end"
        selectable={true}
        style={{ height: "70vh" }}
        onSelectSlot={handleSelect}
        // onSelectEvent={handleSelectEvent}
        components= {{event: EventContainer({
            onEditButtonClick: editButtonClickHandler,
        })}}
      />
    </div>
  );
}

export default observer(HomePage);
