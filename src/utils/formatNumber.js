import { format } from 'date-fns';

export const formatDate = (dateString) => {
    return format(new Date(dateString), 'yyyy/MM/dd HH:mm:ss');
};

export const formatNominal = (nominal) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 2,
    }).format(nominal).replace(/(\d),(\d)/g, '$1.$2');
};
