import * as Yup from 'yup';

const message = Yup.string().min(1, 'is too short').required('is required');

export const messageSchema = Yup.object().shape({ message });
