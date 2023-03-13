import React, { useState, FC } from 'react';
import "./style.css";

interface FormType {
    onSubmit: React.FormEvent<HTMLElement>,
    onChange: React.FormEvent<HTMLElement>
}

const SizeForm : FC<FormType> = ({ onSubmit, onChange}) => {
    

    return (
        <></>
    );
}

export default SizeForm;