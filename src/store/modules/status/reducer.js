import produce from 'immer';
import * as moment from 'moment';

const INITIAL_STATE = {
    initialDate: moment(),
    finalDate: moment(),
    loading: true,
    totalMes: {},
    statusMarca: [],
    statusMarcaMes: {},
    headerData: {},
    isFaturado: false,
    showInsig: true,
};

export default function status(state = INITIAL_STATE, action) {
    return produce(state, draft => {
        switch (action.type) {
            case '@status/STATUS_REQUEST': {
                draft.loading = true;
                break;
            }

            case '@status/STATUS_SUCCESS': {
                draft.totalMes = action.payload.mesTotal;
                draft.statusMarca = action.payload.marcasFormatted;
                draft.statusMarcaMes = action.payload.mesMarcaFormatted;
                draft.headerData = action.payload.dataHeader;

                draft.loading = false;
                break;
            }
            case '@status/STATUS_FAILURE': {
                draft.loading = false;
                break;
            }
            case '@status/CHANGE_INITIAL_DATE': {
                draft.initialDate = action.payload.initialDate;
                break;
            }
            case '@status/CHANGE_FINAL_DATE': {
                draft.finalDate = action.payload.finalDate;
                break;
            }
            case '@status/CHANGE_STATUS': {
                draft.isFaturado = action.payload.status;
                break;
            }
            case '@status/CHANGE_INSIGHTS': {
                draft.showInsig = action.payload.showInsig;
                break;
            }
            default:
        }
    });
}
