import React, {useState, useEffect, useContext, Children } from "react";
import { CalendarDataService }  from "./requests";
import { Calendar, momentLocalizer } from "react-big-calendar";
import './calendar.module.css';
import moment from "moment";
import Modal from "react-bootstrap/Modal";
import CalendarForm from "./CalendarForm";
import { observer } from "mobx-react";
import EventContainer from "./components/event";
import Background from './layouts/Background';
import { withAuthorization } from  './components/Session';

const localizer = momentLocalizer(moment);

function HomePage({ calendarStore }) {
  const [showAddModal, setShowAddModal] = React.useState(false);
  const [showEditModal, setShowEditModal] = React.useState(false);
  const [calendarEvent, setCalendarEvent] = React.useState({});
  const [initialized, setInitialized] = React.useState(false);

  // TODO: set moment to current on 12/1
  const CURRENT_DATE = moment('2020,12,01').toDate();

  const gradient = {
    redColor: 'linear-gradient(180deg, #ad2301, #871B00)',
    greenColor: 'linear-gradient(180deg, #789D7A, #4b7c4e)'
  }

  const HighlightDateCellWrapper = ({children, value}) =>
    React.cloneElement(Children.only(children), {
        style: {
            ...children.style,
            background: value > CURRENT_DATE ? gradient.redColor : gradient.greenColor
        },
    });
  const hideModals = () => {
    setShowAddModal(false);
    setShowEditModal(false);
  };

  const editButtonClickHandler = (event, e) => {
    setShowAddModal(false);
    setShowEditModal(true);
    console.log(event);
    let { id, title, start, end, description, supplyList, isGroupActivity, videoID, linkPreview } = event;
    const data = { id, title, start, end, description, supplyList, isGroupActivity, videoID, linkPreview };
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
                videoID: data.videoID,
                linkPreview: data.linkPreview
            }
        });
        calendarStore.setCalendarEvents(events);
        setInitialized(true);
    })
  };

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
          className="calendar"
          defaultDate={new Date(2020,11,1)}
          localizer={localizer}
          events={calendarStore.calendarEvents}
          startAccessor="start"
          endAccessor="end"
          selectable={true}
          style={{ height: "70vh" }}
          onSelectSlot={handleSelect}
          components= {{event: EventContainer({
              onEditButtonClick: editButtonClickHandler}),
              dateCellWrapper: HighlightDateCellWrapper,
          }}
        />
      < Background />
      </div>
  );
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(observer(HomePage));
