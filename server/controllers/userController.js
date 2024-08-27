const admin = require("../firebase");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const createUserToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
  }
async function verifyToken(req, res, next) {
    const idToken = req.headers.authorization;
  
    if (!idToken) {
      return res.status(401).send("Unauthorized");
    }
  
    try {
        let decodedToken = await admin.auth().verifyIdToken(idToken);
        req.uid = decodedToken;
        next();
    } catch (error) {
        console.log(error);
      return res.status(401).send("Unauthorized");
    }
  }

  const loginUser = async(req, res) => {
    const { name, email, picture } = req.body;
    const { uid } = req.uid;
  
    let user = await User.findOne({ uid });
    if (!user) {
        console.log("No user")
        user = await User.create({ name, email, picture, uid });
    }

      const token = createUserToken(user._id)
    
      res.status(200).json({ token, name, email, picture });

  }

module.exports = { verifyToken, loginUser };