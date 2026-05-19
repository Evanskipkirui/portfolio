# Portfolio — Evans Rono

Personal portfolio website built using HTML, CSS, and JavaScript 
to showcase my skills, projects, and learning journey in IT.

---

## Project Structure

```
portfolio/
├── index.html        ← main page
├── css/
│   └── style.css     ← all styles
├── js/
│   └── main.js       ← interactions & animations
└── .nojekyll         ← tells GitHub Pages to skip Jekyll processing
```

---

## Before You Deploy

Open `index.html` and update the two placeholder URLs in the **Contact** section:

```html
<!-- LinkedIn — replace with your actual profile URL -->
<a href="https://www.linkedin.com/in/evans-rono-678b4b341/" ...>

<!-- GitHub — replace with your actual profile URL -->
<a href="https://github.com/Evanskipkirui/portfolio.git" ...>
```

---

## Deploy to GitHub Pages (step-by-step)

### 1 — Create a GitHub repository

Go to [github.com/new](https://github.com/new) and create a new repository.

| Option | Value |
|---|---|
| Repository name | `portfolio` *(or any name you like)* |
| Visibility | Public |
| Initialise with README | No |

### 2 — Push the code

Run these commands in your terminal from the `portfolio/` folder:

```bash
git init
git add .
git commit -m "Initial portfolio commit"
git remote add origin https://github.com/YOUR-USERNAME/portfolio.git
git branch -M main
git push -u origin main
```

### 3 — Enable GitHub Pages

1. Open your repository on GitHub.
2. Click **Settings** → **Pages** (left sidebar).
3. Under **Build and deployment**, set:
   - **Source**: `Deploy from a branch`
   - **Branch**: `main` / `/ (root)`
4. Click **Save**.

GitHub will build and publish the site. After about 30–60 seconds, it will be live at:

```
https://YOUR-USERNAME.github.io/portfolio/
```

*(If the repo is named `YOUR-USERNAME.github.io` exactly, the URL is simply `https://YOUR-USERNAME.github.io`.)*

---

## Running Locally

No server needed — just open `index.html` in any browser:

```bash
open index.html          # macOS
# or
npx serve .              # cross-platform, requires Node.js
```
