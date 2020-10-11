import { takeLatest, call, put, all } from 'redux-saga/effects';
import { signInSuccess, signFailure, signOut } from './actions';
import api from '../../../services/api';
import history from '../../../services/history';
import SnackBar from '../../../util/SnackBar';

export function* signIn({ payload }) {
    try {
        const { login, senha } = payload;

        const response = yield call(api.post, 'session', {
            email: login,
            password: senha,
        });

        const { token, user_mais_vendas } = response.data; //eslint-disable-line
        api.defaults.headers.Authorization = `Bearer ${token}`;
        yield put(signInSuccess(token, user_mais_vendas));
        history.push('/');
    } catch (err) {
        if (!err.response) {
            SnackBar.error('Problemas no servidor');
            return;
        }
        SnackBar.error(err.response.data.error);
        yield put(signFailure());
    }
}

export function* setToken({ payload }) {
    if (!payload) return;

    const { token } = payload.auth;
    const localStorageUser = localStorage.getItem('persist:+vendas');
    if (localStorageUser) {
        const user = JSON.parse(localStorageUser);
        if (user.user) {
            const parsedUser = JSON.parse(user.user);
            if (parsedUser.profile) {
                if (!parsedUser.profile.permissions) {
                    yield put(signOut());
                }
            }
        }
    }

    if (token) {
        api.defaults.headers.Authorization = `Bearer ${token}`;
    }
}

export function redirect() {
    history.push('/login');
}
export default all([
    takeLatest('persist/REHYDRATE', setToken),
    takeLatest('@auth/SIGN_IN_REQUEST', signIn),
    takeLatest('@auth/SIGN_OUT', redirect),
]);
