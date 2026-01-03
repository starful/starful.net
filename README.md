# Starful Hub - Personal Portfolio Website

This repository contains the source code for **Starful Hub**, the personal branding and portfolio website of Starful.
It has been completely renewed with an **Apple-inspired minimalist design**, utilizing **Tailwind CSS** for styling and **Vanilla JavaScript** for logic. The site focuses on professional experience (PM, Engineering), technical skills, and personal projects.

## ✨ Features

- **Apple-Like Design**: A clean, premium aesthetic with frost-glass effects, smooth scrolling, and bento-grid layouts.
- **Multi-Language Support (i18n)**: Real-time toggling between **English** and **Japanese** without page reloads.
- **Responsive & Adaptive**: Fully optimized for desktops, tablets, and mobile devices using Tailwind CSS.
- **Interactive Experience Timeline**: An accordion-style career history section that expands to show detailed achievements.
- **Bento Grid Layout**: Visually engaging presentation of skills, roles, and blog categories.
- **Lightweight & Fast**: Built with pure HTML/JS/CSS (no heavy frontend frameworks), ensuring high performance.

## 📁 Project Structure

```text
.
├── Dockerfile          # Configuration for Nginx server image
├── .gcloudignore       # Files to ignore during Cloud Build
├── index.html          # Main landing page
├── css/
│   └── style.css       # Custom animations and fonts
├── js/
│   └── main.js         # i18n logic and interaction scripts
└── img/                # Profile, logos, and asset images
```

## 🚀 Deployment to Google Cloud Run

This project is deployed using **Google Cloud Build** and **Cloud Run**, utilizing **Artifact Registry** for image storage.

### Prerequisites

- Google Cloud SDK (`gcloud`) installed and authenticated.
- Project ID: `starful-258005`
- Artifact Registry Repository created: `starful-repo` (Location: `us-central1`)

### Step 1: Create Configuration Files

Ensure you have a `Dockerfile` and `.gcloudignore` in your root directory.

**Dockerfile:**
```dockerfile
FROM nginx:alpine
COPY . /usr/share/nginx/html
RUN sed -i 's/listen       80;/listen       8080;/g' /etc/nginx/conf.d/default.conf
EXPOSE 8080
```

**.gcloudignore:**
```text
.git
.DS_Store
```

### Step 2: Build & Push Image to Artifact Registry

Use Cloud Build to build the Docker image and push it directly to your Artifact Registry repository (`starful-repo`).

```sh
# Build and Push
gcloud builds submit --tag us-central1-docker.pkg.dev/starful-258005/starful-repo/starful-site:latest .
```

### Step 3: Deploy to Cloud Run

Deploy the container image to Google Cloud Run.

```sh
# Deploy Service
gcloud run deploy starful-site \
  --image us-central1-docker.pkg.dev/starful-258005/starful-repo/starful-site:latest \
  --platform managed \
  --region us-central1 \
  --port 8080 \
  --allow-unauthenticated
```

### (Optional) One-Command Deployment

If you want to build and deploy from source in a single step (requires API enablement):

```sh
gcloud run deploy starful-site --source .
```

---

## 🙌 Author

**Starful**
- **Roles:** Co-founder, Dev Manager, PM, Data Engineer
- **Contact:** starful@starful.net
- **Blogs:** [okpy.net](https://okpy.net) | [companyDB](https://companydb.net)
