import express from "express";
import notes from "./data/notes.js";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from './routes/userRoutes.js';
import {notFound,errorHandler} from "./models/errorMiddleware.js";
import path from "path";



dotenv.config();
connectDB();

const app = express();

app.use(express.json());

app.use("/api/users", userRoutes);


//serves all of the notes


//serves one of the single notes
app.get("/api/notes",(req, res)=>{
    res.json(notes);
});

app.use("/api/users/",userRoutes);

//------------------------------------------deployment--------------------------------

const __dirname = path.resolve()
if(process.env.NODE_ENV==='production'){
app.use(express.static(path.join(__dirname,"frontend/build")));


app.get('*',(req,res)=>{
res.sendFile(path.resolve(__dirname,"frontend/build","index.html"))
})
}else {
    app.get("/",(req,res)=> {
        res.send("API is running..");
    });
}


//------------------------------------------deploymrnt-------------------------------------------

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT , "0.0.0.0",function(){ console.log("server started on PORT 5000  ");
});