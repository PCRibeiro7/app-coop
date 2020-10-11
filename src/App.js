import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { Router } from 'react-router-dom';
import './config/ReactotronConfig';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import { SnackbarProvider } from 'notistack';
import { SnackbarUtilsConfigurator } from './util/SnackBar';
import GlobalStyle from './styles/global';
import theme from './styles/theme';

import Routes from './routes';
import { store, persistor } from './store';

import history from './services/history';

function App() {
    return (
        <SnackbarProvider
            maxSnack={3}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            autoHideDuration={3500}
        >
            <SnackbarUtilsConfigurator />

            <Provider store={store}>
                <PersistGate persistor={persistor}>
                    <ThemeProvider theme={theme}>
                        <Router history={history}>
                            <Routes />
                            <GlobalStyle />
                        </Router>
                    </ThemeProvider>
                </PersistGate>
            </Provider>
        </SnackbarProvider>
    );
}

export default App;
