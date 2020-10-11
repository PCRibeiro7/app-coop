import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

export default reducers => {
    const persistedReducer = persistReducer(
        {
            key: '+vendas',
            storage,
            whitelist: ['auth', 'user', 'status'],
        },
        reducers
    );

    return persistedReducer;
};
