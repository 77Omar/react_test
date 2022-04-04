import {FormControl} from '@material-ui/core';
import LoginStyle from './loginStyle';
import Grid from '@mui/material/Grid';
import { InputAdornment, OutlinedInput, Stack, IconButton, Button } from '@mui/material';
import { VisibilityOff } from '@material-ui/icons';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import React, { useState } from 'react';
import { EmailOutlined } from '@mui/icons-material';
import AuthService from "../../core/service/AuthService";


const Login = (props) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [values, setValues] = React.useState({
        showPassword: false,
    });

    const initialValues = {username: "", password: ""};
    const [formValues, setFormValues] = useState(initialValues);
    const [isSubmit, setIsSubmit] = useState(false);

    const [ open, setOpen] = React.useState(false);

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
        const {name, value} = event.target;
        setFormValues({...formValues, [name]: value});
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
        const {name, value} = event.target;
        setFormValues({...formValues, [name]: value});
    }

    const handleLogin = (event) => {
        event.preventDefault();
        setIsSubmit(true);
        setOpen(true);
        AuthService.login(username, password).then(
            (res) => {
                props.history.push("/transaction");
            }
        ).catch((e)=>{
            setOpen(false);
            console.log("Login ou Mot de Passe Incorrect!!!")
        });
    }

    const classes = LoginStyle();

    return (
        <>
            <Grid container className={classes.loginpage}>

                <Grid borderRadius="25%" style={{ width: '100%', zIndex: 2, marginTop: "12em", opacity: "80%"}} className={classes.loginContent}>
                    <Stack alignItems={"center"} spacing={2}>
                        <FormControl fullWidth sx={{ m: 1 }}>
                            <OutlinedInput
                                id="username"
                                placeholder="username"
                                name="username"
                                value={values.username}
                                startAdornment={
                                    <InputAdornment position="start">
                                        {/* <PersonOutline></PersonOutline> */}
                                        <EmailOutlined></EmailOutlined>
                                    </InputAdornment>}

                                onChange={handleUsernameChange}
                            />
                        </FormControl>

                        {/* Input Password */}
                        <FormControl fullWidth>
                            <OutlinedInput
                                id='password'
                                placeholder='password'
                                name="password"
                                type={values.showPassword ? 'text' : 'password'}
                                value={values.password}
                                startAdornment={
                                    <InputAdornment position="start">
                                        <LockOutlinedIcon></LockOutlinedIcon>
                                    </InputAdornment>
                                }
                                endAdornment={
                                    <InputAdornment position='end'>
                                        <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} >
                                            <VisibilityOff />
                                        </IconButton>
                                    </InputAdornment>
                                }
                                onChange={handlePasswordChange}
                            >
                            </OutlinedInput>
                        </FormControl>
                        <Button sx={{ backgroundColor: "#FF6600", width: "100%", marginTop: "30px", '&:hover':{backgroundColor: "#000000"} }} variant="contained"
                                onClick={handleLogin} >Se connecter</Button>

                    </Stack>
                </Grid>
            </Grid>

        </>
    )
}


export default Login
