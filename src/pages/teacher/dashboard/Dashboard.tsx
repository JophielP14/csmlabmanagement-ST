import Slogocsm from "../../../assets/headerlogo.png";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import CircleIcon from "@mui/icons-material/Circle";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { TransactionsAPI } from "../../../components/API/API";
import { TransactionType } from "../../../components/Types/Types";

// deleted inteface transaction types

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

  const allSections = Array.from(new Set(["CHEM1H1", "CHEM1H2", "CHEM1H3"]));

  return (
    <div className="viewDashboard">
      <div className="Header">
        <div className="logocont">
          <img src={Slogocsm} className="SLogocsm" />
        </div>
        <div className="firstRow">
          <div className="profilecont">
            <div className="AccountLogo">
              <AccountCircleIcon />
            </div>
            <div className="userID">2020302977</div>
          </div>

          <Link to="/" className="logoutcont">
            <div className="logoLogout">
              <LogoutIcon />
            </div>
            <div className="logoutLabel">Logout</div>
          </Link>
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
