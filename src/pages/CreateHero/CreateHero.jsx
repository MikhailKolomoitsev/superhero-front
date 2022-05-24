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
        const file = event.target.files[0]
        if (file.size > 159061428) {
            alert('File is too big (more than 150mb)');
            return;
        }
        if (files.length < 5) {
            setFiles((prev) => [...prev, file]);
        } else {
            alert('Cannot attach more than 5 files');
        }
    };

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    return (
        <Formik
            initialValues={{
                nickname: '',
                realName: '',
                superpowers: '',
                catchPhrase: '',
                file: [],
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
                    {files.length > 0 &&
                        <ul className='create-hero_photolist'>
                            {files.map(file =>
                                <li
                                    key={file.name}
                                    className="create-hero_photolist-item">
                                    <img
                                        className="create-hero_photolist-item-photo"
                                        alt="file.name"
                                        src={URL.createObjectURL(file)}
                                    />
                                </li>
                            )}
                        </ul>
                    }
                    <button
                        onClick={handlePhotoClick}
                        type="button"
                        className="media-button"
                    >Attach Photo
                        <input
                            onChange={async (event) => {
                                console.log(event.target.files)
                                handleFilesChange(event);
                                const file = await convertBase64(event.target.files[0])
                                setFieldValue('file', values.file.concat(file));
                            }}
                            multiple
                            ref={photoInput}
                            id="file"
                            name="file"
                            type="file"
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