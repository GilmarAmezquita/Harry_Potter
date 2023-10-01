import { AccountCircle, EmailRounded, Lock, Phone } from "@mui/icons-material";
import { Button, InputAdornment, Paper, TextField } from "@mui/material";
import React, { useState } from "react";
import { registerWithEmailAndPassword } from "../../firebase";
import { alertError, alertSuccess } from "../../components/Alerts/alert";
import { useNavigate } from "react-router-dom";

const RegisterView = () => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [passwordConfirm, setPasswordConfirm] = useState<string>('');

    const navigate = useNavigate();

    const goLogin = () => {
        navigate('/login');
    }

    const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    }

    const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    }

    const handleChangePhone = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPhone(event.target.value);
    }

    const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    }

    const handleChangePasswordConfirm = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordConfirm(event.target.value);
    }

    const handleRegister = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if (name === '' || email === '' || password === '' || passwordConfirm === '' || phone === '') {
            alertError('Por favor, rellene todos los campos');
            return;
        }
        if (password !== passwordConfirm) {
            alertError('Las contraseñas no coinciden');
            return;
        }
        registerWithEmailAndPassword(name, email, password, phone);
        alertSuccess('Usuario registrado correctamente');
        navigate('/#/login');
    }

    return (
        <div className="container" style={{height: '90vh'}}>
            <form>
                <Paper 
                    elevation={3} 
                    style={{ padding: '15px',
                            textAlign: 'center'
                        }}>
                    <div className="container">
                        <h1 className="gradient-title">
                            <strong>
                                Registrate Aqui
                            </strong>
                        </h1>
                        <TextField
                            label="Nombre de usuario"
                            variant="outlined"
                            margin="normal"
                            type="text"
                            required
                            value={name}
                            onChange={handleChangeName}
                            autoComplete="off"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AccountCircle />
                                    </InputAdornment>
                                )
                            }}/>
                        <TextField
                            label="Correo de usuario"
                            variant="outlined"
                            margin="normal"
                            type="text"
                            required
                            value={email}
                            onChange={handleChangeEmail}
                            autoComplete="off"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <EmailRounded />
                                    </InputAdornment>
                                )
                            }}/>
                        <TextField
                            label="Telefono"
                            variant="outlined"
                            margin="normal"
                            type="text"
                            required
                            value={phone}
                            onChange={handleChangePhone}
                            autoComplete="off"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Phone />
                                    </InputAdornment>
                                )
                            }}/>
                        <TextField
                            label="Contraseña"
                            variant="outlined"
                            margin="normal"
                            type="password"
                            required
                            value={password}
                            error={password !== passwordConfirm}
                            onChange={handleChangePassword}
                            autoComplete="off"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Lock />
                                    </InputAdornment>
                                )
                            }}/>
                        <TextField
                            label="Confirmar contraseña"
                            variant="outlined"
                            margin="normal"
                            type="password"
                            required
                            value={passwordConfirm}
                            error={password !== passwordConfirm}
                            onChange={handleChangePasswordConfirm}
                            autoComplete="off"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Lock />
                                    </InputAdornment>
                                )
                            }}/>
                        <a onClick={goLogin} style={{ paddingBottom:'10px' }}>
                            ¿Ya tienes una cuenta? Inicia sesión
                        </a>
                        <Button
                            type="submit"
                            variant="contained" 
                            color="primary"
                            onClick={handleRegister}
                            >
                            Registrate
                        </Button>
                    </div>
                </Paper>
            </form>
        </div>
    )
}

export default RegisterView;