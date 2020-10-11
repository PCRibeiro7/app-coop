export default theme => ({
    root: {
        flexGrow: 1,

        [theme.breakpoints.up('md')]: {
            border: '1px solid white',
            borderRadius: '4px',
        },
    },

    hideOnSmallScreen: {
        minWidth: '200%',
        marginLeft: '-50%',

        marginBottom: theme.spacing(3),
        [theme.breakpoints.down('md')]: {
            display: 'none',
        },
    },
    grid: {
        marginTop: theme.spacing(2),
    },
    loadingCircle: {
        padding: theme.spacing(3),
        textAlign: 'center',
    },
    main: {
        marginTop: theme.spacing(1),
    },
    button: {
        marginBottom: theme.spacing(2),
    },
    forgotPasswordText: {
        cursor: 'pointer',
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(11),
        transition: 'opacity 0.2s',
        '&:hover': {
            opacity: 0.8,
        },
    },
    logo: {
        width: 210,
        height: 55,
        margin: theme.spacing(2),
    },
    logoLabs: {
        width: 60,
        height: 'auto',
        margin: theme.spacing(1),
    },
    margin: {
        marginTop: theme.spacing(2.5),
    },
    leftBarLabel: {
        backgroundColor: '#fff',
        width: 5,
        height: '100%',
        marginRight: theme.spacing(4),
    },
    labelWrapper: {
        marginLeft: theme.spacing(-6.5),
        marginBottom: theme.spacing(3),
    },
});
