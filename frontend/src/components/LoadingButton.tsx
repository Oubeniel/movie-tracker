import React, { ReactNode } from 'react'
import { Button, ButtonProps, Spinner } from 'react-bootstrap'

interface LoadingButtonProps {
    isLoading: boolean,
    children: ReactNode,
}

const LoadingButton = ({ isLoading, children, ...props }: LoadingButtonProps & ButtonProps) => {
    return (
        <div>
            <Button {...props} className='mb-3'>
                {isLoading &&
                <>
                    <Spinner
                        as='span'
                        animation='border'
                        size='sm'
                        role='status'
                        aria-hidden='true'
                    />
                    <span className="visually-hidden">Loading...</span>
                    {" "}
                    </>
                }
                {children}
            </Button>
        </div>
    )
}

export default LoadingButton