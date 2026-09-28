import express from 'express';
import cors from 'cors';
import authRouter from './routes/auth.js';
import connectToDatabase from './db/db.js';
import employeeRouter from './routes/employee.js';
import departmentRouter from './routes/department.js';
import helmet from 'helmet';


connectToDatabase()

const app = express()
app.use(helmet())
app.use(cors())
app.use(express.json())
app.use(express.static('public/uploads'))
app.use('/api/auth', authRouter)
app.use('/api/department', departmentRouter)
app.use('/api/employee', employeeRouter)



app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})

