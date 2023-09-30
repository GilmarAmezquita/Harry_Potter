import { AccountCircle, Lock } from "@mui/icons-material";
import { Button, InputAdornment, Paper, TextField } from "@mui/material";
import { useState } from 'react'
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "@firebase/auth";
import { useDispatch } from "react-redux";
import { login } from "../../store/reducers/auth";
import { useNavigate } from "react-router-dom";

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
    
    const handleLogIn = () => {
        signInWithEmailAndPassword(auth, email, password).then((response) => {     
            dispatch({
                type: login,
                payload: {
                    uid: response.user.uid,
                    name: response.user.displayName,
                    email: response.user.email,
                    jwt: response.user.refreshToken,
                    authProvider: response.user.providerId
                }
            })
            navigate('/home');
        });
    }

    return (
        <div className="container" style={{ height: '80vh'}}>
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
        </div>
    )
}

export default LoginView;