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


function Dashboard() {
  const [selectedStatus, setselectedStatus] = useState("Pending");
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

  function BorrowButton() {
    const isStudent = true;

    if (isStudent) {
      return (
        <div className="navborrow">
          <Link to="/borrow-form" className="borrowItemsButton">
            Click to Request Borrow Items
          </Link>

          <div className="studteNavigation">
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
              <div className="buttonName">On Borrow</div>
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
        </div>
      );
    }

    if (!isStudent) {
      return (
        <div className="studteNavigation">
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
              selectedStatus === "Rejected" ? "button-active" : ""
            }`}
            onClick={() => handleStatusClick("Rejected")}
          >
            <div className="iconStatus">
              <ThumbUpOutlinedIcon />
            </div>
            <div className="buttonName">Rejected</div>
          </button>
        </div>
      );
    }
    return <></>;
  }

  return (
    <div className="Container">
      <DashboardHeader />

      <div className="firstRow-profile-logout">
        {/* <p>{JSON.stringify(logged_in_user)}</p> */}
        <div className="leftlabel">
          <div className="iconContainer">
            <AccountCircleIcon />
          </div>
          <div className="leftlabelstudent">
            <div className="idNumber">{logged_in_user.username}</div>
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

      <BorrowButton />

      {transactions.data && selectedStatus === "Pending" ? (
        <p>Pending Transactions</p>
      ) : (
        <></>
      )}

      {transactions.data && selectedStatus === "Approved" ? (
        <p>On-borrow Transactions</p>
      ) : (
        <></>
      )}

      {transactions.data && selectedStatus === "Returning" ? (
        <p>Pending Return Transactions</p>
      ) : (
        <></>
      )}

      {transactions.data && selectedStatus === "Completed" ? (
        <p>Returned Transactions</p>
      ) : (
        <></>
      )}

      {transactions.data && selectedStatus === "Breakage" ? (
        <p>Breakages List</p>
      ) : (
        <></>
      )}

      {transactions.data && selectedStatus === "Rejected" ? (
        <p>Rejected Transactions</p>
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

        {transactions.data && selectedStatus === "Approved" ? (
          transactions.data
            .filter(
              (transaction: TransactionType) =>
                transaction.status === "APPROVED"
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

        {transactions.data && selectedStatus === "Returning" ? (
          transactions.data
            .filter(
              (transaction: TransactionType) =>
                transaction.status === "RETURNING"
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

        {transactions.data && selectedStatus === "Completed" ? (
          transactions.data
            .filter(
              (transaction: TransactionType) =>
                transaction.status === "COMPLETED"
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

        {transactions.data && selectedStatus === "Breakage" ? (
          transactions.data
            .filter(
              (transaction: TransactionType) =>
                transaction.status === "Breakage"
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

        {transactions.data && selectedStatus === "Rejected" ? (
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
