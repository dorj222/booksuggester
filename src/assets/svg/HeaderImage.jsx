import * as React from "react";
import {default as header} from './icon/header.svg'

function SvgComponent(props) {
  return (
    <img src={header} alt="" style={{height: "80px"}}/>
  );
}

export default SvgComponent;