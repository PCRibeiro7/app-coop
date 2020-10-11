import React from 'react';
import { format } from 'date-fns';
import { withStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography, Grid } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import { useHistory } from 'react-router-dom';

import style from './styles';

const styles = theme => style(theme);
function ProductCard({ classes, ...props }) {
    const history = useHistory();
    return (
        <>
            <Card
                className={classes.productCard}
                onClick={() => {
                    history.push(`/product/${props.product._id}`);
                }}
            >
                <img
                    className={classes.productImage}
                    alt="Imagem do Produto"
                    src={props.productImage}
                    // style={{ width: '100%' }}
                />
                <CardContent>
                    <Grid container>
                        <Rating
                            value={props.ratingValue}
                            readOnly
                            size="small"
                        />
                        <Typography display="inline">{`(${props.ratingCount})`}</Typography>
                    </Grid>
                    <Typography>{`${format(
                        new Date(props.product.createdAt),
                        'dd/MM/yyyy'
                    )}, ${props.product.cep}`}</Typography>
                    <Typography
                        style={{
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                        }}
                    >
                        <strong>{props.product.title}</strong>
                    </Typography>
                </CardContent>
            </Card>
        </>
    );
}

ProductCard.defaultProps = {
    productImage:
        'https://www.handletheheat.com/wp-content/uploads/2015/03/Best-Birthday-Cake-with-milk-chocolate-buttercream-SQUARE-550x550.jpg',
    ratingValue: 4,
    ratingCount: 3,
    productDate: '10 de outubro',
    productNeighborhood: 'Madureira',
    productTitle: 'Bolos Confeitados',
};

const wrapperComponent = withStyles(styles)(ProductCard);

export default wrapperComponent;
