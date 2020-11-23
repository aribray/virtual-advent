import React, {useContext } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import Modal from "react-bootstrap/Modal";
import CalendarForm from "../CalendarForm";
import { observer } from "mobx-react";
import { getCalendar } from "../requests";
import {Button, Overlay} from 'react-bootstrap';
import {OverlayTrigger} from 'react-bootstrap';
import {Popover} from 'react-bootstrap';
import getYouTubeID from 'get-youtube-id';
import YouTube from 'react-youtube';
import { ReactTinyLink } from 'react-tiny-link';



const EventContainer = ({ onEditButtonClick }) => props => {
    return <MyEvent event={props.event} onEditButtonClick={onEditButtonClick} />
}

const MyEvent = React.memo((props) => {
    // const user = useContext(AuthProvider);
    let items = []
    let isGroupActivity = ""
    let eventVideo = ""
    let eventVideoID = ""
    let linkPreview = ""

    if (props.event.supplyList) {
        items = props.event.supplyList.split(',').map((supply) =>
            <li>{supply}</li>
        );
    }

    if (props.event.isGroupActivity === true) {
        isGroupActivity = <h3>Yes</h3>
    } else {
        isGroupActivity = <h3>No</h3>
    }

    if (props.event.videoID) {
        eventVideoID = getYouTubeID(props.event.videoID)

        const opts = {
            height: '390',
            width: '640'
        };

        eventVideo = <YouTube videoId={eventVideoID} opts={opts} />
    }

    if (props.event.linkPreview) {
        linkPreview = <ReactTinyLink
            cardSize="small"
            showGraphic={true}
            maxLine={3}
            minLine={1}
            url={props.event.linkPreview}
        />
    }

    let start_date_to_moment = moment(props.event.start, 'LLLL')
    let end_date_to_moment = moment(props.event.end, 'LLLL')

    let start = start_date_to_moment.format('LT')
    let end = end_date_to_moment.format('LT')

    const EditButton = () => (
        <button type="button" className="btn btn-primary" id="event-edit-button" onClick={(event) => props.onEditButtonClick(props.event)}>
                    <strong>Edit Event</strong>
        </button>
    )

    let popoverClickRootClose = (
        <Popover id="popover-trigger-click-root-close" style={{ zIndex: 10000 }}>
            <h2><strong>Event Name: {props.event.title}</strong></h2>
            <h3>Description: {props.event.description}</h3>
            <ul>
                <li key='start-time'>
                    Start Time: {start}
                </li>
                <li key='end-time'>
                    End Time: {end}
                </li>
            </ul>
            <div className="video-div">
                {eventVideo}
            </div>
            <div className="supply-list" >Supply List</div>
                <ul>
                    {items}
                </ul>
            <div className="group-activity">
                Group Activity?
            </div>
                {isGroupActivity}
            <div className="link-preview">
                {linkPreview}
            </div>
            <div>
                <EditButton/>
            </div>
        </Popover>
    );

    return (
        <div>
            <div>
                <OverlayTrigger id="help" trigger="click" rootClose container={this} placement="bottom" overlay={popoverClickRootClose}>
                    <div>{props.event.title}</div>
                </OverlayTrigger>
            </div>
        </div>
    );
})

export default EventContainer;