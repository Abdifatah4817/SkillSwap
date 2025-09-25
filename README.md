
---

## 🌐 Deployment Guide

### 🔷 Frontend (Netlify)

1. Go to [https://netlify.com](https://netlify.com)
2. Create a new site from GitHub repo
3. Set:
   - Build command: *(leave blank)*
   - Publish directory: `.`
4. Click **Deploy**
5. Copy your live site URL (e.g. `https://skillswap.netlify.app`)

---

### 🔶 Backend (Render)

1. Go to [https://render.com](https://render.com)
2. Create new **Web Service**
3. Connect your GitHub repo
4. Set:
   - **Start command**: `json-server --watch db.json --port 10000`
5. Copy the deployed backend URL (e.g. `https://skillswap-api.onrender.com`)
6. Update `api.js`:

```js
// js/api.js
const API_URL = 'https://skillswap-api.onrender.com/skills';
