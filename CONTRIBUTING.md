# Contributing to Veya

Thank you for your interest in contributing to Veya! This document provides guidelines for contributing to the project.

## 🚀 Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/veya-web.git`
3. Create a branch: `git checkout -b feature/your-feature-name`
4. Make your changes
5. Test thoroughly
6. Commit: `git commit -m "Add: your feature description"`
7. Push: `git push origin feature/your-feature-name`
8. Open a Pull Request

## 📝 Commit Message Guidelines

Use clear, descriptive commit messages:

- `Add:` for new features
- `Fix:` for bug fixes
- `Update:` for updates to existing features
- `Refactor:` for code refactoring
- `Docs:` for documentation changes
- `Style:` for formatting changes

Example: `Add: scan history export to PDF feature`

## 🧪 Testing

Before submitting a PR:

1. Run `npm run build` to ensure no build errors
2. Test in both dark and light themes
3. Test in both English and Russian languages
4. Test on mobile and desktop viewports
5. Verify all user flows (Home → Connect → Scan → Analysis)

## 🎨 Code Style

- Use TypeScript for type safety
- Follow existing code formatting (Prettier config)
- Use Tailwind CSS utility classes (avoid inline styles)
- Keep components functional (React hooks)
- Add meaningful comments for complex logic

## 🌐 Translation Guidelines

When adding new text:

1. Add both English and Russian translations in `translations` object
2. Use the translation key via `t.section.key`
3. Keep translations concise and user-friendly

Example:
```typescript
const translations = {
  ru: { newFeature: 'Новая функция' },
  en: { newFeature: 'New Feature' }
}
```

## 🔐 Security

- Never commit API keys or secrets
- Use `.env.local` for sensitive data
- Validate all user inputs
- Sanitize data before rendering

## 📦 Dependencies

- Avoid adding unnecessary dependencies
- Prefer lightweight libraries
- Check bundle size impact before adding

## 🐛 Bug Reports

When reporting bugs, include:

- Steps to reproduce
- Expected behavior
- Actual behavior
- Screenshots (if applicable)
- Browser/OS information

## 💡 Feature Requests

For feature requests:

- Explain the use case
- Describe expected behavior
- Consider impact on existing features
- Discuss technical approach

## 🤝 Code Review Process

All PRs require review before merging:

- Maintainers will review within 48 hours
- Address feedback promptly
- Keep PRs focused (one feature per PR)
- Update documentation if needed

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

## 🙏 Thank You

Every contribution helps make eye health screening more accessible worldwide!
