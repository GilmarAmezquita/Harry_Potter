import { AppBar, Toolbar, IconButton, Tooltip, Box } from '@mui/material';
import { CoffeeMaker, Groups, Home, Login, Logout, Movie } from '@mui/icons-material';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { userProps } from '../store/reducers/auth';
import { logOut } from '../services/firebase/index'
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
        navigate('/');
    }

    const handleCharacters = () => {
        navigate('/characters');
    }

    const handleMovies = () => {
        navigate('/movies');
    }

    const handlePotions = () => {
        navigate('/potions');
    }

    return (
        <AppBar position="static" className='navbar'>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between'}}>
                <Box sx={{ display: 'flex', flexDirection: 'row'}}>
                    <img className="icon" src='./HarryPotter_Icon.png' />
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={handleHome}
                        sx={{ marginRight: '1rem' }}
                    >
                        <Tooltip title="Inicio" arrow>
                            <Home />
                        </Tooltip>
                    </IconButton>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={handleCharacters}
                        sx={{ marginRight: '1rem' }}
                    >
                        <Tooltip title="Personajes" arrow>
                            <Groups />
                        </Tooltip>
                    </IconButton>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={handleMovies}
                        sx={{ marginRight: '1rem' }}
                    >
                        <Tooltip title="Películas" arrow>
                            <Movie />
                        </Tooltip>
                    </IconButton>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={handlePotions}
                        sx={{ marginRight: '1rem' }}
                    >
                        <Tooltip title="Pociones" arrow>
                            <CoffeeMaker />
                        </Tooltip>
                    </IconButton>
                </Box>
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