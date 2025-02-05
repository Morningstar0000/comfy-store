import React from 'react'
import { useNavigation } from 'react-router-dom';

function SubmitBtn({ text }) {
    const navigation = useNavigation()
    const isSubmitting = navigation.state === "submitting"
    return (
        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
            {isSubmitting ? <span className='loading loading-spinner loading-md'>sending</span> : text || 'submit'}
        </button>
    )
}

export default SubmitBtn;
