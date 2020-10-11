import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import { Fab, Grid, Typography } from '@material-ui/core';
import style from './styles';
import ProductCard from '~/components/ProductCard';
import AppBar from '~/components/AppBar';
import api from '~/services/api';

const styles = theme => style(theme);
function Home({ classes }) {
    const [products, setProducts] = useState({ loaded: false, data: [] });
    const history = useHistory();

    useEffect(() => {
        const loadPage = async () => {
            const response = await api.get('/services');
            setProducts({ loaded: true, data: response.data });
        };
        loadPage();
    }, []);
    return (
        <>
            <Grid className={classes.mainContainer}>
                <AppBar />
                <Grid container>
                    <Grid
                        container
                        justify="space-between"
                        item
                        xs={12}
                        className={classes.headerContainer}
                    >
                        <Typography variant="h4">
                            <strong>Novidades</strong>
                        </Typography>
                        <Typography className={classes.seeAllText}>
                            Ver Tudo
                        </Typography>
                    </Grid>
                    <Grid container justify="space-evenly" item xs={12}>
                        {products.data.map(product => (
                            <Grid item xs={5} md={3}>
                                <ProductCard product={product} />
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
                <Fab
                    color="primary"
                    variant="extended"
                    className={classes.floatingActionButton}
                    onClick={() => history.push('/register_product')}
                >
                    Quero Anunciar!
                </Fab>
            </Grid>
        </>
    );
}

const wrapperComponent = withStyles(styles)(Home);

export default wrapperComponent;
