import React from "react";
import Paper from "@material-ui/core/Paper";
import Taskbar from "./Taskbar";


const Social = (props) => {
  return (
    <div id="body">
      <Taskbar />
      <h1>Leaders of the week:</h1>
      <div className="dash">
        <Paper id="info-card">
          <div id = "pic">
            <img src="https://picsum.photos/id/1025/150" alt="puppy in blanket"/>
          </div>
          <h3>Dmitchell17</h3>
          <h4>Weekly Change:</h4>
          <h5>179%</h5>
        </Paper>
        <Paper id="info-card">
          <div id = "pic">
            <img src="https://picsum.photos/id/602/150" alt="man in sun"/>
          </div>
          <h3>TylerRutt19</h3>
          <h4>Weekly Change:</h4>
          <h5>239%</h5>
        </Paper>
        <Paper id="info-card">
          <div id = "pic">
            <img src="https://picsum.photos/id/389/150" alt="walking up steps"/>
          </div>
          <h3>Rcollins22</h3>
          <h4>Weekly Change:</h4>
          <h5>615%</h5>
        </Paper>
      </div>
    </div>
  );
};

export default Social;
