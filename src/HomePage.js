import React, {useState, useEffect, useContext, Children } from "react";
import SignIn from "./components/signInForm"
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import Modal from "react-bootstrap/Modal";
import CalendarForm from "./CalendarForm";
import { observer } from "mobx-react";
import CalendarDataService  from "./requests";
import EventContainer from "./components/event"


const localizer = momentLocalizer(moment);

function HomePage({ calendarStore }) {
  const [showAddModal, setShowAddModal] = React.useState(false);
  const [showEditModal, setShowEditModal] = React.useState(false);
  const [calendarEvent, setCalendarEvent] = React.useState({});
  const [initialized, setInitialized] = React.useState(false);

  const CURRENT_DATE = moment('2020,12,01').toDate();

  const HighlightDateCellWrapper = ({children, value}) =>
    React.cloneElement(Children.only(children), {
        style: {
            ...children.style,
            backgroundColor: value > CURRENT_DATE ? 'darkred' : 'forestgreen',
        },
    });
  const hideModals = () => {
    setShowAddModal(false);
    setShowEditModal(false);
  };

  const editButtonClickHandler = (event, e) => {
    setShowAddModal(false);
    setShowEditModal(true);
    let { id, title, start, end, description, supplyList, isGroupActivity, videoID, linkPreview } = event;
    const data = { id, title, start, end, description, supplyList, isGroupActivity, videoID, linkPreview };
    CalendarDataService.updateEvent(data.id, data);
    setCalendarEvent(data);
};

  const getCalendarEvents = async () => {
    const response = await CalendarDataService.getAllEvents();
    response.get().then(querySnapshot => {
        const events = querySnapshot.docs.map(doc => {
            const data = doc.data();
            const id = doc.id;
            return {
                id: id,
                title: data.title,
                start: moment(data.start.toDate(), 'LLLL').toDate(),
                end: moment(data.end.toDate(), 'LLLL').toDate(),
                description: data.description,
                supplyList: data.supplyList,
                isGroupActivity: data.isGroupActivity,
                vidoeID: data.videoID,
                linkPreview: data.linkPreview
            }
        });
        calendarStore.setCalendarEvents(events);
        setInitialized(true);
    })
  };

  console.log(calendarStore.calendarEvents);

  const handleSelect = (event, e) => {
    const { start, end } = event;
    const data = { title: "", start, end, description: "", supplyList: "", isGroupActivity: false, videoID: "", linkPreview: "" };
    setShowAddModal(true);
    setShowEditModal(false);
    setCalendarEvent(data);
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
        // onSelectEvent={editButtonClickHandler}
        components= {{event: EventContainer({
            onEditButtonClick: editButtonClickHandler}),
            dateCellWrapper: HighlightDateCellWrapper,
        }}
      />
    </div>
  );
}

export default observer(HomePage);
