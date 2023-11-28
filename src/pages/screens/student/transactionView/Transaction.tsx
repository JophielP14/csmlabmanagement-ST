import { Link } from 'react-router-dom';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import header from '../../../../components/assets/headerlogo.png'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

function Transaction() {
  const studentDetails = {
    idNumber: 201854265,
    name: "Sofia Dara Alilin",
    Dept: "BSCHEMISTRY",
    section: "CHEM1H1",
  };

  const receiptContent = {
    id: "1000",
    itemsBorrowed: "glass",
    status: "Pending",
    date: "10/14/23",
    // Add other properties as needed
  };

  let backgroundColor = "";
  let buttons = null;
  let color = "";

  switch (receiptContent.status) {
    case "Pending":
      backgroundColor = "#FEFFCD";
      color = "#D9A92E";
      buttons = (
        <>
          <button>Done view</button>
          <button>Cancel request</button>
        </>
      );
      break;

    case "On Borrow":
      backgroundColor = "green";
      buttons = <button>Return</button>;
      break;

    case "Pending Return":
      backgroundColor = "yellow";
      // No button for Pending Return
      break;

    case "Completed":
      backgroundColor = "green";
      buttons = <button>Done view</button>;
      break;

    default:
      break;
  }

  const membersDetails = [
    {
      idNumber: 2018542654,
      Name: "Joel Morongot",
    },
    {
      idNumber: 2020100768,
      Name: "Joel Morongot",
    },
    {
      idNumber: 2020100768,
      Name: "Trissa Saman Asali Mulan Yee",
    },
  ];

  const instructor = [
    {
      idNumber: 2055060541,
      Name: "Ms. Jerilyn Yare",
    },
  ];

  const labtech = [
    {
      Name: "Prince Kurt Laurence",
    },
  ];

  return (
    <div className="Container">
      <div className="sideHeader">
        <Link to="/pending" className="customArrowLink">
          <KeyboardBackspaceIcon className="viewArrowIcon" />
        </Link>
        <img src={header} alt="Header Logo" className="mainlogoView" />
      </div>

      <div className="transBody">
        <div className="status" style={{ backgroundColor, color }}>
          <p>
            Status: <b>{receiptContent.status}</b>
          </p>
        </div>
        <div className="receiptCont">
          {/* Transaction ID */}
          <div className="transactionID">
            <h2>Transaction ID: #{receiptContent.id}</h2>
          </div>

          {/* first Row */}
          <div className="firstRow">
            <div className="viewStudentInfo">
              <div className="iconProfileContainer">
                <AccountCircleOutlinedIcon />
              </div>
              <div className="student-details">
                <p>{studentDetails.name}</p>
                <p>
                  {studentDetails.idNumber}-{studentDetails.Dept}
                </p>
              </div>
            </div>
            <div className="sectionContainer">
              Section: <b>{studentDetails.section}</b>
            </div>
          </div>

          {/* Members */}
          <div className="viewTitleLabel">Members </div>

          <div className="viewAfterLabel">
            {membersDetails.map((member, index) => (
              <div className="viewEachInfo" key={index}>
                <div className="eachIndex">{index + 1}</div>
                <div className="eachmemID">{member.idNumber}</div>
                <div className="eachmemNAME">{member.Name}</div>
              </div>
            ))}
          </div>

          <div className="viewTitleLabel"> Instructor </div>
            <div className="viewAfterLabel">
              <div className="viewEachInfo">Ms. Jerilyn Yare</div>
            </div>

        </div>

        <p>Items Borrowed: {receiptContent.itemsBorrowed}</p>
        <p>Date: {receiptContent.date}</p>
        {/* Add other receipt content properties as needed */}
      </div>

      {buttons && <div>{buttons}</div>}
    </div>
  );
}

export default Transaction;
