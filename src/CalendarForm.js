import React from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import DatePicker from "react-datepicker";
import Button from "react-bootstrap/Button";
import CalendarDataService from "./requests";
import { observer } from "mobx-react";
import moment from 'moment'

const buttonStyle = { marginRight: 10 };

function CalendarForm({ calendarStore, calendarEvent, onCancel, edit }) {
  const [start, setStart] = React.useState(null);
  const [end, setEnd] = React.useState(null);
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [supplyList, setSupplyList] = React.useState("");
  const [id, setId] = React.useState(null);
  const [isGroupActivity, setIsGroupActivity] = React.useState(false);
  const [videoID, setVideoID] = React.useState("");
  const [linkPreview, setLinkPreview] = React.useState("");

  React.useEffect(() => {
    setTitle(calendarEvent.title);
    setStart(calendarEvent.start);
    setEnd(calendarEvent.end);
    setId(calendarEvent.id);
    setDescription(calendarEvent.description);
    setSupplyList(calendarEvent.supplyList);
    setIsGroupActivity(calendarEvent.isGroupActivity);
    setVideoID(calendarEvent.videoID);
    setLinkPreview(calendarEvent.linkPreview);
  }, [
    calendarEvent.title,
    calendarEvent.start,
    calendarEvent.end,
    calendarEvent.id,
    calendarEvent.description,
    calendarEvent.supplyList,
    calendarEvent.isGroupActivity,
    calendarEvent.videoID,
    calendarEvent.linkPreview
  ]);

  const handleSubmit = async ev => {
    ev.preventDefault();
    if (!title || !start || !end) {
      return;
    }

    if (+start > +end) {
      alert("Start time must be earlier than end date");
      return;
    }
    const event = {
      title,
      start,
      end,
      description,
      supplyList,
      isGroupActivity,
      videoID,
      linkPreview
    };

    console.log('EVENT!')
    console.log(event)

    if (!edit) {
      await CalendarDataService.createEvent(event)
    } else {
      await CalendarDataService.updateEvent(id, event)
    }

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
          onCancel();
        })
        .catch(err => {
          console.log('Error fetching records', err);
        })
  };

  const handleStartChange = date => setStart(date);
  const handleEndChange = date => setEnd(date);
  const handleTitleChange = ev => setTitle(ev.target.value);
  const handleDescriptionChange = ev => setDescription(ev.target.value)
  const handleSupplyListChange = ev => setSupplyList(ev.target.value)
  const handleIsGroupActivityChange = ev => setIsGroupActivity(ev.target.checked)
  const handleVideoIDChange = ev => setVideoID(ev.target.value)
  const handleLinkPreviewChange = ev => setLinkPreview(ev.target.value)

  const deleteCalendarEvent = async () => {
    await CalendarDataService.deleteEvent(calendarEvent.id);
    const response = await CalendarDataService.getAllEvents();
    response.get().then(querySnapshot => {
      const data = querySnapshot.docs.map(doc => doc.data());
      const events = data.map(d => {
          return {
              title: d.title,
              start: moment(d.start.toDate(), 'LLLL').toDate(),
              end: moment(d.end.toDate(), 'LLLL').toDate(),
              description: d.description,
              supplyList: d.supplyList,
              isGroupActivity: d.isGroupActivity,
              videoID: d.videoID,
              linkPreview: d.linkPreview
          }
      })
      calendarStore.setCalendarEvents(events);
      onCancel();
  })
  };

  return (
    <Form noValidate onSubmit={handleSubmit}>
      <Form.Row>
        <Form.Group as={Col} md="12" controlId="title">
          <Form.Label>Event Name</Form.Label>
          <Form.Control
            type="text"
            name="title"
            placeholder="Event Name"
            value={title || ""}
            onChange={handleTitleChange}
            isInvalid={!title}
          />
          <Form.Control.Feedback type="invalid">{!title}</Form.Control.Feedback>
        </Form.Group>
      </Form.Row>

      <Form.Row>
        <Form.Group as={Col} md="12" controlId="start">
          <Form.Label>Start Time</Form.Label>
          <br />
          <DatePicker
            showTimeSelect
            className="form-control"
            selected={start}
            onChange={handleStartChange}
          />
        </Form.Group>
      </Form.Row>

      <Form.Row>
        <Form.Group as={Col} md="12" controlId="end">
          <Form.Label>End</Form.Label>
          <br />
          <DatePicker
            showTimeSelect
            className="form-control"
            selected={end}
            onChange={handleEndChange}
          />
        </Form.Group>
      </Form.Row>

      <Form.Row>
        <Form.Group as={Col} md="12" controlId="description">
          <Form.Label>Description</Form.Label>
            <br />
              <textarea className="form-control" value={description} onChange={handleDescriptionChange} />
        </Form.Group>
      </Form.Row>

      <Form.Row>
        <Form.Group as={Col} md="12" controlId="videoID">
          <Form.Label>Link to Youtube Video</Form.Label>
            <br />
              <Form.Control
                type="text"
                name="videoID"
                placeholder="Add link to YouTube video"
                defaultValue=""
                onChange={handleVideoIDChange}
                 />
        </Form.Group>
      </Form.Row>

      <Form.Row>
        <Form.Group as={Col} md="12" controlId="linkPreview">
          <Form.Label>Link to Activity Website</Form.Label>
            <br />
              <Form.Control
                type="text"
                name="linkPreview"
                defaultValue=""
                onChange={handleLinkPreviewChange}
                placeholder="Add link to activity website" />
        </Form.Group>
      </Form.Row>

      <Form.Row>
        <Form.Group as={Col} md="12" controlId="supplyList">
          <Form.Label>Supplies Needed</Form.Label>
            <br />
            <Form.Control
              as="textarea"
              rows={3}
              name="supplyList"
              placeholder="Enter supplies needed ONE AT A TIME, followed by a comma"
              value={supplyList || ""}
              onChange={handleSupplyListChange}
            />
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col} md="12" controlId="eventType">
          <Form.Label>Is this a group activity?</Form.Label>
            <br />
            <Form.Check
              type="checkbox"
              label="Yes, this is a group activity."
              checked={isGroupActivity}
              onChange={handleIsGroupActivityChange}
            />
        </Form.Group>
      </Form.Row>
      <Button type="submit" style={buttonStyle}>
        Save
      </Button>
      <Button type="button" style={buttonStyle} onClick={deleteCalendarEvent}>
        Delete
      </Button>
      <Button type="button" onClick={onCancel}>
        Cancel
      </Button>
    </Form>
  );
}

export default observer(CalendarForm);
