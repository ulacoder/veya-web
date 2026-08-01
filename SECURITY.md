# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |

## Reporting a Vulnerability

If you discover a security vulnerability in Veya, please send an email to nurtasulagat@gmail.com.

**Please do not open public issues for security vulnerabilities.**

### What to Include

- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)

### Response Timeline

- Initial response: Within 48 hours
- Status update: Within 7 days
- Fix timeline: Depends on severity

## Security Measures

### Data Privacy

- No user data is stored on servers
- All image processing happens server-side temporarily
- Images are deleted immediately after analysis
- No cookies or tracking

### API Security

- CORS configured for production domains only
- Rate limiting on API endpoints
- Input validation on all uploads
- File size limits enforced (5MB)

### Best Practices

When deploying:

1. Use environment variables for sensitive data
2. Enable HTTPS in production
3. Keep dependencies updated
4. Monitor API usage
5. Implement rate limiting

## Known Limitations

- Model predictions should not replace professional medical diagnosis
- Accuracy varies by image quality
- Requires good lighting for best results
