require('dotenv').config();
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./Config/db.js');
const authRoutes = require('./Routes/authRoutes.js');
const contactRoutes = require('./Routes/ContactRoutes.js');
const communityRoutes = require('./Routes/CommunityRoutes.js');
const favorisRoutes = require('./Routes/FavorisRoutes.js');
const promptRoutes = require('./Routes/PromptRoutes.js');
const promptsRoutes = require('./Routes/PromptsDetail.js');
const aiRoutes = require('./Routes/AiRoutes.js');
const adminRoutes = require('./Routes/AdminRoutes.js');
const collectionRoutes = require('./Routes/CollectionRoutes.js');
const profileRoutes = require('./Routes/ProfileRoutes.js');

dotenv.config();
connectDB();

const app = express();
 app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://prompth-que-ia-front-end-24ls.vercel.app/'
  ],
  credentials: true
}))
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/Contact', contactRoutes);
app.use('/api/community', communityRoutes);
app.use('/api/favoris', favorisRoutes);
app.use('/api/prompts', promptRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/collections', collectionRoutes );
app.use('/api/profile', profileRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'PromptHub API en ligne ✅' });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});