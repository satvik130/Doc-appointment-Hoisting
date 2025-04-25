import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connetDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import adminRouter from './routes/adminRoute.js';
import doctorRouter from './routes/doctorRoute.js';
import userRouter from './routes/userRoute.js';

// -------- app config ----------
const app = express();
const port = process.env.PORT || 4000;

// Connect to DB and Cloudinary
connetDB();
connectCloudinary();

// -------- CORS Configuration --------
const allowedOrigins = [
  'https://doc-appointment-hoisting.vercel.app',
  'https://doc-appointment-hoisting-ifxs.vercel.app'
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

app.options('*', cors({ origin: allowedOrigins, credentials: true }));


// -------- middlewares ---------
app.use(express.json());

// -------- routes ----------
app.use('/api/admin', adminRouter);   // e.g., /api/admin/add-doctor
app.use('/api/doctor', doctorRouter); // e.g., /api/doctor/register
app.use('/api/user', userRouter);     // e.g., /api/user/book

// -------- base route --------
app.get('/', (req, res) => {
  res.send('API WORKING...');
});

// -------- start server --------
app.listen(port, () => {
  console.log(`Server Running on port ${port}`);
});
