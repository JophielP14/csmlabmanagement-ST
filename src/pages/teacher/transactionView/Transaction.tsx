import { Link } from 'react-router-dom';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import header from '../../../assets/headerlogo.png'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

function TTransaction() {
  const studentDetails = {
    idNumber: 201854265,
    name: "Sofia Dara Alilin",
    Dept: "BSCHEMISTRY",
    section: "CHEM1H1",
  };

  const receiptContent = {
    id: "1000",
    status: "Approved",
    date: "10/14/23",
    time: "10:59AM",
    instructor: "Jerilyn Yare",
    subject: "Chemistry",
    items: [
      { name: "Petri Dishes", quantity: 3, breakage: 1 },
      { name: "Graduated Cylinder", quantity: 6, breakage: 3 },
      { name: "Volumetric Flask", quantity: 2, breakage: 1 },
    ],
  };

  const approver = {
    teacher: [{ idNumber: "2055060541", name: "Ms. Jerilyn Yare" }],
    labtech: [{ idNumber: "2565322123", name: "Prince Kurt Laurence" }],
  };

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

  const Approvebtn = () => {
    // Handle Approve logic
    console.log('Approved clicked');
  };

  const Rejectbtn = () => {
    // Handle Reject logic
    console.log('Reject clicked');
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
          <button onClick={Approvebtn}
            className="bigButton"
            style={{ backgroundColor: "#C8ECB8" }}>Approved</button>
          <button onClick={Rejectbtn}
            className="bigButton"
            style={{ backgroundColor: "#ECC4B8" }}>Reject</button>
        </>
      );
      break;

    case "Approved":
      backgroundColor = "#D9FFD8";
      color = "#00360C";
      break;
    
    case "Rejected":
      backgroundColor = "#FFE9E9";
      color = "#360000";
      break;

    default:
      break;
  }

  return (
    <div className="Container">
      <div className="sideHeader">
        <Link to="/pending" className="customArrowLink">
          <KeyboardBackspaceIcon className="viewArrowIcon" />
        </Link>
        <img src={header} alt="Header Logo" className="mainlogoView" />
      </div>

      <div className="transBody">
        <div className="transStatus" style={{ backgroundColor, color }}>
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
              <div className="studentDetails">
                <div
                  style={{
                    fontSize: "18px",
                  }}
                >
                  <b>{studentDetails.name}</b>
                </div>
                <div
                  style={{
                    fontSize: "14px",
                  }}
                >
                  {studentDetails.idNumber}-{studentDetails.Dept}
                </div>
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
                <div>{index + 1}</div>
                <div>{member.idNumber}</div>
                <div>{member.Name}</div>
              </div>
            ))}
          </div>

          {/* Instructor */}
          <div className="viewTitleLabel"> Instructor </div>
          <div className="viewAfterLabel">
            <div className="viewEachInfo">{receiptContent.instructor}</div>
          </div>

          {/* Subject */}
          <div className="viewTitleLabel"> Subject </div>
          <div className="viewAfterLabel">
            <div className="viewEachInfo">{receiptContent.subject}</div>
          </div>

          {/* Item borrowed */}
          <div className="viewTitleLabel"> Selected Items </div>
          <div className="viewItemsSelected">
            {receiptContent.items.map((selectedItems, index) => (
              <div className="viewEachInfo" key={index}>
                <div>{index + 1}</div>
                <div>{selectedItems.name}</div>
              </div>
            ))}
          </div>

          <div className="totalQuantityLabel">
            <p>
              <b>Total Borrowed:</b> 10
            </p>
          </div>

          {/* Approver */}
          <div
            className="viewTitleLabel"
            style={{
              marginTop: "30px",
            }}
          >
            Approved by:
          </div>
          <div
            className="viewAfterLabel"
            style={{
              color: "gray",
            }}
          >
            {approver.teacher.map((instructor) => (
              <div>
                <ul>
                  <li>
                    Instructor: <b>{instructor.name}</b>
                  </li>
                </ul>
              </div>
            ))}
            {approver.labtech.map((labtech) => (
              <div>
                <ul>
                  <li>
                    Labtech: <b>{labtech.name}</b>
                  </li>
                </ul>
              </div>
            ))}
          </div>

          {/* Date issued */}
          <div className="viewDateTime">
            <div>{receiptContent.date}</div>
            <div>{receiptContent.time}</div>
          </div>
        </div>
      </div>

      {/* Buttons with no function pa */}
      {buttons && <div className="buttonsCont">{buttons}</div>}
    </div>
  );
}

export default TTransaction;
