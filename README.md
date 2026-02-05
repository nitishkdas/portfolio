# Nitish Kr Das - Portfolio Website

A modern, dark-themed personal portfolio website for a Backend & Systems Engineer.

## Features

- Modern dark theme with Tailwind CSS v3.0
- Content-driven architecture (JSON-based content management)
- Responsive design with mobile menu support
- Clean typography (IBM Plex Sans, Inter, JetBrains Mono)
- Material Symbols icons integration
- Smooth hover effects and transitions

## Tech Stack

- **HTML5** - Semantic markup
- **Vanilla JavaScript** - No frameworks, pure ES6+
- **Tailwind CSS v3.0** - Utility-first CSS framework
- **PostCSS & Autoprefixer** - CSS processing
- **JSON** - Content management

## Project Structure

```
portfolio/
├── index.html              # Main HTML file
├── script.js               # JavaScript application logic
├── content.json            # Content configuration (edit this for updates)
├── tailwind.config.js      # Tailwind CSS configuration
├── postcss.config.js       # PostCSS configuration
├── package.json            # NPM dependencies
├── src/
│   └── input.css          # Tailwind CSS input file
├── dist/
│   └── output.css         # Generated CSS (build output)
└── README.md              # This file
```

## Setup & Installation

### Prerequisites
- Node.js (v14 or higher)
- NPM or Yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Build Tailwind CSS:
```bash
npm run build:tailwind
```

4. For development with auto-reload:
```bash
npm run watch:tailwind
```

5. Open `index.html` in your browser or serve with a local server:
```bash
npx serve .
# or
python -m http.server 8000
```

## Customization

### Updating Content

All content is stored in `content.json`. Edit this file to update:
- Personal information (name, role, email, social links)
- About section
- Skills and technologies
- Projects
- Engineering philosophy
- Contact information

### Updating Styles

- Colors: Edit `tailwind.config.js` theme colors
- Fonts: Currently using Google Fonts (IBM Plex Sans, Inter, JetBrains Mono)
- Spacing & Layout: Modify Tailwind utility classes in `index.html`

### Adding Projects

Add new projects to the `projects.list` array in `content.json`:

```json
{
  "title": "Project Name",
  "tagline": "Brief description",
  "technologies": ["Tech1", "Tech2"],
  "description": "Detailed description",
  "links": [
    {"text": "Source", "icon": "code", "href": "github-url"},
    {"text": "Demo", "icon": "open_in_new", "href": "demo-url"}
  ]
}
```

## Development

### Available Scripts

- `npm run build:tailwind` - Build CSS once
- `npm run watch:tailwind` - Build CSS and watch for changes

### Tailwind Configuration

The project uses Tailwind CSS with custom configuration:
- Custom color palette (dark theme)
- Custom fonts
- Grid pattern background
- Dark mode enabled

## Deployment

### Static Hosting (Recommended)

1. Build the project:
```bash
npm run build:tailwind
```

2. Deploy these files to your static host:
   - `index.html`
   - `script.js`
   - `content.json`
   - `dist/output.css`

### GitHub Pages

1. Push to GitHub
2. Go to Settings > Pages
3. Select source branch (usually `main`)
4. Your site will be live at `https://<username>.github.io/<repo-name>/`

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- No external JavaScript frameworks (lightweight)
- Optimized Tailwind CSS build
- Google Fonts with `display=swap` for performance
- CDN-hosted icons (Material Symbols)

## Accessibility

- Semantic HTML structure
- ARIA labels for navigation
- Keyboard navigation support
- High contrast color ratios
- Focus states for interactive elements

## License

MIT License - feel free to use this template for your own portfolio!

## Credits

Created by Nitish Kr Das

## Contact

- Email: [your-email@example.com]
- GitHub: [your-github-url]
- LinkedIn: [your-linkedin-url]
