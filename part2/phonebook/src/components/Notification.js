import React from 'react'

const Notification = ({ successMessage, errorMessage, dynamicClass }) => {
    if (successMessage === null || errorMessage === null) {
        return null
    }

    return (
        <div className={dynamicClass}>
            {successMessage} 
            {errorMessage} 
        </div>
    )
}

export default Notification