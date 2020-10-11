import React, { useState } from 'react';

import { withStyles } from '@material-ui/core/styles';
import {
    Typography,
    Toolbar,
    IconButton,
    AppBar,
    Grid,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FilterListIcon from '@material-ui/icons/FilterList';
import ListIcon from '@material-ui/icons/List';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import LeftMenuDrawer from '~/components/LeftMenuDrawer';

import style from './styles';

const styles = theme => style(theme);
function MyAppBar({ classes }) {
    const [openLeftMenuDrawer, setOpenLeftMenuDrawer] = useState(false);

    return (
        <>
            <LeftMenuDrawer
                open={openLeftMenuDrawer}
                handleClose={() => setOpenLeftMenuDrawer(false)}
            />
            <AppBar position="static">
                <Toolbar>
                    <Grid container justify="space-between">
                        <Grid item>
                            <IconButton
                                onClick={() => setOpenLeftMenuDrawer(true)}
                            >
                                <MenuIcon />
                            </IconButton>
                        </Grid>

                        <Grid item>
                            <IconButton>
                                <FavoriteBorderIcon />
                            </IconButton>
                            <IconButton>
                                <SearchIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <Grid container justify="space-evenly" alignItems="center">
                <Grid container justify="center" item xs={4}>
                    <IconButton>
                        <FilterListIcon fontSize="small" />
                    </IconButton>
                    <Typography className={classes.filterText} display="inline">
                        Filtrar
                    </Typography>
                </Grid>
                <Grid container justify="center" item xs={4}>
                    <IconButton>
                        <ListIcon fontSize="small" />
                    </IconButton>
                    <Typography className={classes.filterText} display="inline">
                        Categorias
                    </Typography>
                </Grid>
                <Grid container justify="center" item xs={4}>
                    <IconButton>
                        <LocationOnIcon fontSize="small" />
                    </IconButton>
                    <Typography className={classes.filterText} display="inline">
                        Rio
                    </Typography>
                </Grid>
            </Grid>
        </>
    );
}

const wrapperComponent = withStyles(styles)(MyAppBar);

export default wrapperComponent;
