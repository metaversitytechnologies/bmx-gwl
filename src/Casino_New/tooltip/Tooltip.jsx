/* eslint-disable react/prop-types */
import clsx from "clsx";
import {  useState } from "react";
import "./style.css";
import { FaInfoCircle } from "react-icons/fa";

const ToolTip = ({ title, placement }) => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <div className={"tooltip_container " + placement}>
        {/* <i  className="fa fa-info-circle " /> */}
        <div onClick={() => setOpen((o) => !o)}>

        <FaInfoCircle />
        </div>
        <div className={clsx(open && "open", "tooltipBox")}>{title}</div>
      </div>
    </div>
  );
};

export default ToolTip;
