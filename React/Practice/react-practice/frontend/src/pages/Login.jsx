import Button from '../components/Button.jsx'
import Image from '../components/Image.jsx'
import Input from '../components/Input.jsx'

export default function Login() {
    const classes = {
        inputClass: "w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600",
        labelClass: "flex items-center text-blue-600 mb-2"
    }

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Left Section: Login Form */}
            <div className="w-1/2 flex flex-col justify-center p-10 bg-white">
                <h1 className="text-4xl font-bold text-blue-600 mb-4">Welcome</h1>
                <h2 className="text-3xl font-semibold text-blue-800 mb-6">Log in to access your dashboard and manage users</h2>
                <p className="text-gray-600 mb-6">Welcome back! Please login to your account.</p>

                {/* Name section */}
                <div className="mb-4">
                    <label className={classes.labelClass}>
                        <span className="mr-2">✿</span> Name
                    </label>

                    <Input type="text" id="name" placeholder="Enter your name here" className= {classes.inputClass} />
                </div>

                {/* Email section */}
                <div className="mb-4">
                    <label className={classes.labelClass}>
                        <span className="mr-2">✿</span> Email
                    </label>
                    <Input type="text" id="email" placeholder="Email Address" className= {classes.inputClass} />
                </div>

                {/* Password section */}
                <div className="mb-4">
                    <label className={classes.labelClass}>
                        <span className="mr-2">✿</span> Password
                    </label>
                    <Input type="text" id="password" placeholder="Password" className= {classes.inputClass} />
                </div>
                
                <div className="flex justify-between items-center mb-6">
                    {/* Role Section */}
                    <div className="flex align-items-center gap-3">
                        <label className={classes.labelClass}>
                            <span className="mr-2">✿</span> Role
                        </label>
                        <div>
                            <Input type="radio" id="admin" name="role" value="Admin" />
                            <label htmlFor="admin"> Admin </label>
                        </div>
                        <div>
                            <Input type="radio" id="user" name="role" value="User" />
                            <label htmlFor="user"> User </label>
                        </div>
                    </div>
                    <a href="#" className="text-blue-600 hover:underline">
                        Forgot Password?
                    </a>
                </div>
                <div className="flex space-x-4 mb-6">
                    <Button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700" value="Login" />
                </div>
            </div>

            {/* Right Section: Navigation and Illustration */}
            <div className="w-1/2 flex flex-col p-10 bg-gray-100">
                <div className="flex-1 flex items-center justify-center">
                    <div className="text-center text-gray-500">
                        <Image src="../assets/images/cycleImage.png" alt="cycle Image" />
                    </div>
                </div>
            </div>
        </div>
    );
};