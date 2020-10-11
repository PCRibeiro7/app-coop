import { useSnackbar } from 'notistack';
import React from 'react';

const InnerSnackbarUtilsConfigurator = ({ setUseSnackbarRef }) => {
    setUseSnackbarRef(useSnackbar());
    return null;
};

let useSnackbarRef;
const setUseSnackbarRef = useSnackbarRefProp => {
    useSnackbarRef = useSnackbarRefProp;
};

export const SnackbarUtilsConfigurator = () => {
    return (
        <InnerSnackbarUtilsConfigurator setUseSnackbarRef={setUseSnackbarRef} />
    );
};

export default {
    success(msg, options) {
        this.toast(msg, { ...options, variant: 'success' });
    },
    warning(msg, options) {
        this.toast(msg, { ...options, variant: 'warning' });
    },
    info(msg, options) {
        this.toast(msg, { ...options, variant: 'info' });
    },
    error(msg, options) {
        this.toast(msg, { ...options, variant: 'error' });
    },
    toast(msg, options) {
        useSnackbarRef.enqueueSnackbar(msg, options);
    },
};
