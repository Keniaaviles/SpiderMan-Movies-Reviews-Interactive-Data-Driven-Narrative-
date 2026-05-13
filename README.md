# Spider-Man Fan Review Universe

An interactive Spider-Man data storytelling project built using IMDb review data, custom visualizations and cinematic-inspired design. The project explores audience reactions, emotional themes and fan engagement across different Spider-Man movie eras.

---

# Tech Stack

* Next.js
* React
* TypeScript
* Tailwind CSS
* Chart.js
* Flourish Embeds
* CSV Data Processing

---

# Main Dataset

The project uses a CSV dataset located in:

```bash
public/data/spiderman_reviews.csv
```

Dataset columns:

* Rating
* Title
* Date
* Helpful_Vote
* Total_Vote
* Review
* Movie

---

# Features

## The Fan Memory Web

Analyzes recurring fan language and emotional themes across Spider-Man movies.

## Spider-Sense Timeline

Tracks review activity over time and shows how audience discussion changed around releases.

## Movie Comparison Systems

Uses aggregated movie-level review data to compare:

* audience ratings
* review engagement
* emotional themes
* fan agreement

## Interactive Cinematic Design

The site is designed to feel immersive and comic-inspired rather than looking like a standard analytics dashboard.

---

# Important Project Structure

```bash
app/                      → Main Next.js app pages
components/               → Reusable UI + visualization components
components/visualizations → Custom data visualizations
public/data/              → CSV dataset
styles/                   → Global styling
```

---

# How to Run the Project Locally

Since the Vercel deployment is currently unavailable for public access, the best way to view the project is locally.

## 1. Clone the Repository

Open Terminal on Mac or PowerShell/Command Prompt on Windows.

Copy and paste the following command exactly as shown:

```bash
git clone https://github.com/Keniaaviles/SpiderMan-Movies-Reviews-Interactive-Data-Driven-Narrative-.git
```

After cloning finishes, move into the project folder:

```bash
cd SpiderMan-Movies-Reviews-Interactive-Data-Driven-Narrative-
```

---

# Install Dependencies

This project uses Node.js.

Before installing dependencies, confirm that Node.js and npm are installed.

Copy and paste:

```bash
node -v
npm -v
```

If both commands return version numbers, install all required project dependencies:

```bash
npm install
```

If npm causes installation issues, use pnpm instead:

```bash
pnpm install
```

---

# Start the Development Server

Once dependencies finish installing, start the local development server.

Copy and paste:

```bash
npm run dev
```

or

```bash
pnpm dev
```

After running the command, the terminal should display a local URL similar to:

```bash
http://localhost:3000
```

Hold Command and click the link on Mac, or Ctrl and click on Windows.

You can also manually copy and paste the URL into your browser.

---

# Common Issues

## White Screen or Blank Page

If the site opens but shows a blank white screen, follow these steps in order.

Step 1 — reinstall dependencies:

```bash
npm install
```

Step 2 — restart the development server:

```bash
npm run dev
```

Step 3 — if the issue still continues, check the following:

* Make sure all dependencies installed correctly
* Make sure the CSV file exists inside `public/data/`
* Restart the terminal completely
* Delete `node_modules` and reinstall packages

Step 4 — complete dependency reset:

```bash
rm -rf node_modules
npm install
npm run dev
```

---

# Removing the Project From Your Device

If you no longer want the project on your computer, you can delete the project folder at any time.

## Mac

Open Terminal and run:

```bash
rm -rf SpiderMan-Movies-Reviews-Interactive-Data-Driven-Narrative-
```

## Windows

Open PowerShell and run:

```powershell
Remove-Item SpiderMan-Movies-Reviews-Interactive-Data-Driven-Narrative- -Recurse -Force
```

You can also manually delete the folder like any normal folder on your computer.

---

# Notes

* Some visuals use embedded Flourish visualizations.
* The experience is intended for desktop viewing.
* The project mixes cinematic storytelling with interactive review analysis.

---

# Project Goal

This project explores how fan reactions, nostalgia, audience agreement and emotional language changed across different Spider-Man movie eras.

Instead of only showing statistics, the goal was to create something that feels alive, emotional and immersive for Spider-Man fans.
