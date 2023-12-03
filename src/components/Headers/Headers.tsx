import { Link } from "react-router-dom";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import headerLogo from "../../assets/headerlogo.png";

export const MainHeader: React.FC = () => {
  return (
    <div className="logoDako">
      <img src={headerLogo} className="CSMLogo" />
    </div>
  );
};

export const SecondHeader: React.FC = () => {
  return (
    <div className="sideHeader">
      <Link to="/dashboard" className="customArrowLink">
        <KeyboardBackspaceIcon className="viewArrowIcon" />
      </Link>
      <img src={headerLogo} alt="Header Logo" className="mainlogoView" />
    </div>
  );
};

export const DashboardHeader: React.FC = () => {
  return (
    <div className="logocontainerD">
      <img src={headerLogo} alt="Header Logo" className="mainlogoD" />
    </div>
  );
};