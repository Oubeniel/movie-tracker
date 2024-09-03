import React, { ComponentProps, useState } from 'react'
import FormInputField from './FormInputField'
import { FieldError, UseFormRegisterReturn } from 'react-hook-form'
import { Button, FormControlProps } from 'react-bootstrap'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

interface PasswordInputFieldProps {
    register: UseFormRegisterReturn,
    label?: string,
    error?: FieldError,
}

const PasswordInputField = ({ register, label, error, ...props }: PasswordInputFieldProps & FormControlProps & ComponentProps<"input">) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <FormInputField
            register={register}
            label={label}
            error={error}
            {...props}
            type={showPassword ? "text" : "password"}
            inputGroupElement={
                <Button
                    variant='secondary'
                    onClick={() => setShowPassword(!showPassword)}
                    id={register.name + '-toggle-visibility-button'}>
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                </Button>
            }
        />
    )
}

export default PasswordInputField