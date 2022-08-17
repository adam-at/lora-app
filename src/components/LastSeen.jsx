import React from 'react';
import moment from "moment";

export default function LastSeen(props){
    let lastseen = "Never";
    if (props.gateway.lastSeenAt !== null) {
      lastseen = moment(props.gateway.lastSeenAt).fromNow();
    }
    return(
      <>
          {lastseen}
      </>
    ) ;
  };