import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    typography: {
        fontFamily: 'Metropolis',
    },
    palette: {
        primary: {
            main: '#DB3022',
        },
        secondary: {
            main: '#000000',
        },
    },
    overrides: {
        MuiTypography: {},
        MuiAppBar: {
            colorPrimary: {
                backgroundColor: 'white',
            },
        },
        MuiDrawer: {
            paper: {
                width: '80%',
            },
        },
        MuiFab: {
            root: {
                textTransform: 'none',
            },
        },
        MuiButton: {
            root: {
                backgroundColor: '#DB3022',
                color: 'white',
                borderRadius: '25px',
                height: '48px',
                '&:hover': {
                    backgroundColor: '#DB3022',
                },
            },
        },
        MuiOutlinedInput: {
            input: {
                backgroundColor: 'white',
            },
        },
        MuiToggleButton: {
            root: {
                backgroundColor: 'white',
                color: 'black',
                textTransform: 'none',
                '&.Mui-selected': {
                    backgroundColor: '#DB3022',
                    color: 'white',
                },
            },
        },
    },
});

export default theme;
