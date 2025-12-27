# Starful's Portfolio Website

This repository contains the source code for the personal portfolio website of Starful. It's a fully responsive, single-page-focused website designed to showcase skills, professional experience, and personal projects, enhanced with smooth animations and interactive elements.

## ✨ Features

- **Responsive Design**: Optimized for a seamless experience on desktops, tablets, and mobile devices.
- **Dynamic Hero Section**: Features a "typed text" effect to introduce different roles and skills.
- **Interactive Animations**: Utilizes WOW.js to trigger CSS animations as the user scrolls.
- **Filterable Portfolio**: An interactive gallery that allows visitors to filter projects by category (Manager, Web, Apps & Data, etc.).
- **Detailed Experience Timeline**: A visually engaging timeline to present work history.
- **Dedicated Pages**: Includes a separate, consistently styled page for the Privacy Policy.

## 📁 Project Structure

```text
.
├── cloudbuild.yaml     # Configuration for Google Cloud Build
├── Dockerfile          # Docker configuration for Nginx server
├── index.html          # Main portfolio landing page
├── privacy.html        # Privacy Policy page
├── README.md           # This file
└── img/                # All images for the site
```
````

## 🚀 Deployment to Google Cloud Run

This project is configured for easy deployment to Google Cloud Run using Cloud Build.

### Step 1: Set Up Your Environment

1. **Configure gcloud CLI**
    Ensure you have the gcloud CLI installed and authenticated. Set your project ID to `starful-258005`.

    ```sh
    # Set the active project ID
    gcloud config set project starful-258005
    ```

2. **Enable Necessary APIs**
    Enable the APIs for Cloud Build and Cloud Run if you haven't already.

    ```sh
    gcloud services enable cloudbuild.googleapis.com
    gcloud services enable run.googleapis.com
    ```

3. **Create `cloudbuild.yaml`**
    Make sure the following `cloudbuild.yaml` file exists in your project's root directory. It instructs Cloud Build how to build and push your Docker image.

    ```yaml
    steps:
      # Step 1: Build the Docker image
      # The $PROJECT_ID variable will be automatically replaced by your project ID ('starful-258005').
      - name: "gcr.io/cloud-builders/docker"
        args: ["build", "-t", "gcr.io/$PROJECT_ID/starful-site:latest", "."]

      # Step 2: Push the image to Google Container Registry (gcr.io)
      - name: "gcr.io/cloud-builders/docker"
        args: ["push", "gcr.io/$PROJECT_ID/starful-site:latest"]

    # Specify the final image created by the build.
    images:
      - "gcr.io/$PROJECT_ID/starful-site:latest"
    ```

### Step 2: Build the Website Image

This command sends your code to Cloud Build, which builds the Docker image and pushes it to `gcr.io/starful-258005/starful-site`.

```sh
# Submit the build job from your project's root directory
gcloud builds submit --config cloudbuild.yaml .
```

### Step 3: Deploy to Cloud Run

After the image is successfully built, deploy it to Cloud Run in the US region.

```sh
# Deploy the service using the newly built image
gcloud run deploy starful-site \
  --image gcr.io/starful-258005/starful-site:latest \
  --platform managed \
  --region us-central1 \
  --port 8080 \
  --allow-unauthenticated
```

Your website will now be live at the URL provided by Cloud Run.

---

## 🙌 Author

Maintained by [**starful**](https://github.com/starful)