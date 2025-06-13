import React, { useState, useEffect } from 'react'
import InputField from '../components/InputField';
import Image from '../components/Image';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
import formStyles from '../styles/formStyles';
import { useAuth } from '../context/AuthContext';
import { validateFile, validateProfileForm } from '../utils/validation.js';
import { sendRequest } from '../api/apiHandlers';
import ShowToastMessage from '../components/showToastMessage';
import { getSource } from '../utils/utils';
import { routes } from '../api/routes.js';

const ProfileForm = () => {
    const navigate = useNavigate();
    const { users, currentUserId } = useAuth();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        role: 'User',
        profilePath: '',
    });
    const [errors, setErrors] = useState({});
    const [selectedImage, setSelectedImage] = useState(null);
    const currentUser = users.find((user) => user.id === currentUserId) || {};

    useEffect(() => {
        if (users) {
            setFormData({
                name: currentUser.name || '',
                email: currentUser.email || '',
                role: currentUser.role || 'User',
                profilePath: currentUser.profilePath || '',
            });
        }
    }, [users]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
    };

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return ShowToastMessage(true, "Please select a file");

        const { result, message } = validateFile(file);
        if (!result) return ShowToastMessage(false, message);

        setSelectedImage(URL.createObjectURL(file));
    };

    const handleSubmit = async () => {
        const validationErrors = validateProfileForm(formData.email, formData.name);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        const hasChanges =
            formData.name !== currentUser.name ||
            formData.email !== currentUser.email ||
            formData.role !== currentUser.role || selectedImage;

        if (!hasChanges) {
            ShowToastMessage(false, "No changes to update.");
            return;
        }
        const payload = new FormData();
        payload.append("userId", currentUser.id);
        payload.append("name", formData.name);
        payload.append("email", formData.email);
        payload.append("role", formData.role);

        if (selectedImage) {
            const file = document.getElementById("imageUpload").files[0];
            payload.append("file", file, `${Date.now()}_${file.name}`);
        }
        try {
            const { message, success } = await sendRequest(payload,routes.edit);
            ShowToastMessage(success, message);
            if (success) {
                navigate('/userlist');
            }
        } catch (error) {
            ShowToastMessage(false, "Something went wrong");
        }
    }

    return (
        <div>
            <div id="userForm" className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg w-96">
                {/* <div className="flex justify-center mb-4">
                    <Image src={defaultImage} alt="User Image" className="w-24 h-24 rounded-full" />
                </div> */}

                <div className="flex flex-col items-center mb-4">
                    <Image
                        src={getSource(currentUser?.profilePath, selectedImage)}
                        alt="User Image"
                        className="w-24 h-24 rounded-full object-cover"
                        onError={(e) => e.currentTarget.src = defaultImage}
                    />
                    <label
                        htmlFor="imageUpload"
                        className="mt-2 px-4 py-1 text-sm font-medium text-white bg-gray-600 rounded cursor-pointer hover:bg-gray-500"
                    >
                        Choose Image
                    </label>
                    <input
                        id="imageUpload"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                    />
                </div>

                <div className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                        <InputField type="text" value={formData?.name} id="name" onChange={handleChange} error={errors.name} className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200" placeholder="Enter your name" />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <InputField type="email" value={formData?.email} id="email" onChange={handleChange} error={errors.email} className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200" placeholder="Enter your email" />
                    </div>
                    <div>
                        <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
                        <select id="role" onChange={handleChange} value={formData?.role} className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200" >
                            <option value="User">User</option>
                            <option value="Admin">Admin</option>
                        </select>
                    </div>
                    <div className="flex justify-end space-x-2">
                        <Button id="cancelBtn" className={formStyles?.formButton} onClick={() => navigate('/userlist')} value="Cancel" />
                        <Button id="submitBtn" className={formStyles?.formButton} onClick={handleSubmit} value="Submit" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfileForm