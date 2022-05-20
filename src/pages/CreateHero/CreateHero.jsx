import React from 'react'
import './CreateHero.scss'
import { Formik, Form } from 'formik';
import { TextField, Box, Button } from '@mui/material';
import { createHeroValidationSchema } from './validations';

const CreateHero = () => {

    const onSubmit = (data) => {
        console.log(data)
    }
    return (
        <Formik
            initialValues={{
                nickname: '',
                realName: '',
                superpowers: '',
                catchPhrase: '',
                files: []
            }}
            validationSchema={createHeroValidationSchema}
            onSubmit={onSubmit}
        >
            {({ errors, touched, handleChange, setFieldValue, values }) => (
                <Form className="">
                    <Box sx={{ width: 500, maxWidth: '100%', margin: 1 }}>
                        <TextField
                            defaultValue={'Has to be minimum 2 signs'}
                            onChange={handleChange}
                            fullWidth
                            id="nickname"
                            name="nickname"
                            label="Nickname"
                            errors={errors}
                            touched={touched}
                            required
                        />
                    </Box>
                    <Box sx={{ width: 500, maxWidth: '100%', margin: 1 }}>
                        <TextField
                            onChange={handleChange}
                            id='realName'
                            name='realName'
                            fullWidth label="Real Name"
                            errors={errors}
                            required
                        />
                    </Box>
                    <Box sx={{ width: 500, maxWidth: '100%', margin: 1 }}>
                        <TextField
                            onChange={handleChange}
                            fullWidth
                            id="superpowers"
                            name="superpowers"
                            label="Superpowers"
                            errors={errors}
                            required
                        />
                    </Box>
                    <Box sx={{ width: 500, maxWidth: '100%', margin: 1 }}>
                        <TextField
                            onChange={handleChange}
                            fullWidth
                            id="catchPhrase"
                            name="catchPhrase"
                            label="Catch Phrase"
                            errors={errors}
                            required
                        />
                    </Box>

                    <Button variant="contained" type='submit'>Contained</Button>
                </Form>
            )}
        </Formik>
    )
}

export default CreateHero