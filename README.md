# Podorozhnyky (Travelers) 🌍✈️

**Podorozhnyky** is a modern web platform for travelers to share their adventures, find inspiration from others' stories, and plan new journeys.

## ✨ Key Features

- 📖 **Travel Stories**: Explore captivating narratives from travelers worldwide.
- ✍️ **Content Creation**: Share your own experiences by adding stories with photos and descriptions.
- 🔖 **Bookmarks**: Save interesting stories to your favorites for quick access later.
- 👤 **User Profiles**: Manage your personal information and track your own publications.
- 🔍 **Search & Filtering**: Easily find specific travelers or types of journeys.
- 🔐 **Authentication**: Secure registration and login, including fast sign-in via Google.
- 🌓 **Theming**: Toggle between Dark and Light modes for a comfortable experience at any time.
- 📱 **Responsive Design**: Fully optimized for smartphones, tablets, and desktops.

## 🛠 Tech Stack

- **Framework**: [Next.js 15+](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/)
- **Data Fetching**: [TanStack Query (React Query)](https://tanstack.com/query/latest) & [Axios](https://axios-http.com/)
- **Forms & Validation**: [Formik](https://formik.org/) & [Yup](https://github.com/jaredpalmer/yup)
- **Styling**: Vanilla CSS / CSS Modules
- **Authentication**: Custom Auth + Google Integration
- **UI Components**: React Icons, React Select, React Paginate
- **Feedback**: React Hot Toast / React Toastify

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:
- Node.js (LTS version recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/podorozhnyky-client.git
   ```

2. Navigate to the project directory:
   ```bash
   cd podorozhnyky-client
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

### Running Locally

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📂 Project Structure

- `src/app` — Routing and pages (Next.js App Router).
- `src/components` — Reusable UI components.
- `src/hooks` — Custom React hooks.
- `src/lib` — Third-party library configurations.
- `src/schemas` — Validation schemas (Yup).
- `src/store` — Global state management (Zustand).
- `src/types` — TypeScript type definitions.
- `src/utils` — Helper functions.
- `public` — Static assets (icons, images).

## 🏗 Production Build

To build and run the application for production:
```bash
npm run build
npm start
```

## ⚖️ License

This project was developed for educational purposes as part of the GoIT course.
