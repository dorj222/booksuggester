import * as React from "react";
import {default as logo} from './icon/floppy-disk-solid.svg'

function Floppy(props) {
  return (
    <img src={logo} alt="" style={{height: "30px"}}/>
  );
}

export default Floppy;