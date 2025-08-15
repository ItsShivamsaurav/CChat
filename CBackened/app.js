const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const http = require('http');
const { Server } = require('socket.io');
const { v4: uuidv4 } = require('uuid');
const cors = require('cors');

const userRoute = require("./routes/userRoute")
const chatRoomRoute = require("./routes/chatRoomRoute")



const app = express();
const port = 3000;
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' },
});





const { checkForAuthenticationCookie } = require('./middlewares/authentication');   

mongoose.connect('mongodb://localhost:27017/CChat')
.then(()=> console.log("Connected to MongoDb."))
.catch((err)=> console.log("Error ",err));




app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({extended : true}));
app.use(checkForAuthenticationCookie("token"));





app.use('/', userRoute);
app.use('/chatroom', chatRoomRoute);

app.get('/', (req, res) => {
  res.send('Hello From Chat World!');
} 
);

require('./socket/chatsocket')(io);

server.listen(3000, () => {
  console.log('Server running on port 3000');
});