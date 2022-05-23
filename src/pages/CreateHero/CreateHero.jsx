import React, { useRef, useState } from 'react'
import { Formik, Form } from 'formik';
import { TextField, Box, Button } from '@mui/material';
import { createHeroValidationSchema } from './validations';
import './CreateHero.scss'

const CreateHero = () => {
    const [files, setFiles] = useState([]);

    const onSubmit = (data) => {
        console.log(data)
    }
    const photoInput = useRef(null);
    const handlePhotoClick = () => {
        photoInput.current.click();
    };
    const handleFilesChange = (event) => {
        console.log('works');
        if (event.target.files[0].size > 159061428) {
            alert('File is too big (more than 150mb)');
            return;
        }
        if (files.length < 5) {
            setFiles((prev) => [...prev, event.target.files[0]]);
        } else {
            alert('Cannot attach more than 5 files');
        }
    };
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
                <Form className="create-hero_form">
                    <Box sx={{ width: 500, maxWidth: '100%', margin: 1 }}>
                        <TextField
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
                    <button
                        onClick={handlePhotoClick}
                        type="button"
                        className="media-button"
                    >Attach Photo
                        <input
                            onChange={(event) => {
                                console.log('hadnle change')
                                handleFilesChange(event);
                                setFieldValue('files', values.file.concat(event.target.files));
                            }}
                            multiple
                            ref={photoInput}
                            id="files"
                            name="files"
                            type="files"
                            accept="image/*"
                            className="media-button_input"
                        />
                    </button>
                    <Button color="secondary" type='submit'>Create Hero</Button>
                </Form>
            )}
        </Formik>
    )
}

export default CreateHero