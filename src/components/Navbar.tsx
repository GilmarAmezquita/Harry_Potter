import { AppBar, Toolbar, Typography, IconButton, Tooltip } from '@mui/material';
import { Home, Login, Logout } from '@mui/icons-material';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { userProps } from '../store/reducers/auth';
import { logOut } from '../firebase/index'
import { logout } from "../store/reducers/auth";
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const user:userProps = useSelector((state: RootState) => state.value);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogOut = () => {
        logOut();
        dispatch({
            type: logout
        });
    }

    const handleLogIn = () => {
        navigate('/login');
    }

    const handleHome = () => {
        navigate('/home');
    }

    return (
        <AppBar position="static" className='navbar'>
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    onClick={handleHome}
                >
                    <Tooltip title="Inicio" arrow>
                        <Home />
                    </Tooltip>
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    News
                </Typography>
                {user.uid ? (
                    <IconButton color='warning' onClick={handleLogOut} >
                        <Tooltip title="Cerrar sesión" arrow>
                            <Logout />
                        </Tooltip>
                    </IconButton>
                ) : (
                    <IconButton color='success' onClick={handleLogIn}>
                        <Tooltip title="Iniciar sesión" arrow>
                            <Login />
                        </Tooltip>
                    </IconButton>
                )}
            </Toolbar>
        </AppBar>
    )
}

export default Navbar;