# Readme‑Generator

An intuitive, no‑code web application that generates beautiful, structured, and production‑ready `README.md` files for your software repositories in seconds.

---

## Features

- **Generate from GitHub URL** – paste a repository link and let Gemini AI craft a README.
- **Generate from local ZIP** – upload a zipped repository and receive a ready‑to‑use README.
- **Live preview** – see the generated Markdown instantly in the browser.
- **Download** – export the generated file to your machine.
- **Database persistence** – generated READMEs are stored with Prisma for future reference.

---

## Tech Stack

- **Framework**: Next.js 13 (App Router) – TypeScript
- **Styling**: Tailwind CSS
- **AI**: @google/genai (Gemini)
- **State**: TanStack Query
- **Database**: Prisma (PostgreSQL adapter)
- **Utilities**: Axios, jszip, lucide‑react, react‑markdown, react‑hot‑toast

---

## Prerequisites

- Node.js 20+ (recommended)
- PostgreSQL (or any database supported by Prisma)
- A Gemini API key (from Google Cloud)

---

## Installation

```bash
# Clone the repository
git clone https://github.com/Yamanvashist/Readme-Generator.git
cd Readme-Generator

# Install dependencies
npm install

# Create a .env file with your environment variables
# Example:
#   GEMINI_API_KEY=your-gemini-api-key
#   DATABASE_URL=postgresql://user:pass@localhost:5432/dbname

# Run database migrations
npx prisma migrate dev --name init

# Start the development server
npm run dev
```

The app will be available at `http://localhost:3000`.

---

## Usage

1. Open the app in your browser.
2. Choose **Generate from URL** or **Generate from ZIP**.
3. Follow the on‑screen prompts to provide the repository source.
4. Review the live preview and click **Download** to save the `README.md`.

---

## Contributing

Feel free to open issues or submit pull requests. All contributions are welcome!

---

## License

No license file is included in this repository. If you plan to use or modify the code, please check the original source or contact the author.