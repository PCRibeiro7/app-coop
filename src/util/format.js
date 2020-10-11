import * as moment from 'moment';

export const { format: formatPrice } = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
});

export const formatWithoutCent = num => {
    const monetary = formatPrice(num);
    return monetary.split(',')[0];
};

export const formatDateString = dateString => {
    if (dateString) {
        const originalDate = moment(dateString);
        return originalDate.format('DD/MM/YYYY');
    }
    return undefined;
};

export const formatCurrecyStringToNumberString = currencyString => {
    if (currencyString) {
        return `${currencyString}`.replace(/[^0-9]/g, '');
    }
    return undefined;
};

export const formatDecimalToPercentage = value => {
    if (value === Infinity) {
        return '%';
    }
    if (value) {
        const integerValue =
            `${value}`.slice(0, 1) !== '0' ? `${value}`.slice(0, 1) : '';
        const decimalValue = `${value}`.slice(2, 4);
        return `${integerValue}${decimalValue}%`;
    }
    return undefined;
};

export const namesDictionary = marca => {
    const nomes = new Map();
    nomes.set('FABULA', 'FÁBULA');
    nomes.set('OUTLET', 'OFF PREMIUM');
    nomes.set('MARIA FILO', 'MARIA FILÓ');

    if (!nomes.has(marca.marca)) {
        return marca.marca;
    }
    return nomes.get(marca.marca);
};

export const formatPhoneNumber = rawNumber => {
    if (rawNumber) {
        const dddCode = rawNumber.substring(3, 5);
        const phoneStart = rawNumber.substring(5, 10);
        const phoneEnd = rawNumber.substring(10, 14);
        return `(${dddCode}) ${phoneStart}-${phoneEnd}`;
    }
    return '';
};

export const abbreviateCurrency = currencyText => {
    if (currencyText) {
        const digitsCount = currencyText.length;
        if (digitsCount > 13) {
            return `${currencyText.substring(0, 6)} Mi`;
        }
        if (digitsCount > 10) {
            return `${currencyText.substring(0, 6)} k`;
        }
        return currencyText;
    }
    return '';
};


export const abbreviateCurrency2 = currencyText => {
    //Essa função esta preparada para lidar com "strings" apenas no formato da resposta 
    //da função formatWithoutCent. Exemplos: "R$ 93.010.007" e "R$ 8.656" (sem centavos)
    //Ela retorna os valores de exemplo: "R$ 93,01 Mi" e "R$ 8,65 k"
    if (currencyText) {
        const digitsCount = currencyText.length;
        var displayLimitK = digitsCount - 1;
        var displayLimitM = digitsCount - 5;
        if ((digitsCount >= 12) && (digitsCount < 16)) {
            currencyText = currencyText.replace('.',',');
            return `${currencyText.substring(0, displayLimitM)} Mi`;
        }
        if ((digitsCount > 7) && (digitsCount < 12)) {
            currencyText = currencyText.replace('.',',');
            return `${currencyText.substring(0, displayLimitK)} k`;
        }
        return currencyText;
    }
    return '';
};
