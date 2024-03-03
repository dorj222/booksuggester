import * as React from "react";
import {default as logo} from './icon/booksuggester.svg'

function SvgComponent(props) {
  return (
    <img src={logo} alt="" style={{height: "30px"}}/>
  );
}

export default SvgComponent;

