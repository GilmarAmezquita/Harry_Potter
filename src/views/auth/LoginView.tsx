import { AccountCircle, Lock } from "@mui/icons-material";
import { Button, InputAdornment, Paper, TextField } from "@mui/material";
import { useState } from 'react'
import { logInWithEmailAndPassword } from "../../firebase";

const LoginView = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    }

    const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    }
    
    const handleLogIn = () => {
        logInWithEmailAndPassword(email, password);
    }

    return (
        <div className="container" style={{ height: '100vh' }}>
            <Paper 
                elevation={3} 
                style={{ padding: '15px',
                        textAlign: 'center'
                    }}>
                <form className="container">
                    <h1 className="gradient-title">
                        <strong>
                            Iniciar Sesión
                        </strong>
                    </h1>
                    <TextField
                        label="Correo de usuario"
                        variant="outlined"
                        margin="normal"
                        type="text"
                        required
                        value={email}
                        onChange={handleChangeEmail}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <AccountCircle />
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
                        onChange={handleChangePassword}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Lock />
                                </InputAdornment>
                            )
                        }}/>
                    <a href="/#/register" style={{ textDecoration: 'none', paddingBottom:'10px' }}>
                        No tienes una cuenta? Registrate
                    </a>
                    <Button 
                        type="submit"
                        variant="contained" 
                        color="primary"
                        onClick={handleLogIn}>
                        Iniciar Sesión
                    </Button>
                </form>
            </Paper>
        </div>
    )
}

export default LoginView;