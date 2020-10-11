import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';

import { withStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';

import { Avatar, Grid, IconButton, Paper, Typography } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ShareIcon from '@material-ui/icons/Share';
import { Rating } from '@material-ui/lab';

import style from './styles';
import api from '~/services/api';

const styles = theme => style(theme);
function Product({ classes, ...props }) {
    const [product, setProduct] = useState({});
    const history = useHistory();
    useEffect(() => {
        const loadPage = async () => {
            const response = await api.get(`/services/${props.match.params.id}`);
            setProduct(response.data);
        };
        loadPage();
    }, [props.match.params.id]);
    return (
        <>
            <Grid
                container
                justify="space-between"
                alignItems="center"
                className={classes.navigationContainer}
            >
                <IconButton onClick={()=>history.push('/')}>
                    <ArrowBackIosIcon />
                </IconButton>
                <Typography variant="h6">Anúncio</Typography>
                <IconButton>
                    <ShareIcon />
                </IconButton>
            </Grid>
            <Grid container>
                <Grid item xs={12}>
                    <img
                        width="100%"
                        alt="Imagem do Produto"
                        src="https://www.handletheheat.com/wp-content/uploads/2015/03/Best-Birthday-Cake-with-milk-chocolate-buttercream-SQUARE-550x550.jpg"
                    />
                </Grid>
            </Grid>
            <Grid container className={classes.mainContainer} spacing={3}>
                <Grid item xs={12} container>
                    <Grid
                        item
                        xs={2}
                        container
                        justify="flex-start"
                        alignItems="flex-start"
                    >
                        <Avatar></Avatar>
                    </Grid>
                    <Grid item xs={8}>
                        <Typography align="left" display="block" variant="h6">
                            {product?.owner?.name}
                        </Typography>
                        <Typography align="left" display="block">
                            Ver Perfil
                        </Typography>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h5" display="block">
                        <strong>{product.title}</strong>
                    </Typography>
                    <Typography variant="caption" display="block">
                        {`${format(
                            new Date(product.createdAt || '2020-01-01T20:10:19.282Z'),
                            'dd/MM/yyyy'
                        )}, ${product.cep}`}
                    </Typography>
                    <Rating value={4} readOnly></Rating>
                </Grid>
                <Grid item xs={12}>
                    <Typography display="block">
                        {product.description}
                    </Typography>
                </Grid>
                <Grid item xs={12} container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h6" display="block">
                            <strong>Preferencia de negociação</strong>
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography
                            style={{
                                border: '1px solid black',
                                borderRadius: '8px',
                                width: 'fit-content',
                                padding: '8px',
                            }}
                        >
                            {product.payment_preference}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid item xs={12} container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h6" display="block">
                            <strong>1 comentário</strong>
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper style={{ padding: '24px' }}>
                            <Grid container spacing={1}>
                                <Grid
                                    item
                                    xs={2}
                                    container
                                    justify="flex-start"
                                    alignItems="center"
                                >
                                    <Avatar></Avatar>
                                </Grid>
                                <Grid item xs={8}>
                                    <Typography
                                        align="left"
                                        display="block"
                                        variant="h6"
                                    >
                                        Marcela Dias
                                    </Typography>
                                    <Rating value={4} />
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography>
                                        A luiza é uma excelente profissional,
                                        honesta e dedicada.
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
                {/* <Fab
                    color="primary"
                    variant="extended"
                    className={classes.floatingActionButton}
                >
                    Conversar com anunciante
                </Fab> */}
            </Grid>
        </>
    );
}

const wrapperComponent = withStyles(styles)(Product);

export default wrapperComponent;
