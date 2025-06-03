import React, { useState, useEffect } from 'react'
import InputField from '../components/InputField';
import Image from '../components/Image';
import defaultImage from '../assets/defaultImage.webp';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
import formStyles from '../styles/formStyles';
import { useAuth } from '../context/AuthContext';
import { validateProfileForm } from '../utils/formValidation';
import { editUser } from '../api/apiHandlers';
import ShowToastMessage from '../components/showToastMessage';
import { setLocalStorageData } from '../utils/utils';

const ProfileForm = () => {
    const navigate = useNavigate();
    const { currentUser, setCurrentUser } = useAuth();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        role: 'User'
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (currentUser) {
            setFormData({
                name: currentUser.name || '',
                email: currentUser.email || '',
                role: currentUser.role || 'User'
            });
        }
    }, [currentUser]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
    };

    const handleSubmit = async () => {
        const validationErrors = validateProfileForm(formData.email, formData.name);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        console.log("formData: ", formData);
        const res = await editUser(formData,currentUser.id);
        console.log("res: ", res);
        ShowToastMessage(res?.success,res?.message);
        if(res?.success){
            setCurrentUser(prev => ({
                ...prev,
                ...formData,
            }));
            setLocalStorageData("currentUser",{
                ...currentUser,
                ...formData,
            });
            navigate('/userlist')
        }
    }

    return (
        <div>
            <div id="userForm" className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg w-96">
                <div className="flex justify-center mb-4">
                    <Image src={defaultImage} alt="User Image" className="w-24 h-24 rounded-full" />
                </div>

                <div className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                        <InputField type="text" value={formData.name} id="name" onChange={handleChange} error={errors.name} className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200" placeholder="Enter your name" />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <InputField type="email" value={formData.email} id="email" onChange={handleChange} error={errors.email} className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200" placeholder="Enter your email" />
                    </div>
                    <div>
                        <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
                        <select id="role" onChange={handleChange} value={formData.role} className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200" >
                            <option value="User">User</option>
                            <option value="Admin">Admin</option>
                        </select>
                    </div>
                    <div className="flex justify-end space-x-2">
                        <Button id="cancelBtn" className={formStyles.formButton} onClick={() => navigate('/userlist')} value="Cancel" />
                        <Button id="submitBtn" className={formStyles.formButton} onClick={handleSubmit} value="Submit" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfileForm