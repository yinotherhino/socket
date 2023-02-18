import express from "express";
import cors from "cors";
import path from "path";
import { Server, Socket } from "socket.io";
import http from "http";

const app = express();


const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

app.use(cors({origin:"*"}));
app.get("/", (req, res) => {
  res.sendFile(path.resolve("public/index.html"));
});

io.use((socket:Socket, next) => {
  const userid = socket.handshake.auth.userid;
  if (!userid) {
    return next(new Error("invalid username"));
  }
  // console.log(userid)
  socket.userid = userid;
  next();
});

io.on("connection", (socket:Socket) => {
  console.log("a user connected");

  socket.on("chat message", (msg) => {
    console.log("message: " + msg);
    console.log(socket.userid)
    
    socket.broadcast.emit("chat message", msg); // This will emit the event to all connected socket
  });

  // socket.onAny((e, ...args)=>{
  //   console.log( args)
  // })

  socket.on("private message", ({ content, to }) => {
    socket.to(to).emit("private message", {
      content,
      from: socket.id,
    });
  });

  socket.on("location", (coords) =>{
    console.log(coords)
  })
  // console.log(socket.id)
  io.emit("sessionid", socket.id)

  socket.on("session",(sessionDetails)=>{
    console.log(sessionDetails)
    // socket
  })

  io.emit("welcome","Welcome to the chat!")

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});


server.listen(3057, () => {
  console.log("listening on *:3057");
});
