import { Email, Lock } from "@mui/icons-material";
import { Button, InputAdornment, Paper, TextField } from "@mui/material";
import React, { useState } from 'react'
import { loginWithEmailAndPassword } from "../../firebase";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../store/reducers/auth";
import { alertError, alertLoading, alertSuccess } from "../../components/Alerts/alert";

const LoginView = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const goRegister = () => {
        navigate('/register');
    }

    const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    }

    const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    }

    const handleLogIn = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if (email === '' || password === '') {
            alertError('Por favor, rellene todos los campos');
            return;
        }
        alertLoading();
        loginWithEmailAndPassword(email, password).then((response) => {
            if (response[0].status === 404) {
                alertError('Usuario no encontrado');
                return;
            } else if (response[0].status === 400) {
                alertError('Error al iniciar sesión');
                return;
            }
            alertSuccess('Sesión iniciada correctamente');
            dispatch({
                type: login,
                payload: {
                    uid: response[1].uid,
                    username: response[1].username,
                    email: response[1].email,
                    jwt: response[1].jwt,
                    authProvider: response[1].authProvider
                }
            })
        });
    }

    return (
        <div className="container" style={{ height: '80vh'}}>
            <form>
                <Paper 
                    elevation={3} 
                    style={{ padding: '15px',
                            textAlign: 'center'
                        }}>
                    <div className="container">
                        <h1 className="gradient-title">
                            <strong>
                                Iniciar Sesión
                            </strong>
                        </h1>
                        <TextField
                            label="Correo Electrónico"
                            variant="outlined"
                            margin="normal"
                            type="text"
                            required
                            autoComplete="email"
                            value={email}
                            onChange={handleChangeEmail}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Email />
                                    </InputAdornment>
                                )
                            }}/>
                        <TextField
                            label="Contraseña"
                            variant="outlined"
                            margin="normal"
                            type="password"
                            required
                            autoComplete="current-password"
                            value={password}
                            onChange={handleChangePassword}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Lock />
                                    </InputAdornment>
                                )
                            }}/>
                        <a onClick={goRegister} style={{ paddingBottom:'10px' }}>
                            No tienes una cuenta? Registrate
                        </a>
                        <Button 
                            type="submit"
                            variant="contained" 
                            color="primary"
                            onClick={handleLogIn}>
                            Iniciar Sesión
                        </Button>
                    </div>
                </Paper>
            </form>
        </div>
    )
}

export default LoginView;