import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import '../styles/formAddEdit.css';

const URL = 'https://649911d179fbe9bcf83ea17c.mockapi.io/api/v1/staffManagement';

const initialState = {
    name: '',
    avatar: '',
    age: '',
    address: '',
    createdAt: Math.floor(Date.now() / 1000)
}

const error_init = {
    name_err: '',
    avatar_err: '',
    age_err: '',
    address_err: '',
}

const FormAddEdit = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [state, setState] = useState(initialState);
    const { name, avatar, age, address } = state;
    const [errors, setErrors] = useState(error_init);

    const getOneStaff = async (id) => {
        const res = await axios.get(`${URL}/${id}`);
        if (res.status === 200) {
            setState(res.data);
        }
    }

    useEffect(() => {
        if (id) getOneStaff(id);
    }, [id]);

    const updateStaff = async (staffID, data) => {
        const res = await axios.put(`${URL}/${staffID}`, data);
        if (res.status === 200) {
            toast.success(`Updated Staff with ID: ${staffID} successfully ~`);
            navigate('/dashboard');
        }
    }

    const addNewStaff = async (data) => {
        const res = await axios.post(`${URL}`, data);
        if (res.status === 200 || res.status === 201) {
            toast.success("New Staff has been added successfully ~");
            navigate('/dashboard');
        }
    }

    // validate
    const validateForm = () => {
        let isValid = true;
        let errors = { ...error_init };

        if (name.trim() === '' || name.length < 2) {
            errors.name_err = 'Name is Required';
            if (name.length < 2) {
                errors.name_err = 'Name must be more than 2 words';
            }
            isValid = false;
        }

        if (avatar.trim() === '') {
            errors.avatar_err = 'Avatar is required';
            isValid = false;
        }

        if (isNaN(age) || parseInt(age) < 1 || age === '') {
            errors.age_err = 'Age must be a positive number and more than 0';
            isValid = false;
        }

        if (address.trim() === '') {
            errors.address_err = 'Address is required';
            isValid = false;
        }

        setErrors(errors);
        return isValid;
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (validateForm()) {
            if (id) updateStaff(id, state);
            else addNewStaff(state);
        } else {
            toast.error("Some info is invalid ~ Pls check again");
        }
    }

    const handleInputChange = (event) => {
        let { name, value } = event.target;
        setState((state) => ({ ...state, [name]: value }));
    }

    return (
        <div className='container'>
            <div className="form">
                <h2>{id ? "Update Form" : "Add New Staff"}</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name">Name: </label>
                        <input type="text" name='name' value={state.name} onChange={handleInputChange} />
                        {errors.name_err && <span className='error'>{errors.name_err}</span>}
                    </div>
                    <div>
                        <label htmlFor="avatar">Avatar: </label>
                        <input type="text" name='avatar' value={state.avatar} onChange={handleInputChange} />
                        {errors.avatar_err && <span className='error'>{errors.avatar_err}</span>}
                    </div>
                    <div>
                        <label htmlFor="age">Age: </label>
                        <input type="number" name='age' value={state.age} onChange={handleInputChange} />
                        {errors.age_err && <span className='error'>{errors.age_err}</span>}
                    </div>
                    <div>
                        <label htmlFor="address">Address: </label>
                        <input type="text" name='address' value={state.address} onChange={handleInputChange} />
                        {errors.address_err && <span className='error'>{errors.address_err}</span>}
                    </div>
                    {id && (
                        <div>
                            <label htmlFor="createdAt">Created At: </label>
                            <input type="text" name='createdAt' value={new Date(state.createdAt * 1000).toLocaleDateString()} readOnly />
                        </div>
                    )}
                    <button type='submit' className='form-button'>{id ? "Update" : "Submit"}</button>
                </form>
            </div>
        </div>
    );
};

export default FormAddEdit;