import * as React from "react";
import {default as icon} from './icon/gear-solid.svg'

function Gear(props) {
  return (
    <img src={icon} alt="" style={{height: "20px"}}/>
  );
}

export default Gear;