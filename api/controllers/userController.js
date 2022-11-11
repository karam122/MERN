import SignUpMessage from "../models/signUp.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const signUp = async (req, res) => {
  const signup = req.body;
  const { firstName, lastName, email,address,phone, password,image } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const existingUser = await SignUpMessage.findOne({ email: email });

  try {
    if (existingUser) {
      res.status(400).json({ message: "User Already Exits!" });
    } else {
      const newUser = await SignUpMessage.create({
        firstName: firstName,
        lastName: lastName,
        email: email,
        address: address,
        phone: phone,
        password: hashedPassword,
        image: image,
        createdAt: new Date(),
      });
      const token = jwt.sign(
        { email: newUser.email, id: newUser._id },
        " SECRET_KEY"
      );

      console.log(newUser, token, "newUser");
      res.status(200).json({ newUser: newUser, token: token });
    }
  } catch (error) {
    res.status(500).json({ message: error.message});
  }
};

export const signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await SignUpMessage.findOne({ email: email });
    console.log(existingUser, "existingUser");
    if (!existingUser) {
      res.status(404).json({ message: "No User Found!" });
    }
    const matchPassword = await bcrypt.compare(password, existingUser.password);
    if (existingUser && !matchPassword) {
      res.status(404).json({ message: "Invalid Password!" });
    }

    if (existingUser && matchPassword) {
      const token = jwt.sign(
        { email: existingUser.email, id: existingUser._id },
        " SECRET_KEY"
      );
      res.status(200).json({ email: email, password: password, id: existingUser._id , token: token });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
