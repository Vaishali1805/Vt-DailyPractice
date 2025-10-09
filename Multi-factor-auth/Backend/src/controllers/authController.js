export const register = async (req, res) => {
  try {
    console.log("am here");
    console.log("req.body: ",req.body);
    const { username, password } = req.body;
    console.log("username: ",username,"password: ",password);
    const hashedPassword = await bcrypt.hash(password,10);
    console.log("hashedPassword: ",hashedPassword);
    const newUser = new User({
        username,
        hashedPassword,
        isMfaActive: false,
    });
    console.log("newUser: ",newUser);
    newUser.save();
    res.status(201).json({message: "User registered successfully"});
  } catch (error) {
    res.status(500).json({ error: "Error Registering User", message: error });
  }
};

export const login = async () => {
  console.log("am in login");
};

export const authStatus = async () => {
  console.log("am in authStatus");
};

export const logout = async () => {
  console.log("am in logout");
};

export const setup2FA = async () => {
  console.log("am in setup2FA");
};

export const verify2FA = async () => {
  console.log("am in verify2FA");
};

export const reset2FA = async () => {
  console.log("am in reset2FA");
};
