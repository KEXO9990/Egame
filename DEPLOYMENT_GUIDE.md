# Closer - Couple's Connection Game

A romantic, elegant web game designed to help couples connect on a deeper level through meaningful questions and thoughtful challenges.

## 🎮 Game Features

- **Real-time Multiplayer**: Two players connect via room codes
- **Quiz Rounds**: Answer questions together and discover your compatibility
- **Challenge Cards**: Light, romantic, and deep challenges to grow closer
- **Beautiful UI**: Dark blue and gold theme with smooth animations
- **Mobile Friendly**: Works perfectly on phones and tablets

## 🚀 Complete Deployment Guide

### Prerequisites
- Node.js 18+ installed
- Git installed
- GitHub account
- Vercel account (free)
- Render account (free)

---

## 📦 Part 1: Deploy Backend to Render

### Step 1: Prepare Backend for Deployment

1. Navigate to the backend folder:
```bash
cd closer-backend
```

2. Initialize git repository:
```bash
git init
git add .
git commit -m "Initial backend commit"
```

3. Create a new repository on GitHub (call it `closer-backend`)

4. Push to GitHub:
```bash
git remote add origin https://github.com/YOUR-USERNAME/closer-backend.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy on Render

1. Go to [render.com](https://render.com) and sign in
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub account
4. Select the `closer-backend` repository
5. Configure the service:
   - **Name**: `closer-backend` (or any name you prefer)
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Select **Free**

6. Click **"Create Web Service"**

7. Wait for deployment (takes 2-5 minutes)

8. **Copy your backend URL** (e.g., `https://closer-backend.onrender.com`)

---

## 🎨 Part 2: Deploy Frontend to Vercel

### Step 1: Configure Frontend with Backend URL

1. Navigate to the frontend folder:
```bash
cd closer-frontend
```

2. Create a `.env` file:
```bash
VITE_SOCKET_URL=https://YOUR-BACKEND-URL.onrender.com
```
Replace `YOUR-BACKEND-URL` with your actual Render URL from Part 1.

3. Test locally (optional):
```bash
npm install
npm run dev
```

### Step 2: Prepare Frontend for Deployment

1. Initialize git repository:
```bash
git init
git add .
git commit -m "Initial frontend commit"
```

2. Create a new repository on GitHub (call it `closer-frontend`)

3. Push to GitHub:
```bash
git remote add origin https://github.com/YOUR-USERNAME/closer-frontend.git
git branch -M main
git push -u origin main
```

### Step 3: Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"Add New"** → **"Project"**
3. Import your `closer-frontend` repository
4. Configure the project:
   - **Framework Preset**: Vite
   - **Root Directory**: `./`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

5. Add Environment Variable:
   - Key: `VITE_SOCKET_URL`
   - Value: `https://YOUR-BACKEND-URL.onrender.com`

6. Click **"Deploy"**

7. Wait for deployment (takes 1-2 minutes)

8. **Copy your live URL** (e.g., `https://closer-game.vercel.app`)

---

## ✅ Part 3: Verify Everything Works

### Test the Game:

1. Open your Vercel URL on your phone or computer
2. Click **"Create New Game"**
3. Enter your name → You'll get a room code
4. Open the same URL on another device (or incognito window)
5. Click **"Join Game"** → Enter the room code
6. Both players should see each other
7. Click **"Start Game"** and play!

### Common Issues:

**Problem**: "Connection failed" or socket errors
- **Solution**: Check that your `.env` file has the correct Render URL
- Redeploy Vercel after fixing the environment variable

**Problem**: Backend is slow to respond (first request)
- **Solution**: This is normal for Render free tier. The backend "sleeps" after 15 minutes of inactivity. The first request wakes it up (takes 30-60 seconds).

**Problem**: Room code doesn't work
- **Solution**: Make sure both backend and frontend are deployed and the environment variable is correct

---

## 🎯 Your Live Game URLs

After deployment, you'll have:

- **Backend**: `https://closer-backend.onrender.com`
- **Frontend**: `https://closer-game.vercel.app` (or your custom domain)

**Share the frontend URL with your partner and enjoy!**

---

## 🔄 How to Update the Game

### Update Backend:
```bash
cd closer-backend
# Make your changes
git add .
git commit -m "Update game logic"
git push
```
Render will auto-deploy.

### Update Frontend:
```bash
cd closer-frontend
# Make your changes
git add .
git commit -m "Update UI"
git push
```
Vercel will auto-deploy.

---

## 🎨 Customization Ideas

- Add more questions in `closer-backend/data/questions.json`
- Add more challenges in `closer-backend/data/challenges.json`
- Customize colors in `closer-frontend/src/index.css`
- Change game name in `closer-frontend/index.html`

---

## 📱 Mobile Optimization

The game is fully responsive and works beautifully on:
- iPhone / Android phones
- Tablets
- Desktop browsers

---

## 💝 How to Play

1. One player creates a room and shares the room code
2. Second player joins using the code
3. Answer questions together
4. If answers match → earn points
5. If answers differ → get a discussion prompt
6. Complete challenges between rounds
7. Grow closer! ✨

---

## 🛠️ Tech Stack

- **Frontend**: React + Vite
- **Backend**: Node.js + Express
- **Real-time**: Socket.io
- **Deployment**: Vercel + Render
- **Styling**: Pure CSS with animations

---

## 📞 Support

If you encounter issues:
1. Check the browser console for errors
2. Verify environment variables are set correctly
3. Ensure backend is not sleeping (visit the backend URL directly)
4. Check that both services are deployed successfully

---

## 🎉 Enjoy Your Game!

Share the link with your partner and create meaningful moments together.

**Live Game**: Your-Vercel-URL-Here

Made with 💝 for couples everywhere.
