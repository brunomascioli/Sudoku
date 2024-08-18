const jwt = require('jsonwebtoken');
const fs = require('fs');

const privateKey = fs.readFileSync("./keys/private.key", "utf8");
const publicKey = fs.readFileSync("./keys/public.key", "utf8")

function generateToken(payload){
  return jwt.sign(payload, privateKey, {
    algorithm: "RS256",
    expiresIn: '1h'
  })
}

function verifyToken(req, res, next){
  const header = req.headers["authorization"];
  if (header === 'undefined') res.sendStatus(403);
  
  const token = header.split(" ")[1]; // 'Bearer <token>'
  
  if(!header){
    return res.status(401).json({
      authenticated: false,
      message: "Header not found"
    })
  }

  if(!token) {
    return res.status(401).json({
      authenticated: false,
      message: "Token not recognized"
    });
  }

  jwt.verify(token, publicKey, { algorithms: ["RS256"] }, (err, decoded) => {
    if(err) {
      return res.status(401).json({
        authenticated: false,
        message: "Invalid Token"
      })
    }
    req.userId = decoded.id;
    console.log(decoded.id)
    return next();
  })
}

module.exports = {
  verifyToken,
  generateToken
}