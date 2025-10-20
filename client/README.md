# Bloom - Life Collection Business Card Creator

A modern, responsive business card creator built with Next.js, TypeScript, and Tailwind CSS. Create, customize, and download professional business cards with interactive 3D preview and QR code generation.

## ✨ Features

### 🎨 **Card Customization**
- **4 Card Styles**: Modern, Classic, Minimal, Creative
- **5 Color Schemes**: Professional Blue, Nature Green, Creative Purple, Energetic Orange, Classic Black
- **3 Font Styles**: Sans Serif, Serif, Monospace
- **Custom Background Colors**: Dynamic color picker with real-time preview
- **Border Styling**: Dynamic border effects based on card style

### 📱 **Interactive Preview**
- **3D Card Preview**: Drag to rotate and view your card in 3D
- **Real-time Updates**: See changes instantly as you edit
- **Responsive Design**: Scales beautifully on all screen sizes
- **Download as PNG**: High-quality image export for printing

### 🔄 **QR Code Integration**
- **Automatic vCard Generation**: Creates QR codes with your contact information
- **SVG Format**: Crisp, scalable QR codes
- **Embedded Contact Data**: Name, company, title, email, phone, and website

### 📊 **Dashboard & Data Management**
- **Document Table**: View and manage all your business cards
- **Advanced Filtering**: Search and filter by name, type, and details
- **Column Management**: Hide/show columns as needed
- **Scrollable Interface**: Handles large datasets efficiently

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd bloom-client
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Set up environment variables**
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
```

4. **Run the development server**
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

5. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
src/
├── app/                          # Next.js App Router
│   ├── dashboard/               # Dashboard with data table
│   ├── services/business-card/  # Business card routes
│   │   ├── create/             # Card creation form
│   │   └── render/             # Card rendering page
│   └── globals.css             # Global styles
├── components/                  # Reusable components
│   ├── ui/                     # shadcn/ui components
│   └── preview.tsx             # 3D business card preview
├── contexts/                   # React Context providers
│   ├── business-card-form-context.tsx  # Form state management
│   └── data-table.tsx          # Data table component
└── lib/                        # Utilities
    └── utils.ts               # Helper functions
```

## 🛠️ Tech Stack

### **Frontend Framework**
- **Next.js 14+** - React framework with App Router
- **TypeScript** - Type-safe development
- **React 18** - Latest React features

### **Styling & UI**
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Beautiful, accessible component library
- **Responsive Design** - Mobile-first approach

### **Data Management**
- **TanStack Table** - Powerful data tables with filtering, sorting
- **React Context** - Global state management for forms

### **Additional Libraries**
- **html2canvas** - High-quality image export
- **QR Code Generation** - SVG-based QR codes
- **hex2rgb** - Color manipulation utilities

## 🎯 Key Features Deep Dive

### Business Card Creation Workflow
1. **Content Step**: Enter personal and professional information
2. **Styling Step**: Choose card style, colors, fonts, and background
3. **QR Generation**: Automatic vCard QR code creation
4. **Save & Export**: Save to database and download as PNG

### Interactive 3D Preview
- **Mouse Drag**: Rotate card on Y and Z axes
- **Responsive Scaling**: Maintains aspect ratio across screen sizes
- **Real-time Updates**: Immediate feedback for all customizations
- **Reset Controls**: Return to default position

### Advanced Data Table
- **External Filtering**: Parent components can control table filters
- **Column Visibility**: Show/hide columns dynamically
- **Scrollable Body**: Fixed header with scrollable content
- **Search & Filter**: Multiple filter types (text, preset filters)

## 🧪 Testing

Run the test suite:
```bash
npm test
# or
yarn test
```

## 📦 Build & Deployment

### Production Build
```bash
npm run build
# or
yarn build
```

### Start Production Server
```bash
npm start
# or
yarn start
```

### Deploy on Vercel
The easiest way to deploy is using the [Vercel Platform](https://vercel.com/new):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/bloom-client)

## 🔧 Configuration

### Environment Variables
- `NEXT_PUBLIC_API_BASE_URL` - Backend API endpoint (default: http://localhost:8000)

### Tailwind Configuration
Custom configurations in `tailwind.config.ts` for:
- Custom aspect ratios for business cards (500/285)
- Extended color palette
- Custom spacing and sizing

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:
1. Check the [Issues](https://github.com/your-username/bloom-client/issues) page
2. Create a new issue with detailed information
3. Include screenshots for UI-related problems

---

Built with ❤️ using Next.js, TypeScript, and Tailwind CSS
