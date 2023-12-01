import header from "../../../assets/headerlogo.png";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import HourglassBottomTwoToneIcon from "@mui/icons-material/HourglassBottomTwoTone";
import BackHandOutlinedIcon from "@mui/icons-material/BackHandOutlined";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import CircleIcon from "@mui/icons-material/Circle";
import { useState } from "react";
import { Link } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import FlashOffIcon from "@mui/icons-material/FlashOff";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { TransactionsAPI } from "../../../components/API/API";
import { useQuery } from "@tanstack/react-query";
import { TransactionType } from "../../../components/Types/Types";

function DashboardScreen() {
  const [selectedStatus, setselectedStatus] = useState("pending");

  const handleStatusClick = (status: string) => {
    console.log("Clicked status:", status);
    setselectedStatus(status);
  };
  
  const transactions = useQuery({
    queryKey: ["transactions"],
    queryFn: TransactionsAPI,
  });
  
  

  return (
    <div className="DashboardContent">
      <div className="logocontainerD">
        <img src={header} alt="Header Logo" className="mainlogoD" />
      </div>

      <div className="firstContent">
        <div className="leftlabel">
          <div className="iconContainer">
            <AccountCircleIcon />
          </div>
          <div className="leftlabelstudent">
            <div className="idNumber">2017100196</div>
            <div className="status">
              Status: <span>Cleared</span>
            </div>
          </div>
        </div>
        <Link to="/" className="rightlabel">
          <LogoutIcon className="logoutIcon" />
          <div className="rightText"> Logout </div>
        </Link>
      </div>

      <div className="dashboardLabel">Dashboard</div>

      <Link to="/borrow-form" className="borrowItemsButton">
        Click to Request Borrow Items
      </Link>

      {/* 4 buttons */}

      <div className="buttonsView">
        <Link
          to="/pending"
          className={`buttonItemsStatus ${
            selectedStatus === "Pending" ? "button-active" : ""
          }`}
          onClick={() => handleStatusClick("Pending")}
        >
          <div className="iconStatus">
            <HourglassBottomTwoToneIcon />
          </div>
          <div className="buttonName">Pending</div>
        </Link>

        <Link
          to="/on-borrow"
          className={`buttonItemsStatus ${
            selectedStatus === "Approved" ? "button-active" : ""
          }`}
          onClick={() => handleStatusClick("Approved")}
        >
          <div className="iconStatus">
            <ThumbUpOutlinedIcon />
          </div>
          <div className="buttonName">On-Borrow</div>
        </Link>

        <Link
          to="/returning"
          className={`buttonItemsStatus ${
            selectedStatus === "Returning" ? "button-active" : ""
          }`}
          onClick={() => handleStatusClick("Returning")}
        > 
          <div className="iconStatus">
            <BackHandOutlinedIcon />
          </div>
          <div className="buttonName">Pending Return </div>
        </Link>

        <Link
          to="/returned"
          className={`buttonItemsStatus ${
            selectedStatus === "Completed" ? "button-active" : ""
          }`}
          onClick={() => handleStatusClick("Completed")}
        >
          <div className="iconStatus">
            <CheckCircleIcon />
          </div>
          <div className="buttonName">Returned</div>
        </Link>

        <Link
          to="/breakage"
          className={`buttonItemsStatus ${
            selectedStatus === "Breakage" ? "button-active" : ""
          }`}
          onClick={() => handleStatusClick("Breakage")}
        >
          <div className="iconStatus">
            <FlashOffIcon />
          </div>
          <div className="buttonName">Breakage</div>
        </Link>

        <Link
          to="/rejected"
          className={`buttonItemsStatus ${
            selectedStatus === "Rejected" ? "button-active" : ""
          }`}
          onClick={() => handleStatusClick("Rejected")}
        >
          <div className="iconStatus">
            <ThumbDownIcon />
          </div>
          <div className="buttonName">Rejected</div>
        </Link>
      </div>
      {transactions.data && selectedStatus === "Pending" ? (
        <p>Pending Transactions</p>
      ) : (
        <></>
      )}
      {/* Transaction list */}
      <div className="transList">
        {transactions.data && selectedStatus === "Pending" ? (
          transactions.data
            .filter(
              (transaction: TransactionType) => transaction.status === "PENDING"
            )
            .map((transaction: TransactionType) => (
              <Link
                key={transaction.id}
                to={`/transaction/${transaction.id}`}
                className="transactionContainer"
              >
                <div className="transFirstRow">
                  <div className="transactionID">
                    Transaction ID {transaction.id}
                  </div>
                  <div className="currentStatus">
                    <div className="iconCurrentStatus">
                      <CircleIcon />
                    </div>
                    <div className="penStatus">{transaction.status}</div>
                  </div>
                </div>
                <div className="transSecondRow">
                  <div className="timeanddate">
                    <div>{transaction.timestamp}</div>
                    <div>{transaction.timestamp}</div>
                  </div>
                </div>
                <div className="transThirdRow">Tap to View</div>
              </Link>
            ))
        ) : (
          <></>
        )}


    </div>
    </div>
  );
}

export default DashboardScreen;
