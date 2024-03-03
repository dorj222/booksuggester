import * as React from "react";
import {default as logo} from './icon/empty.svg'

function SvgComponent(props) {
  return (
    <img src={logo} alt="" style={{height: "80px"}}/>
  );
}

export default SvgComponent;