import header from "../../../assets/headerlogo.png";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import HourglassBottomTwoToneIcon from "@mui/icons-material/HourglassBottomTwoTone";
import BackHandOutlinedIcon from "@mui/icons-material/BackHandOutlined";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import CircleIcon from "@mui/icons-material/Circle";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import FlashOffIcon from "@mui/icons-material/FlashOff";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import {
  TransactionsAPI,
  setAccessToken,
  setRefreshToken,
} from "../../../components/API/API";
import { useQuery } from "@tanstack/react-query";
import { TransactionType } from "../../../components/Types/Types";
import { useDispatch, useSelector } from "react-redux";
import { auth_toggle } from "../../../components/Redux/Slices/AuthSlice/AuthSlice";
import { toast } from "react-toastify";
import { RootState } from "../../../components/Redux/Store/Store";

function DashboardScreen() {
  const [selectedStatus, setselectedStatus] = useState("pending");
  const logged_in_user = useSelector((state: RootState) => state.user.user);
  const handleStatusClick = (status: string) => {
    console.log("Clicked status:", status);
    setselectedStatus(status);
  };

  const transactions = useQuery({
    queryKey: ["transactions"],
    queryFn: TransactionsAPI,
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className="DashboardContent">
      <div className="logocontainerD">
        <img src={header} alt="Header Logo" className="mainlogoD" />
      </div>
      <div className="firstContent">
        <p>{JSON.stringify(logged_in_user)}</p>
        <div className="leftlabel">
          <div className="iconContainer">
            <AccountCircleIcon />
          </div>
          <div className="leftlabelstudent">
            <div className="idNumber">{logged_in_user.username}</div>
            <div className="status">
              Status: <span>Cleared</span>
            </div>
          </div>
        </div>
        <button
          className="rightlabel"
          onClick={async () => {
            navigate("/");
            await setAccessToken("");
            await setRefreshToken("");
            await dispatch(auth_toggle());
            toast("Logged out", {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          }}
        >
          <LogoutIcon className="logoutIcon" />
          <div className="rightText"> Logout </div>
        </button>
      </div>

      <div className="dashboardLabel">Dashboard</div>

      <Link to="/borrow-form" className="borrowItemsButton">
        Click to Request Borrow Items
      </Link>

      {/* 4 buttons */}

      <div className="buttonsView">
        <button
          className={`buttonItemsStatus ${
            selectedStatus === "Pending" ? "button-active" : ""
          }`}
          onClick={() => handleStatusClick("Pending")}
        >
          <div className="iconStatus">
            <HourglassBottomTwoToneIcon />
          </div>
          <div className="buttonName">Pending</div>
        </button>

        <button
          className={`buttonItemsStatus ${
            selectedStatus === "Approved" ? "button-active" : ""
          }`}
          onClick={() => handleStatusClick("Approved")}
        >
          <div className="iconStatus">
            <ThumbUpOutlinedIcon />
          </div>
          <div className="buttonName">On-Borrow</div>
        </button>

        <button
          className={`buttonItemsStatus ${
            selectedStatus === "Returning" ? "button-active" : ""
          }`}
          onClick={() => handleStatusClick("Returning")}
        >
          <div className="iconStatus">
            <BackHandOutlinedIcon />
          </div>
          <div className="buttonName">Pending Return </div>
        </button>

        <button
          className={`buttonItemsStatus ${
            selectedStatus === "Completed" ? "button-active" : ""
          }`}
          onClick={() => handleStatusClick("Completed")}
        >
          <div className="iconStatus">
            <CheckCircleIcon />
          </div>
          <div className="buttonName">Returned</div>
        </button>

        <button
          className={`buttonItemsStatus ${
            selectedStatus === "Breakage" ? "button-active" : ""
          }`}
          onClick={() => handleStatusClick("Breakage")}
        >
          <div className="iconStatus">
            <FlashOffIcon />
          </div>
          <div className="buttonName">Breakage</div>
        </button>

        <button
          className={`buttonItemsStatus ${
            selectedStatus === "Rejected" ? "button-active" : ""
          }`}
          onClick={() => handleStatusClick("Rejected")}
        >
          <div className="iconStatus">
            <ThumbDownIcon />
          </div>
          <div className="buttonName">Rejected</div>
        </button>
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
