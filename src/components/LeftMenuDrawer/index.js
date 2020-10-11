import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import {
    Avatar,
    Drawer,
    Grid,
    List,
    ListItem,
    ListItemText,
    Typography,
} from '@material-ui/core';

import style from './styles';

const styles = theme => style(theme);

const listOptions = [
    { primaryText: 'Meus Anúncios', secondaryText: 'Acompanhe seu anúncio' },
    { primaryText: 'Conversas', secondaryText: 'Suas negociações' },
    { primaryText: 'Favoritos', secondaryText: 'Anúncios que você curtiu' },
    { primaryText: 'Minha Conta', secondaryText: 'Seus dados pessoais' },
    {
        primaryText: 'Carteira',
        secondaryText: 'Transações e meios de pagamento',
    },
];
function LeftMenuDrawer({ classes, ...props }) {
    return (
        <>
            <Drawer open={props.open} onClose={props.handleClose}>
                <Grid container className={classes.mainContainer}>
                    <Grid item xs={12} container justify="center">
                        <Grid
                            item
                            xs={4}
                            container
                            justify="center"
                            alignItems="center"
                        >
                            <Avatar></Avatar>
                        </Grid>
                        <Grid item xs={8}>
                            <Typography display="block">Maria Silva</Typography>
                            <Typography display="block">
                                mariasilva@gmail.com
                            </Typography>
                        </Grid>
                    </Grid>
                    <List>
                        {listOptions.map(option => (
                            <ListItem button key={option.primaryText}>
                                <ListItemText
                                    primary={option.primaryText}
                                    secondary={option.secondaryText}
                                />
                            </ListItem>
                        ))}
                    </List>
                </Grid>
            </Drawer>
        </>
    );
}

const wrapperComponent = withStyles(styles)(LeftMenuDrawer);

export default wrapperComponent;
