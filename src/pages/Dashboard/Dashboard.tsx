import Slogocsm from "../../assets/headerlogo.png";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
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
} from "../../components/API/API";
import { useQuery } from "@tanstack/react-query";
import { TransactionType } from "../../components/Types/Types";
import { useDispatch, useSelector } from "react-redux";
import { auth_toggle } from "../../components/Redux/Slices/AuthSlice/AuthSlice";
import { toast } from "react-toastify";
import { RootState } from "../../components/Redux/Store/Store";
import { DashboardHeader } from "../../components/Headers/Headers";

interface Transaction {
  id: number;
  timestamp: string;
  time: string;
  status: string;
  section: string;
}

const [selectedStatus, setselectedStatus] = useState("pending");
const logged_in_user = useSelector((state: RootState) => state.user.user);
  const handleStatusClick = (status: string) => {
    console.log("Clicked status:", status);
    setselectedStatus(status);
  };

function Dashboard() {
  const [selectedItem, setSelectedItem] = useState("Pending");
  const [selectedSection, setSelectedSection] = useState<string>("All");
  


  const handleButtonClick = (item: string) => {
    setSelectedItem(item);
  };

  const handleSectionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSection(event.target.value);
  };

  const transactions = useQuery({
    queryKey: ["transactions"],
    queryFn: TransactionsAPI,
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const allSections = Array.from(new Set(["CHEM1H1", "CHEM1H2", "CHEM1H3"]));

  return (
    <div className="viewDashboard">
      <div className="Header">
        <div className="logocont">
          <img src={Slogocsm} className="SLogocsm" />
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
        <div className="secondRow">Hi! Jerilyn Yare</div>
      </div>
      <div className="navigation">
        <Link
          to="/Teacher/Dashboard"
          className={`buttonCont ${
            selectedItem === "Pending" ? "button-active" : ""
          }`}
          onClick={() => handleButtonClick("Pending")}
        >
          <div className="navLogo">
            <HourglassBottomIcon />
          </div>
          <div className="navLabel">Pending</div>
        </Link>

        <Link
          to="/Teacher/Dashboard"
          className={`buttonCont ${
            selectedItem === "Rejected" ? "button-active" : ""
          }`}
          onClick={() => handleButtonClick("Rejected")}
        >
          <div className="navLogo">
            <WatchLaterIcon />
          </div>
          <div className="navLabel">Rejected</div>
        </Link>
      </div>

      {/* Dropdown filter */}
      <div className="dropdown">
        <div className="sectionFilterLabelCont">
          <label htmlFor="sectionFilterLabel">Filter by: </label>
        </div>
        <select
          id="sectionFilter"
          onChange={handleSectionChange}
          value={selectedSection}
        >
          <option value="All">All Sections</option>
          {allSections.map((section) => (
            <option key={section} value={section}>
              {section}
            </option>
          ))}
        </select>
      </div>
      {transactions.data && selectedItem === "Pending" ? (
        <p>Pending Transactions</p>
      ) : (
        <></>
      )}
      {/* Transaction list */}
      <div className="transList">
        {transactions.data && selectedItem === "Pending" ? (
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
        {transactions.data && selectedItem === "Rejected" ? (
          <p>Rejected Transactions</p>
        ) : (
          <></>
        )}
        {transactions.data && selectedItem === "Rejected" ? (
          transactions.data
            .filter(
              (transaction: TransactionType) =>
                transaction.status === "REJECTED"
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
export default Dashboard;
