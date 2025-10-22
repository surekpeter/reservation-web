import {Form as BootstrapForm} from 'react-bootstrap'
import {FieldError} from 'react-hook-form'
import {useTranslation} from 'react-i18next';


interface ErrorFeedbackProps {
    error: FieldError
}

export const ErrorFeedback = ({error: {type, message}}: ErrorFeedbackProps) => {
    if (message) {
        return <BootstrapForm.Control.Feedback type='invalid'>{message}</BootstrapForm.Control.Feedback>
    }
    const {t, i18n} = useTranslation();

    switch (type) {
        case 'required':
            return (
                <BootstrapForm.Control.Feedback type='invalid'>
                    {t('form.fieldIsRequiredError')}
                </BootstrapForm.Control.Feedback>
            )
        default:
            return null
    }
}
