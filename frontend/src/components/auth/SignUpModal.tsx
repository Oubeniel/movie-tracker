"use client"
import React, { useState } from 'react'
import { Alert, Button, Form, Modal } from "react-bootstrap";
import { useForm } from 'react-hook-form';
import * as UsersApi from '@/network/api/users'
import FormInputField from '../form/FormInputField';
import PasswordInputField from '../form/PasswordInputField';
import LoadingButton from '../LoadingButton';
import useAuthenticatedUser from '@/hooks/useAuthenticatedUser';
import { BadRequestError, ConflictError } from '@/network/http-errors';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { emailSchema, passwordSchema, usernameSchema } from "@/utils/validation";

const validationSchema = yup.object({
    username: usernameSchema.required("Required"),
    email: emailSchema.required("Required"),
    password: passwordSchema.required("Required"),
});

type SignUpFormData = yup.InferType<typeof validationSchema>;

interface SignUpModalProps {
    onDismiss: () => void,
    onLoginInsteadClicked: () => void,
}

const SignUpModal = ({ onDismiss, onLoginInsteadClicked }: SignUpModalProps) => {

    const { mutateUser } = useAuthenticatedUser();

    const [errorText, setErrorText] = useState<string | null>(null);

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<SignUpFormData>({
        resolver: yupResolver(validationSchema),
    });

    async function onSubmit(credentials: SignUpFormData) {
        try {
            setErrorText(null);
            const newUser = await UsersApi.signUp(credentials);
            mutateUser(newUser);
            onDismiss();
        } catch (error) {
            if (error instanceof ConflictError || error instanceof BadRequestError) {
                setErrorText(error.message); //user experience error
            } else {
                console.error(error);
                alert(error);
            }
        }
    }

    return (
        <Modal show onHide={onDismiss} centered>
            <Modal.Header closeButton>
                <Modal.Title>Sign Up</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {errorText &&
                    <Alert variant="danger">{errorText}</Alert>
                }
                <Form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <FormInputField
                        register={register('username')}
                        label='Username'
                        placeholder='Enter username'
                        error={errors.username}
                    />
                    <FormInputField
                        register={register('email')}
                        type='email'
                        label='Email'
                        placeholder='Enter email'
                        error={errors.email}
                    />
                    <PasswordInputField
                        register={register('password')}
                        label='Password'
                        placeholder='Enter password'
                        error={errors.password}
                    />
                    <LoadingButton
                        type='submit'
                        isLoading={isSubmitting}
                        className='w-100'>
                        Sign Up</LoadingButton>
                </Form>
                <div className='d-flex align-items-center gap-1 justify-content-center mt-1'>
                    Already have an account?
                    <Button
                        variant='link'
                        onClick={onLoginInsteadClicked}
                    >
                        Log In
                    </Button>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default SignUpModal