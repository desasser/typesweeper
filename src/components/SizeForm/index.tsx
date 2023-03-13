import React, { useState, ChangeEvent, FormEvent, FC } from 'react';
import "./style.css";

interface FormType {
    onSubmit: React.FormEvent<HTMLFormElement>,
    onChange: React.ChangeEvent<HTMLInputElement>
}

const SizeForm : FC<FormType> = ({ onSubmit, onChange}) => {
    

    return (
        <></>
    );
}

export default SizeForm;