import React, { useRef, useState } from 'react'
import { Formik, Form, Field } from 'formik';
import { Box, Button } from '@mui/material';
import { createHeroValidationSchema } from './validations';
import cloudUploader from 'services/cloudUploader'
import ApiService from 'services/api';
import { useNavigate } from 'react-router-dom';
import './CreateHero.scss'

const CreateHero = () => {
    const [files, setFiles] = useState([]);
    const navigate = useNavigate();

    const onSubmit = (data) => {
        ApiService.create(data)
        navigate('/created')
    }

    const photoInput = useRef(null);
    const handlePhotoClick = () => {
        photoInput.current.click();
    };

    const handleFilesChange = (event) => {
        const file = event.target.files[0]
        if (file.size > 59061428) {
            alert('File is too big (more than 50mb)');
            return;
        } else if (files.some(item => item.lastModified === file.lastModified)) {
            alert('You have added already that picture');
            return
        }
        if (files.length < 5) {
            setFiles((prev) => [...prev, file]);
        } else {
            alert('Cannot attach more than 5 files');
        }
    };


    return (
        <>
            <Formik
                initialValues={{
                    nickname: '',
                    realName: '',
                    superpowers: '',
                    catchPhrase: '',
                    images: []
                }}
                validationSchema={createHeroValidationSchema}
                onSubmit={onSubmit}
            >
                {({ isValid, errors, touched, handleChange, setFieldValue, values, resetForm }) => (
                    <Form className="create-hero_form">
                        <Box sx={{ width: 500, maxWidth: '100%', margin: 1 }}>
                            <Field
                                placeholder='Nickname'
                                className='input-field'
                                onChange={handleChange}
                                id="nickname"
                                name="nickname"
                                errors={errors}
                                touched={touched}
                                required
                            />
                        </Box>
                        <Box sx={{ width: 500, maxWidth: '100%', margin: 1 }}>
                            <Field
                                placeholder='Real Name'
                                className='input-field'
                                onChange={handleChange}
                                id='realName'
                                name='realName'
                                errors={errors}
                                required
                            />
                        </Box>
                        <Box sx={{ width: 500, maxWidth: '100%', margin: 1 }}>
                            <Field
                                placeholder='Superpowers'
                                className='input-field'
                                onChange={handleChange}
                                id="superpowers"
                                name="superpowers"
                                errors={errors}
                                required
                            />
                        </Box>
                        <Box sx={{ width: 500, maxWidth: '100%', margin: 1 }}>
                            <Field
                                placeholder='Catch Phrase'
                                className='input-field'
                                onChange={handleChange}
                                id="catchPhrase"
                                name="catchPhrase"
                                errors={errors}
                                required
                            />
                        </Box>
                        {values.images.length > 0 &&
                            <ul className='create-hero_photolist'>
                                {values.images.map(file =>
                                    <li
                                        key={file}
                                        className="create-hero_photolist-item">
                                        <img
                                            className="create-hero_photolist-item-photo"
                                            alt="file.name"
                                            src={file}
                                        />
                                    </li>
                                )}
                            </ul>
                        }
                        <p>You can add up to 5 hero photos</p>
                        <button
                            onClick={handlePhotoClick}
                            type="button"
                            className="media-button"
                        >Attach Photo
                            <input
                                onChange={async (event) => {
                                    const file = await cloudUploader(event.target.files[0])
                                    setFieldValue('images', values.images.concat(file))
                                    handleFilesChange(event);
                                    console.log(values)
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
                        <Button
                            disabled={!isValid}
                            color="secondary" type='submit'>Create Hero</Button>
                        <Button
                            onClick={resetForm}
                           color='error' type='reset'>Reset</Button>
                    </Form>
                )}
            </Formik>
        </>
    )
}

export default CreateHero