import React, {useContext } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import Modal from "react-bootstrap/Modal";
import { observer } from "mobx-react";
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
    let items = [];
    let isGroupActivity = "";
    let eventVideo = "";
    let eventVideoID = "";
    let linkPreview = "";

    console.log(props.event)

    if (props.event.supplyList) {
        items = props.event.supplyList.split(',').map((supply) =>
            <ul style={{textAlign: "center", listStyleType: "none"}}>
                <li>{supply}</li>
            </ul>
        );
    } else {
        items = <p><strong>No Supplies Needed</strong></p>
    }

    if (props.event.isGroupActivity === true) {
        isGroupActivity = <h3><strong>Yes</strong></h3>
    } else {
        isGroupActivity = <h3>No</h3>
    }

    if (props.event.videoID) {
        eventVideoID = props.event.videoID;

        eventVideo = <YouTube videoId={eventVideoID} />
    }

    if (props.event.linkPreview) {
        linkPreview = <ReactTinyLink
            cardSize="small"
            header="Here's a Handy Link to Help You Prepare!"
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
        <button type="button" className="btn btn-info" id="event-edit-button" onClick={(event) => props.onEditButtonClick(props.event)}>
                    <strong>Edit Event</strong>
        </button>
    )

    let popoverClickRootClose = (
        <Popover id="popover-trigger-click-root-close" style={{ zIndex: 10000, maxWidth: "100%", backgroundColor: "#bdd4e7", backgroundImage: "linear-gradient(315deg, #bdd4e7 10%, #8693ab 80%)", color: "#040629", textAlign: "center" }}>
            <h2><strong>Event Name: {props.event.title}</strong></h2>
            <h3>Description: {props.event.description}</h3>
            <ul style={{listStyleType: "none"}}>
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
            <div style={{justifyContent: "center"}}>
                <h4 className="supply-list" >Supply List</h4>
                    <div>
                        { items }
                    </div>
            </div>
            <h4 className="group-activity">
                Group Activity?
            </h4>
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