import * as yup from 'yup';

export const createHeroValidationSchema = yup
    .object().shape({
        nickname: yup.string().min(2).max(50),
        realName: yup.string().min(2).max(50),
        superpowers: yup.string().matches(/(,?[a-zA-Z][a-zA-Z0-9]*,?)/g),
        catchPhrase: yup.string().min(2).max(50),
})