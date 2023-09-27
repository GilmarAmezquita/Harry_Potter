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