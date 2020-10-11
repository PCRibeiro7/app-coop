export function signInRequest(login, senha) {
    return {
        type: '@auth/SIGN_IN_REQUEST',
        payload: {
            login,
            senha,
        },
    };
}

export function signInSuccess(token, user_mais_vendas) { //eslint-disable-line
    return {
        type: '@auth/SIGN_IN_SUCCESS',
        payload: {
            token,
            user_mais_vendas,
        },
    };
}

export function signFailure() {
    return {
        type: '@auth/SIGN_FAILURE',
    };
}

export function signOut() {
    return {
        type: '@auth/SIGN_OUT',
    };
}
