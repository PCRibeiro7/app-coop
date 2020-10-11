import React, { useState } from 'react';
import { TextField, Typography } from '@material-ui/core';

import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { useDispatch, useSelector } from 'react-redux';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import CircularProgress from '@material-ui/core/CircularProgress';

import Container from '@material-ui/core/Container';
import style from './styles';
import api from '~/services/api';
import Snackbar from '~/util/SnackBar';
import { signInRequest } from '~/store/modules/auth/actions';

const styles = theme => style(theme);
function Login({ classes }) {
    const dispatch = useDispatch();
    const [userLogin, setUserLogin] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [sentTo, setSentTo] = useState('');
    const [loadingForgotPassword, setLoadingForgotPassword] = useState(false);

    const [passwordError, setPasswordError] = useState('');
    const [loginError, setLoginError] = useState('');

    const loading = useSelector(state => state.auth.loading);
    function isValidForm() {
        if (!userLogin || !password) {
            if (!userLogin) {
                setLoginError('Este campo precisa ser preenchido');
            } else {
                setLoginError('');
            }
            if (!password) {
                setPasswordError('Este campo precisa ser preenchido');
            } else {
                setPasswordError('');
            }
            return false;
        }
        return true;
    }
    async function handleSignIn() {
        if (!isValidForm()) return;
        if (!showForgotPassword) {
            dispatch(signInRequest(userLogin, password));
        } else {
            try {
                setLoadingForgotPassword(true);
                const response = await api.post('change_key', {
                    login: userLogin,
                });
                setSentTo(response.data.sentTo);
                Snackbar.success(`Email enviado com sucesso!`);
            } catch (err) {
                if (err.response) {
                    Snackbar.error(`${err.response.data.error}`);
                }
            } finally {
                setLoadingForgotPassword(false);
            }
        }
    }

    function handleKeyPress(eve) {
        if (eve.key === 'Enter') {
            handleSignIn();
        }
    }

    return (
        <>
            {/* <CssBaseline /> */}
            <Grid
                container
                justify="center"
                alignItems="center"
                style={{ height: '100vh' }}
            >
                <Container className={classes.root}>
                    <Grid
                        container
                        justify="center"
                        alignItems="center"
                        className={classes.grid}
                    >
                        <Grid item xs={12} sm={4} className={classes.grid}>
                            <Container className={classes.main}>
                                <Grid
                                    item
                                    md={12}
                                    className={classes.hideOnSmallScreen}
                                ></Grid>
                                <Grid container justify="center" spacing={24}>
                                    <Grid
                                        className={classes.labelWrapper}
                                        container
                                        item
                                        justify="flex-start"
                                        direction="row"
                                        alignItems="center"
                                    >
                                        <div className={classes.leftBarLabel} />
                                        <Typography variant="h4" component="p">
                                            <strong>Entrar</strong>
                                        </Typography>
                                        <Grid item />
                                    </Grid>

                                    {showForgotPassword ? (
                                        <Grid
                                            item
                                            xs={12}
                                            style={{ marginBottom: 20 }}
                                        >
                                            <TextField
                                                id="email"
                                                color="primary"
                                                // error={!!usernameError}
                                                className={classes.margin}
                                                variant="outlined"
                                                fullWidth
                                                autoFocus
                                                label="Login cadastrado"
                                                value={userLogin}
                                                onChange={e =>
                                                    setUserLogin(e.target.value)
                                                }
                                                onKeyUp={e => handleKeyPress(e)}
                                                helperText={
                                                    sentTo &&
                                                    `Email enviado para ${sentTo}`
                                                }
                                            />
                                        </Grid>
                                    ) : (
                                        <>
                                            <Grid item xs={12}>
                                                <TextField
                                                    id="username"
                                                    color="primary"
                                                    error={loginError}
                                                    helperText={loginError}
                                                    className={classes.margin}
                                                    variant="outlined"
                                                    fullWidth
                                                    autoFocus
                                                    label={'Email'}
                                                    value={userLogin}
                                                    onChange={e => {
                                                        setLoginError('');
                                                        setUserLogin(
                                                            e.target.value
                                                        );
                                                    }}
                                                    onKeyUp={e =>
                                                        handleKeyPress(e)
                                                    }

                                                    // helperText={usernameError}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    id="password"
                                                    error={passwordError}
                                                    helperText={passwordError}
                                                    className={classes.margin}
                                                    variant="outlined"
                                                    fullWidth
                                                    label={'Senha'}
                                                    type={
                                                        showPassword
                                                            ? 'text'
                                                            : 'password'
                                                    }
                                                    value={password}
                                                    onChange={e => {
                                                        setPasswordError('');
                                                        setPassword(
                                                            e.target.value
                                                        );
                                                    }}
                                                    onKeyUp={e =>
                                                        handleKeyPress(e)
                                                    }
                                                    // helperText={passwordError}
                                                    InputProps={{
                                                        endAdornment: (
                                                            <InputAdornment position="end">
                                                                <IconButton
                                                                    aria-label="Mostrar senha"
                                                                    onClick={() =>
                                                                        setShowPassword(
                                                                            !showPassword
                                                                        )
                                                                    }
                                                                    color="primary"
                                                                >
                                                                    {showPassword ? (
                                                                        <VisibilityOff />
                                                                    ) : (
                                                                        <Visibility />
                                                                    )}
                                                                </IconButton>
                                                            </InputAdornment>
                                                        ),
                                                    }}
                                                />
                                            </Grid>
                                        </>
                                    )}

                                    <Grid item xs={12}>
                                        <Typography
                                            onClick={() =>
                                                setShowForgotPassword(
                                                    !showForgotPassword
                                                )
                                            }
                                            align="center"
                                            component="p"
                                            className={
                                                classes.forgotPasswordText
                                            }
                                        >
                                            {!showForgotPassword
                                                ? 'Esqueceu sua senha?'
                                                : 'Voltar'}
                                        </Typography>
                                        <Button
                                            id="submit"
                                            variant="contained"
                                            color="primary"
                                            className={classes.button}
                                            fullWidth
                                            onClick={handleSignIn}
                                        >
                                            {loading ||
                                            loadingForgotPassword ? ( // eslint-disable-line
                                                <CircularProgress
                                                    color="#000000"
                                                    size={26}
                                                />
                                            ) : showForgotPassword ? (
                                                'Recuperar senha'
                                            ) : (
                                                ' ENTRAR'
                                            )}
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Container>
                        </Grid>
                    </Grid>
                </Container>
            </Grid>
        </>
    );
}

const wrapperComponent = withStyles(styles)(Login);

export default wrapperComponent;
