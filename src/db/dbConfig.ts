import mongoose from "mongoose";


export async function connectdb(){
    try {
        mongoose.connect(process.env.MONGO_URI !)
        const connection=mongoose.connection 

        connection.on('connected',()=>{
            console.log('mongodb is connected');
        })
        connection.on('error',(err)=>{
          console.log('mongodb connection error,Please make sure db is up and running :'+err);
          process.exit()
        })
        } catch (error) {
        console.log('something went wrong in connection to database');
        console.log(error);
    }
}