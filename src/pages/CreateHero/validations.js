import * as yup from 'yup';

export const createHeroValidationSchema = yup
    .object().shape({
        nickname: yup.string().min(2).max(50),
        realName: yup.string().min(2).max(50),
        superpowers: yup.string().min(3).max(50),
        catchPhrase: yup.string().min(2).max(100),
})