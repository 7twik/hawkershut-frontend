import React from "react";
import "./HawkerBox.css";
const HawkerBox = (props) => {
  return (
    <div className="hawkerbox">
      <div className="topbox1">
        <p style={{cursor:"pointer"}}><span><b>Hawker's Name:</b></span>{props.username}</p>
        </div>
        <div className="topbox1">
        <p style={{cursor:"pointer"}}><span><b>Hawker Category:</b></span>{props.title}</p>
      </div>
      <div className="topbox2">
        <p style={{cursor:"pointer"}}>
        <span><b>Items Sold:</b></span>
        <ul>
        {props.items ? (
            props.items.map((it, key) => {
              return <div style={{cursor:"pointer"}} key={key}><li>{it}</li></div>;
            })
          ) : (
            <></>
          )}
        </ul>
        </p>
      </div>
      <hr/>
    </div>
  );
};

export default HawkerBox;
