# ✨ Gratitude Jar ✨

Welcome to **Gratitude Jar**, a delightful web application built with Nuxt.js that allows you to capture and reflect on moments of gratitude throughout the year. Whether you're looking to embrace mindfulness or simply want a space to record weekly reflections, this app is your perfect companion.

## 🌟 Features

- **Weekly Reflections**: Add a message each week to capture what you're grateful for.
- **Countdown Timer**: Keep track of the time remaining until the end of the year.
- **Dark Mode**: Switch between light and dark themes for a comfortable viewing experience.
- **Authentication**: Log in with GitHub or Google to secure your messages.

## 📂 Project Structure

The project is organized as follows:

```
/project
├── app
│   ├── assets
│   ├── components
│   ├── composables
│   ├── layouts
│   ├── pages
│   └── utils
├── server
├── public
└── types
```

## 🚀 Getting Started

### Prerequisites

Ensure you have Node.js installed. The project uses Node version specified in `.nvmrc`.

### Setup

Clone the repository and install dependencies:

```
# Clone the repository
git clone https://github.com/Archetipo95/gratitude-jar.git

# Navigate into the project directory
cd gratitude-jar

# Install dependencies
bun install
```

### Development Server

Start the development server on `http://localhost:3000`:

```
bun run dev
```

### Building for Production

Build the application for production:

```
bun run build
```

Locally preview production build:

```
bun run preview
```

## 🛠️ Tech Stack

- **Nuxt.js**: A powerful Vue.js framework.
- **Nuxt UI 3**: Tailwind CSS 4, Nuxt Fonts, Nuxt Icons for a sleek UI.
- **Supabase**: Backend as a Service for authentication and database.

## 🌺 Features

- **🧪 Testing**: Comprehensive tests for all features.
- **🧹 Lint Project**: Add ESLint and Prettier for code quality.
- **🔍 Typecheck**: Add TypeScript for type safety.

## 🗺️ Roadmap

- **✅ Encryption**: End-to-end encryption for messages implemented using WebAuthn/device-based key derivation.
- **📧 Reminders**: Send weekly summary emails.
- **✨ Cheer Me Up**: Add motivational content.
- **🗑️ Account Deletion**: Allow users to delete their accounts.
- **👥 Groups**: Enable shared lists for group gratitude.
- **🌐 Internationalization**: Support multiple languages.
- **📚 Storybook**: Integrate Storybook for component testing.

## 📜 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.

---

Made with ❤️ by [Martin](https://github.com/Archetipo95). Explore the wonders of gratitude and make each week count! ✨
