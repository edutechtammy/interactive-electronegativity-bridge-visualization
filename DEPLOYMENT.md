# 🚀 Deployment Guide

## Overview

This guide covers deploying the Interactive Electronegativity Bridge Visualization to various hosting platforms.

## Build for Production

First, create an optimized production build:

```bash
npm run build
```

This creates a `dist/` folder with optimized static files.

## Deployment Options

### Option 1: Vercel (Recommended - Easiest)

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Follow prompts**
   - Link to your account
   - Confirm settings
   - Deploy!

**Advantages**: 
- Free tier available
- Automatic HTTPS
- Global CDN
- Zero configuration
- Git integration

### Option 2: Netlify

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Deploy**
   ```bash
   netlify deploy --prod
   ```

3. **Or use Netlify Drop**
   - Go to https://app.netlify.com/drop
   - Drag and drop the `dist` folder
   - Done!

**Advantages**:
- Free tier available
- Drag-and-drop deployment
- Form handling
- Serverless functions

### Option 3: GitHub Pages

1. **Install gh-pages**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Update package.json**
   ```json
   {
     "homepage": "https://yourusername.github.io/interactive-electronegativity-bridge-visualization",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

3. **Update vite.config.ts**
   ```typescript
   export default defineConfig({
     plugins: [react()],
     base: '/interactive-electronegativity-bridge-visualization/'
   })
   ```

4. **Deploy**
   ```bash
   npm run deploy
   ```

**Advantages**:
- Free for public repos
- Direct GitHub integration
- Version control

### Option 4: Traditional Web Hosting

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Upload dist/ folder contents**
   - Use FTP/SFTP client (FileZilla, Cyberduck, etc.)
   - Upload all files from `dist/` to your web root
   - Typically `public_html/` or `www/`

3. **Configure .htaccess** (if Apache)
   ```apache
   <IfModule mod_rewrite.c>
     RewriteEngine On
     RewriteBase /
     RewriteRule ^index\.html$ - [L]
     RewriteCond %{REQUEST_FILENAME} !-f
     RewriteCond %{REQUEST_FILENAME} !-d
     RewriteRule . /index.html [L]
   </IfModule>
   ```

**Platforms**: Bluehost, HostGator, SiteGround, DreamHost, etc.

### Option 5: AWS S3 + CloudFront

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Create S3 Bucket**
   - Name: your-project-name
   - Enable static website hosting
   - Upload `dist/` contents

3. **Configure bucket policy**
   ```json
   {
     "Version": "2012-10-17",
     "Statement": [{
       "Sid": "PublicReadGetObject",
       "Effect": "Allow",
       "Principal": "*",
       "Action": "s3:GetObject",
       "Resource": "arn:aws:s3:::your-bucket-name/*"
     }]
   }
   ```

4. **Set up CloudFront** (optional but recommended)
   - Create distribution
   - Point to S3 bucket
   - Configure SSL certificate

**Advantages**:
- Highly scalable
- Global CDN
- Professional-grade
- Pay-as-you-go pricing

### Option 6: Docker Container

1. **Create Dockerfile**
   ```dockerfile
   FROM node:18-alpine as build
   WORKDIR /app
   COPY package*.json ./
   RUN npm ci
   COPY . .
   RUN npm run build

   FROM nginx:alpine
   COPY --from=build /app/dist /usr/share/nginx/html
   EXPOSE 80
   CMD ["nginx", "-g", "daemon off;"]
   ```

2. **Build image**
   ```bash
   docker build -t electronegativity-viz .
   ```

3. **Run container**
   ```bash
   docker run -p 80:80 electronegativity-viz
   ```

**Advantages**:
- Containerized deployment
- Easy scaling
- Cloud platform compatible
- Consistent environments

## Configuration for Different Platforms

### Base URL Configuration

If deploying to a subdirectory, update `vite.config.ts`:

```typescript
export default defineConfig({
  plugins: [react()],
  base: '/your-subdirectory/' // or './' for relative paths
})
```

### Environment Variables

Create `.env.production`:
```
VITE_API_URL=https://your-api.com
VITE_APP_NAME=Electronegativity Bridge
```

Access in code:
```typescript
const apiUrl = import.meta.env.VITE_API_URL;
```

## Performance Optimization

### Already Included
✅ Code splitting (Vite default)
✅ Tree shaking (Vite default)
✅ Minification (Vite default)
✅ CSS optimization
✅ Asset optimization

### Additional Optimizations

1. **Enable Gzip/Brotli** (server configuration)
2. **Set cache headers** for static assets
3. **Use CDN** for global distribution
4. **Enable HTTP/2** on server
5. **Preload critical resources**

## Testing Production Build Locally

```bash
npm run build
npm run preview
```

Open `http://localhost:4173` to test the production build.

## Continuous Deployment

### GitHub Actions (for Vercel/Netlify)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm ci
      - run: npm run build
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

## Custom Domain Setup

### Vercel
1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed

### Netlify
1. Go to Domain Settings
2. Add custom domain
3. Configure DNS or transfer domain

### GitHub Pages
1. Add CNAME file to `public/` folder
2. Content: `yourdomain.com`
3. Configure DNS A records:
   - 185.199.108.153
   - 185.199.109.153
   - 185.199.110.153
   - 185.199.111.153

## SSL/HTTPS

Most modern platforms provide automatic HTTPS:
- ✅ Vercel: Automatic
- ✅ Netlify: Automatic
- ✅ GitHub Pages: Automatic (for custom domains)
- ✅ CloudFront: Via AWS Certificate Manager

## Monitoring & Analytics

### Add Google Analytics

1. **Get tracking ID** from Google Analytics

2. **Add to index.html**
   ```html
   <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
   <script>
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());
     gtag('config', 'GA_MEASUREMENT_ID');
   </script>
   ```

### Performance Monitoring

Use built-in tools:
- Vercel Analytics (integrated)
- Netlify Analytics (paid)
- CloudWatch (AWS)
- Custom solution with monitoring library

## Troubleshooting

### Build Fails
```bash
# Clear cache and rebuild
rm -rf node_modules dist
npm install
npm run build
```

### 404 Errors on Routes
- Configure server for SPA routing
- Add `.htaccess` or equivalent configuration
- Ensure base URL is correct

### Assets Not Loading
- Check base URL configuration in `vite.config.ts`
- Verify build output includes all assets
- Check browser console for 404s

### Slow Loading
- Enable CDN
- Check bundle size: `npm run build -- --analyze`
- Implement code splitting if needed
- Optimize images and assets

## Cost Estimates

### Free Tiers
- **Vercel**: Free for hobby projects
- **Netlify**: 100GB bandwidth/month free
- **GitHub Pages**: Free for public repos
- **AWS S3**: ~$0.50/month for small site

### Paid Options
- **Vercel Pro**: $20/month
- **Netlify Pro**: $19/month
- **AWS**: Pay-as-you-go (typically $5-20/month)
- **Traditional Hosting**: $5-15/month

## Recommended Setup for Education

For classroom/educational use:

1. **Development**: Local (npm run dev)
2. **Demo/Testing**: Vercel (free tier)
3. **Production**: Netlify or Vercel (with custom domain)
4. **Institutional**: Self-hosted on university servers

## Support & Updates

After deployment:
1. Monitor error logs
2. Collect user feedback
3. Update content as needed
4. Rebuild and redeploy with `npm run build`

## Security Considerations

✅ This is a static site (low security risk)
✅ No backend = no database vulnerabilities
✅ No user authentication required
✅ HTTPS provided by modern platforms
✅ No sensitive data transmitted

## Backup Strategy

Keep backups of:
- Source code (Git repository)
- Configuration files
- Custom modifications
- Deployment settings

---

**Ready to Deploy!** Choose your platform and follow the steps above.

For questions or issues, refer to the main README.md or platform-specific documentation.
