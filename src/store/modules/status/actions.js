export function statusRequest(isFaturado, dateInit, dateEnd) {
    return {
        type: '@status/STATUS_REQUEST',
        payload: {
            isFaturado,
            dateInit,
            dateEnd,
        },
    };
}
export function changeInitialDate(initialDate) {
    return {
        type: '@status/CHANGE_INITIAL_DATE',
        payload: {
            initialDate,
        },
    };
}
export function changeFinalDate(finalDate) {
    return {
        type: '@status/CHANGE_FINAL_DATE',
        payload: {
            finalDate,
        },
    };
}

export function changeFaturadoStatus(status) {
    return {
        type: '@status/CHANGE_STATUS',
        payload: {
            status,
        },
    };
}

export function statusSuccess(
    mesTotal,
    marcasFormatted,
    mesMarcaFormatted,
    dataHeader
) {
    return {
        type: '@status/STATUS_SUCCESS',
        payload: {
            mesTotal,
            marcasFormatted,
            mesMarcaFormatted,
            dataHeader,
        },
    };
}

export function statusFailure() {
    return {
        type: '@status/STATUS_FAILURE',
    };
}

export function changeInsights(showInsig) {
    return {
        type: '@status/CHANGE_INSIGHTS',
        payload: {
            showInsig,
        },
    };
}
