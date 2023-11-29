import React from "react";
import { Link } from "react-router-dom";

import CircleIcon from "@mui/icons-material/Circle";

interface TapViewTransactionProps {
  item: {
    id: number;
    status: string;
    date: string;
    time: string;
    // ... other properties
  };
  linkTo: string;
  statusIcon?: string;
  statusText: string;
}

const TapViewTransaction: React.FC<TapViewTransactionProps> = ({
  item,
  linkTo,
  statusIcon,
  statusText,
}) => (
  <Link to={linkTo}>
    <div className="transactionContainer">
      <div className="transactionFirstRow">
        <div className="transactionID">Transaction ID #{item.id}</div>

        <div className="transactionStatusContainer">
          <div className={statusIcon}>
            <CircleIcon />
          </div>
          <div className={statusText}>{item.status}</div>
        </div>
      </div>

      <div className="transactionSecondRow">
        <div className="timeanddate">
          <div> {item.date}</div>
          <div>{item.time}</div>
        </div>
      </div>

      <div className="transactionThirdRow">Tap to View</div>
    </div>
  </Link>
);
export default TapViewTransaction;
