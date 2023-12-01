import * as React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { InputAdornment, TextField, Modal, Box, Button } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { Link, useNavigate } from 'react-router-dom';

function ForgotPassword() {
    const [email, setEmail] = React.useState('');
    const [emailError, setEmailError] = React.useState('');
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const history = useNavigate();

    const validateEmail = (email: string) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailRegex.test(email);
    }

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
        setEmailError('');
    }

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        if (!validateEmail(email)) {
            setEmailError('Invalid email address');
        } else {
            // Email is valid, perform your submit logic here
            // For example, send a reset password request
            setIsModalOpen(true);
        }
    }

    const handleCloseModal = () => {
        setIsModalOpen(false);
        history("/");
    }

    return (
        <div className='forgotPassPageContainer'>
            <div className="arrowContainer">
                <Link to="/">
                    <button className="arrowButton">
                        <ArrowBackIcon sx={{ width: 40, height: 40 }} />
                    </button>
                </Link>
            </div>
            <div className='contentContainer'>
                <div className='content'>
                    <div className='forgotPasswordHText'>
                        <h1 className='hText'>Forgot Password</h1>
                    </div>
                    <div className="form-container">
                        <form onSubmit={handleSubmit}>
                            <div className='labelContainer'>
                                <p>Enter your Email Address</p>
                            </div>
                            <div>
                                <TextField
                                    id="input-with-icon-textfield"
                                    placeholder='Email Address'
                                    sx={{
                                        width: 309,
                                        marginBottom: 3,
                                    }}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position='end'>
                                                <PersonIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                    variant="standard"
                                    value={email}
                                    onChange={handleEmailChange}
                                    error={emailError !== ''}
                                    helperText={emailError}
                                />
                            </div>
                            <button type='submit' className='requestButton'>Request Reset Password</button>
                        </form>
                    </div>
                </div>
            </div>
            <Modal open={isModalOpen} onClose={handleCloseModal}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 300,
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                        textAlign: 'center',
                    }}
                >
                    <h2>Reset Password Email Sent</h2>
                    <Button onClick={handleCloseModal} variant="contained" color='success'>
                        Back to Login
                    </Button>
                </Box>
            </Modal>
        </div>
    );
}

export default ForgotPassword;