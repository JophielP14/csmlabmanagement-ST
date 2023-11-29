import BorrowLogo from "../../../assets/headerlogo.png";
import Check from "../../../assets/check.png";
import { Link } from "react-router-dom";

function RequestConfirm() {
  return (
    <div className="requestConfirmPage">
      <div>
        <img src={BorrowLogo} />
      </div>
      <div>
        <img src={Check} />
      </div>
      <div>
        <p className="requestDesc">
          Your request is now processing, Your request ID is{" "}
        </p>
      </div>
      <div>
        <h1>#001</h1>
      </div>
      <div className="seeLiveBtnContainer">
        <Link to="/pending/view/:id">
          <button className="seeLiveBtn">See Live Status</button>
        </Link>
      </div>
      <div>
        <Link to="/dashboard">
          <button className="backToHomeBtn">Back to Home</button>
        </Link>
      </div>
    </div>
  );
}

export default RequestConfirm;
