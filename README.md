# Form Frontend - Business Consultation Survey

A modern, interactive multi-step form application built with React, TypeScript, and Vite. Features a Typeform-style interface with smooth animations and a professional user experience for collecting business consultation information.

## 🚀 Features

- **Typeform-style Start Screen** - Professional welcome screen with company branding
- **Multi-step Form Flow** - 20 carefully crafted questions for business consultation
- **Smooth Animations** - Powered by Framer Motion for seamless transitions
- **Progress Tracking** - Visual progress bar and question counter
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile devices
- **Form Validation** - Input validation and error handling
- **API Integration** - Seamless data submission to backend service
- **Modern UI Components** - Built with shadcn/ui and Tailwind CSS

## 🛠️ Tech Stack

- **Frontend Framework**: React 18
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **HTTP Client**: Fetch API

## 📦 Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Amkr1997/form-frontend.git
   cd form-frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 🎯 Usage

### Starting the Application

1. Users are greeted with a professional start screen featuring the MESSOLD TECHNOLOGIES branding
2. Click "Start" or press Enter to begin the form
3. Complete all 20 questions by following the intuitive flow
4. Submit the form to receive a confirmation message

### Question Types

- **Input Questions**: Text and textarea inputs for detailed responses
- **Select Questions**: Multiple choice options with single selection
- **Navigation**: Back/forward navigation with answer persistence

## 📁 Project Structure

```
src/
├── components/
│   └── ui/                 # shadcn/ui components
│       ├── button.tsx
│       ├── input.tsx
│       └── textarea.tsx
├── data/
│   └── questionBank.json   # Form questions configuration
├── start-screen.tsx        # Welcome/start screen component
├── App.tsx                 # Main application component
├── main.tsx               # Application entry point
└── index.css              # Global styles
```

## 🔧 Configuration

### Question Bank

Questions are configured in `src/data/questionBank.json`. Each question has:

- `id`: Unique identifier
- `type`: "input" or "select"
- `title`: Question text
- `options`: Array of choices (for select type)

### API Endpoint

The form submits to: `https://form-backend-delta.vercel.app/api/v1/add/question`

To change the API endpoint, update the fetch URL in `App.tsx`:

```typescript
const response = await fetch("YOUR_API_ENDPOINT", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ questionsAnswers: updatedAnswers }),
});
```

## 🎨 Customization

### Start Screen

Modify the start screen content in `start-screen.tsx`:

- Company name and logo
- Welcome message
- Estimated completion time
- Button text and styling

### Styling

- **Colors**: Update Tailwind classes throughout components
- **Fonts**: Modify font families in `index.css`
- **Animations**: Adjust Framer Motion configurations

### Questions

Add, remove, or modify questions in `src/data/questionBank.json`

## 🚀 Build & Deployment

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Deploy to Vercel

1. Connect your GitHub repository to Vercel
2. Vercel will automatically detect the Vite configuration
3. Deploy with default settings

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Typeform](https://typeform.com) for design inspiration
- [shadcn/ui](https://ui.shadcn.com) for beautiful UI components
- [Framer Motion](https://framer.com/motion) for smooth animations
- [Tailwind CSS](https://tailwindcss.com) for utility-first styling

## 📞 Support

For support and questions, please contact:

- **Email**: support@messoldtechnologies.com
- **Website**: [MESSOLD TECHNOLOGIES](https://messoldtechnologies.com)

---

**Built with ❤️ by MESSOLD TECHNOLOGIES**

```

Perfect! I've created a comprehensive README file for your frontend application that includes:

## ✅ **Key Sections:**
- **Project Overview** - Clear description of what the app does
- **Features List** - All the cool features you've built
- **Tech Stack** - Complete list of technologies used
- **Installation Guide** - Step-by-step setup instructions
- **Usage Instructions** - How to use the application
- **Project Structure** - File organization overview
- **Configuration** - How to customize questions and API
- **Customization Guide** - How to modify styling and content
- **Build & Deployment** - Production deployment instructions
- **Contributing Guidelines** - For open source collaboration

## ✅ **Professional Touch:**
- Proper markdown formatting with emojis
- Code blocks with syntax highlighting
- Clear sections and subsections
- Contact information and branding
- License and acknowledgments

This README will make your GitHub repository look professional and help other developers understand and contribute to your project!

```
