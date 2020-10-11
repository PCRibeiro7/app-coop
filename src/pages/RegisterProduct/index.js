import React, { useState } from 'react';
// import ImageUploader from 'react-images-upload';

import { withStyles } from '@material-ui/core/styles';
import {
    Grid,
    Typography,
    IconButton,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button,
} from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import api from '~/services/api';
import SnackBar from '~/util/SnackBar';

import style from './styles';
import { useHistory } from 'react-router-dom';

const styles = theme => style(theme);
const categories = [
    'Alimentação',
    'Comunicação',
    'Construção/Engenharia',
    'Transportes',
    'Educacionais',
    'Financeiros',
    'Turismo',
    'Diversão/Cultura',
    'Outros',
];
function RegisterProduct({ classes }) {
    const [product, setProduct] = useState({
        title: '',
        description: '',
        category: '',
        cep: '',
        payment_preference: 'todas',
    });
    const history = useHistory();

    const handleSubmit = async () => {
        try {
            await api.post('/services', {
                title: product.title,
                description: product.description,
                category: product.category,
                cep: product.cep,
                payment_preference: product.payment_preference,
            });
            SnackBar.success('Cadastro criado com sucesso');
        } catch (e) {
            SnackBar.error('Erro na criação do cadastro');
        }
    };

    const handleFormChange = (newValue, name) => {
        setProduct(currentProduct => ({
            ...currentProduct,
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
                <IconButton className={classes.navigateBackIcon} onClick={()=>history.push('/')}>
                    <ArrowBackIosIcon />
                </IconButton>
                <Typography variant="h6">Cadastrar Anúncio</Typography>
            </Grid>
            <Grid
                container
                className={classes.mainContainer}
                justify="center"
                spacing={3}
            >
                {/* <Grid item xs={12}>
                    <ImageUploader
                        withIcon
                        buttonText="Escolha a foto"
                        label="Adicione a imagem do seu produto"
                        onChange={(image)=>console.log("ALOU")}
                    />
                </Grid> */}
                <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        label="Título do Anúncio"
                        fullWidth
                        onChange={e =>
                            handleFormChange(e.target.value, 'title')
                        }
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        label="Descrição"
                        fullWidth
                        onChange={e =>
                            handleFormChange(e.target.value, 'description')
                        }
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormControl
                        className={classes.formControl}
                        variant="outlined"
                    >
                        <InputLabel>Todas as Categorias</InputLabel>
                        <Select
                            onChange={e =>
                                handleFormChange(e.target.value, 'category')
                            }
                            value={product.category}
                        >
                            {categories.map(category => (
                                <MenuItem key={category} value={category}>
                                    {category}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        label="CEP"
                        fullWidth
                        onChange={e => handleFormChange(e.target.value, 'cep')}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Typography>
                        <strong>Preferência de Negociação</strong>
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Grid container justify="center">
                        <ToggleButtonGroup
                            exclusive
                            onChange={(e, newValue) =>
                                handleFormChange(newValue, 'payment_preference')
                            }
                            value={product.payment_preference}
                        >
                            <ToggleButton value="todas">
                                <Typography>Todas</Typography>
                            </ToggleButton>
                            <ToggleButton value="troca">
                                <Typography>Troca</Typography>
                            </ToggleButton>
                            <ToggleButton value="pagamento">
                                <Typography>Pagamento</Typography>
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Button fullWidth onClick={handleSubmit}>
                        Publicar Anúncio
                    </Button>
                </Grid>
            </Grid>
        </>
    );
}

const wrapperComponent = withStyles(styles)(RegisterProduct);

export default wrapperComponent;
