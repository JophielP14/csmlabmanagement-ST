import { Link } from 'react-router-dom'
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import HeaderLogo from "../../assets/headerlogo.png";
import TextField from '@mui/material/TextField';


function RegistrationForm() {
    return (
        <div>
            <div className="headerContainer">
                {/* Arrow in the Header */}
                <div className="arrowContainer">
                    <Link to="/" className="customArrowLink">
                        <ArrowBackIcon sx={{ width: 30, height: 30 }} />
                    </Link>
                </div>
                <div className="logoContainer">
                    <img src={HeaderLogo} alt="logo" />
                </div>
            </div>

            <div className='allFormContainerReg' >
                <div>
                    <div><h1>Create an Account</h1></div>
                    <div><p>Fill up the Following</p></div>
                </div>
                <form>
                    <div className='inputFieldContainer'>
                        <TextField
                            className='inputFieldReg'
                            required
                            id="outlined-required"
                            label="Student ID"
                            placeholder='Student ID'
                            InputLabelProps={{
                                style: { marginLeft: 0 },
                            }}
                        />
                    </div>
                    <div className='inputFieldContainer'>
                        <TextField
                            required
                            className='inputFieldReg'
                            id="outlined-required"
                            label="Student ID"
                            placeholder='Student ID'
                            InputLabelProps={{
                                style: { marginLeft: 0 }, 
                            }}
                        />
                    </div>
                    <div className='inputFieldContainer'>
                        <TextField
                            required
                            className='inputFieldReg'
                            id="outlined-required"
                            label="Student ID"
                            placeholder='Student ID'
                            InputLabelProps={{
                                style: { marginLeft: 0 }, 
                            }}
                        />
                    </div>
                    <div className='inputFieldContainer'>
                        <TextField
                            required
                            className='inputFieldReg'
                            id="outlined-required"
                            label="Student ID"
                            placeholder='Student ID'
                            InputLabelProps={{
                                style: { marginLeft: 0 }, 
                            }}
                        />
                    </div>
                    <div className='inputFieldContainer'>
                        <TextField
                            required
                            className='inputFieldReg'
                            id="outlined-required"
                            label="Student ID"
                            placeholder='Student ID'
                            InputLabelProps={{
                                style: { marginLeft: 0 },
                            }}
                        />
                    </div>
                    <div><button className='signupButton'>Sign Up</button></div>
                </form>
                <div className="orStyles">
                    <div className="line"></div>
                    <p className="orP">or</p>
                    <div className="line"></div>
                </div>
                <div className='toLoginPage'><p>Already have an account? <span><Link to='/'><a className='toLogin'>Login</a></Link></span></p></div>
            </div>
        </div>
    );
}

export default RegistrationForm;