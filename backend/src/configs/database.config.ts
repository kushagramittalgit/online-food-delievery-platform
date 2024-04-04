import {connect,ConnectOptions} from 'mongoose';

export const dbConnect = () => {
    connect(process.env.MONGO_URL!, {
        useNewUrlParser:true,
        useUnifiedTopology:true
    } as ConnectOptions).then(
        () => console.log('Database connected'),
        (err) => console.log('Database connection error', err)
    
    )
}