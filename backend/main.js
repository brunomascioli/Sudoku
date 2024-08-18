const express = require('express');
const cors = require('cors');
const { generateToken, verifyToken } = require('./jwtUtils');
const bodyParser = require('body-parser');
const db = require('./database/config/database');
const { easyBoard, mediumBoard, hardBoard } = require('./boards');
const User = require('./database/models/user');
const GameTime = require('./database/models/gameTime');
const { getGameResultsByDifficulty } = require('./database/queries/gameQueries');
require('dotenv').config();

const app = express();
const PORT = process.env.SERVER_PORT;

app.use(cors());

app.use(bodyParser.json());

app.post("/", async (req, res) => { 
  const { username, password } = req.body;

  try {
    const user = await User.findOne({where:{ username }});
    
    if(!user)
      return res.status(401).json({ message: "Credenciais inválidas!" });
    
    if(user.password != password)
      return res.status(401).json({ message: "Credenciais inválidas!" });

    return res.status(200).json({
      message: "Login realizado com sucesso!",
      token: generateToken({ id: user.id })
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  
  try {
    await User.create({ username, password });
    return res.status(201).json({ message: "Usuário cadastrado com sucesso" })
  } catch (err) {
    return res.status(500).json({ error: "Erro ao criar usuário" })
  }
});


app.get("/game", [verifyToken, (req, res, next) => {
  const { difficulty } = req.query;

  console.log("requisicao recebida")
  switch (difficulty){
    case "easy": 
      return res.status(200).json({"table": easyBoard});
    case "medium": 
      return res.status(200).json({"table": mediumBoard});
    case "hard": 
      return res.status(200).json({"table": hardBoard});
    default:
      return res.status(400).json({"error": "Invalid difficulty level"});  
  }
}]);

app.post("/save-time", [verifyToken, async (req, res) => {
  const { gameTime, difficulty } = req.body;
  const userId = req.userId;

  try {
    const newGameTime = await GameTime.create({
      user_id: userId,
      game_time: gameTime,
      difficulty: difficulty
    });
    return res.status(201).json(newGameTime);
  } catch (error) {
    console.error('Error saving game time', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}]);

app.get("/game-results", [verifyToken, async (req, res) => {
  try{
    const results = await getGameResultsByDifficulty();
    return res.status(200).json(results);
  }catch (err) {
    return res.status(500).json({message: "Internal Server Error"})
  }
}])

db.sync()
  .then(() => app.listen(PORT, () => console.log(`servidor iniciado na porta ${PORT}`)))
  .catch(() => console.error("Erro ao conectar com o banco de dados"));