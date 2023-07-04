import React from "react";
import "./HawkerBox.css";
const HawkerBox = (props) => {
  return (
    <div className="hawkerbox">
      <div className="topbox1">
        <h4>{props.username}</h4>
        <h4>{props.title}</h4>
      </div>
      <div className="topbox2">
        <h5>
          {props.items ? (
            props.items.map((it, key) => {
              return <div key={key}>{it}</div>;
            })
          ) : (
            <></>
          )}
        </h5>
      </div>
      <hr/>
    </div>
  );
};

export default HawkerBox;
