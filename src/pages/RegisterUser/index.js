import React, { useState } from 'react';

import { withStyles } from '@material-ui/core/styles';
import {
    Grid,
    Typography,
    IconButton,
    TextField,
    Button,
    Checkbox,
} from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import style from './styles';
import api from '~/services/api';
import SnackBar from '~/util/SnackBar';

const styles = theme => style(theme);

function RegisterUser({ classes }) {
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
    });

    const handleSubmit = async () => {
        try {
            await api.post('/users', {
                email: user.email,
                password: user.password,
                name: user.name,
            });
            SnackBar.success('Cadastro criado com sucesso');
        } catch (e) {
            SnackBar.error('Erro na criação do cadastro');
        }
    };

    const handleFormChange = (event, name) => {
        const newValue = event.target.value;
        setUser(currentUser => ({
            ...currentUser,
            [name]: newValue,
        }));
    };

    return (
        <>
            <Grid
                container
                justify="center"
                alignItems="center"
                className={classes.navigationContainer}
            >
                <IconButton className={classes.navigateBackIcon}>
                    <ArrowBackIosIcon />
                </IconButton>
                <Typography variant="h6">Novo Cadastro</Typography>
            </Grid>
            <Grid container className={classes.mainContainer} spacing={3}>
                <Grid item xs={12}>
                    <TextField
                        label="Nome Completo"
                        fullWidth
                        variant="outlined"
                        // value={user.name}
                        onChange={e => handleFormChange(e, 'name')}
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        label="Email"
                        fullWidth
                        variant="outlined"
                        // value={user.email}
                        onChange={e => handleFormChange(e, 'email')}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Senha"
                        fullWidth
                        variant="outlined"
                        // value={user.password}
                        onChange={e => handleFormChange(e, 'password')}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Checkbox
                        checked={true}
                        // onChange={handleChange}
                    />
                    <Typography display="inline">
                        Aceito a política de privacidade
                    </Typography>
                </Grid>

                <Grid item xs={12}>
                    <Button fullWidth onClick={handleSubmit}>
                        Criar Cadastro
                    </Button>
                </Grid>
            </Grid>
        </>
    );
}

const wrapperComponent = withStyles(styles)(RegisterUser);

export default wrapperComponent;
