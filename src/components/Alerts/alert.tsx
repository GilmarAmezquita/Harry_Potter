import { Toast} from './toastConstant';

export const alertSuccess = (title: string) => {
    Toast.fire({
        icon: 'success',
        title: title
    });
}

export const alertError = (title: string) => {
    Toast.fire({
        icon: 'error',
        title: title
    });
}

export const alertLoading = () => {
    return Toast.fire({
        icon: 'info',
        title: 'Porfavor Espera !'
    });
}