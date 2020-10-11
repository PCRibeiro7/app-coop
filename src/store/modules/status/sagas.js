import 'moment/locale/pt-br';
import * as moment from 'moment';
import { takeLatest, call, put, all } from 'redux-saga/effects';
import { formatWithoutCent } from '~/util/format';
import { signOut } from '../auth/actions';
import {
    statusSuccess,
    statusFailure,
    changeFinalDate,
    changeInitialDate,
} from './actions';
import api from '~/services/api';
import SnackBar from '~/util/SnackBar';

export function* fetchStatus({ payload }) {
    try {
        const { isFaturado, dateInit, dateEnd } = payload;
        const { response, mesResponse } = yield all({
            response: call(
                api.get,
                `/status?dateInit=${dateInit &&
                    moment(dateInit).format('YYYY-MM-DD')}&dateEnd=${dateEnd &&
                    moment(dateEnd).format(
                        'YYYY-MM-DD'
                    )}&faturamento=${isFaturado}`
            ),
            mesResponse: call(
                api.get,
                `/status?dateInit=${moment().format(
                    'YYYY-MM-01'
                )}&dateEnd=${moment().format(
                    'YYYY-MM-DD'
                )}&faturamento=${isFaturado}`
            ),
        });

        const marcasFormatted = response.data.marcas.map(marca => ({
            ...marca,
            fp_venda: formatWithoutCent(marca.venda),
            fp_cota: formatWithoutCent(marca.cota),
            fp_MACO: formatWithoutCent(marca.MACO),
            fp_venda_projetada: formatWithoutCent(marca.venda_projetada),
            vendaK: (marca.venda / 1000).toFixed(1),
            vendaMi: (marca.venda / 1000000).toFixed(1),
            cotaK: (parseFloat(marca.cota) / 1000).toFixed(1),
            cotaMi: (parseFloat(marca.cota) / 1000000).toFixed(1),
        }));

        const mesMarcaFormatted = mesResponse.data.marcas.map(marca => ({
            ...marca,
            mi_venda: (parseFloat(marca.venda) / 1000000).toFixed(1),
            mi_cota: (parseFloat(marca.cota) / 1000000).toFixed(1),
        }));
        let mesTotal = {};
        if (mesResponse) {
            mesTotal = {
                ...mesResponse.data.total,
                mi_venda_total: (
                    parseFloat(mesResponse.data.total.venda_total) / 1000000
                ).toFixed(1),
                mi_cota_total: (
                    parseFloat(mesResponse.data.total.cota_total) / 1000000
                ).toFixed(1),
            };
        }
        const keys = Object.keys(response.data.total);
        keys.forEach(key => {
            response.data.total[`mi_${key}`] = (
                parseFloat(response.data.total[key]) / 1000000
            ).toFixed(1);
            response.data.total[`fp_${key}`] = formatWithoutCent(
                response.data.total[key]
            );
        });
        response.data.total.progresso = (
            (parseFloat(response.data.total.venda_total) /
                parseFloat(response.data.total.cota_total)) *
            100
        ).toFixed(1);

        const allBrands = {
            id_marca: '0',
            marca: 'MARCAS',
            fp_venda: response.data.total.fp_venda_total,
            MACO: response.data.total.MACO_total,
            fp_MACO: formatWithoutCent(response.data.total.MACO_total),
            fp_cota: response.data.total.fp_cota_total,
            fp_venda_projetada: response.data.total.fp_projecao_total,
            vendaK: (response.data.total.venda_total / 1000).toFixed(1),
            vendaMi: (response.data.total.venda_total / 1000000).toFixed(1),
            cotaK: (parseFloat(response.data.total.cota_total) / 1000).toFixed(
                1
            ),
            cotaMi: (
                parseFloat(response.data.total.cota_total) / 1000000
            ).toFixed(1),
            venda: response.data.total.venda_total,
            venda_projetada: response.data.total.projecao_total,
            cota: response.data.total.cota_total,
        };

        const mesAllBrands = {
            id_marca: '0',
            marca: 'MARCAS',
            mi_venda: parseFloat(
                mesResponse.data.total.venda_total / 1000000
            ).toFixed(2),
            mi_cota: parseFloat(
                mesResponse.data.total.cota_total / 1000000
            ).toFixed(2),
            venda: mesResponse.data.total.venda_total,
            cota: mesResponse.data.total.cota_total,
        };
        mesMarcaFormatted.unshift(mesAllBrands);
        marcasFormatted.unshift(allBrands);

        const dataHeader = response.data;
        yield put(
            statusSuccess(
                mesTotal,
                marcasFormatted,
                mesMarcaFormatted,
                dataHeader
            )
        );
    } catch (err) {
        if (!err.response) {
            SnackBar.error('Problemas no servidor');

            return;
        }
        if (err.response.status === 401) {
            yield put(signOut());
            return;
        }
        SnackBar.error(err.response.data.error);
        yield put(statusFailure());
    }
}

export function* setTodaysDate() {
    yield put(changeInitialDate(moment()));
    yield put(changeFinalDate(moment()));
}
export default all([
    takeLatest('persist/REHYDRATE', setTodaysDate),
    takeLatest('@status/STATUS_REQUEST', fetchStatus),
    // takeLatest('@auth/SIGN_OUT', signOut),
]);
