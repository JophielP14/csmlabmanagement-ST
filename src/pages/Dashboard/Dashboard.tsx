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
import { DashboardHeader } from '../../components/Headers/Headers';

// const [selectedStatus, setselectedStatus] = useState("pending");
// const logged_in_user = useSelector((state: RootState) => state.user.user);
// const handleStatusClick = (status: string) => {
//   console.log("Clicked status:", status);
//   setselectedStatus(status);
// };

// const transactions = useQuery({
//   queryKey: ["transactions"],
//   queryFn: TransactionsAPI,
// });

// const navigate = useNavigate();
// const dispatch = useDispatch();


function TSDashboard() {

    return (
        <div className="Container">
            <DashboardHeader/>

            
            
            
        </div>
    )
}

export default TSDashboard;

