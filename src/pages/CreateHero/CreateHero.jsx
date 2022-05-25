import React, { useRef, useState } from 'react'
import { Formik, Form } from 'formik';
import { TextField, Box, Button } from '@mui/material';
import { createHeroValidationSchema } from './validations';
import cloudUploader from 'utils/cloudUploader'
import './CreateHero.scss'
import axios from 'axios';
import ContentLoader from 'components/ContentLoader';
import { useLocation } from 'react-router-dom';

const CreateHero = () => {
    const [files, setFiles] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    const locate = useLocation()

    const onSubmit = async (data) => {
        console.log(data)
        axios.post('http://localhost:5000/api/hero', data)
        locate('/')
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
                    <ContentLoader visible={isLoading} />
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
                    <p>You can add up to 5 hero photos</p>
                    <button
                        onClick={handlePhotoClick}
                        type="button"
                        className="media-button"
                    >Attach Photo
                        <input
                            onChange={async (event) => {
                                setIsLoading(true)
                                const file = await cloudUploader(event.target.files[0])
                                setFieldValue('images', values.images.concat(file))
                                handleFilesChange(event);
                                setIsLoading(false)
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
                    <Button
                        onClick={() => {
                            window.location.reload(false);
                        }}
                        color="error" type='reset'>Reset</Button>
                </Form>
            )}
        </Formik>
    )
}

export default CreateHero