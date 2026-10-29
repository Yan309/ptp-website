# PTP Construction & Interior Works | Website

Static website for PTP Construction & Interior Works, Gulberg 2, Lahore.
Plain HTML, CSS and JavaScript: no build step, no frameworks.

## Files
```
index.html          the whole page
css/style.css       styles and animations
js/main.js          scroll effects, menu, gallery lightbox, copy buttons, WhatsApp form
assets/img/         PTP logo, brand image, paper-grain texture
assets/work/        project photos
assets/clients/     client logos
assets/icons/       client icons for the moving strip (Phosphor Icons, MIT licence)
```

## Preview locally
Open `index.html` in a browser.

## Updating content
- Text, phone numbers and links are all in `index.html`.
- To swap a photo, replace the file in `assets/work/` with a new one of the same name
  (or change the `src` in `index.html`).
- The WhatsApp number used by the quote form is at the top of `js/main.js`.

## Hosting
Live at **https://ptp-pk.com**, hosted on Cloudflare (free plan).
Cloudflare is connected to this GitHub repository and republishes the site
automatically about a minute after every `git push` to `main`.

The domain is registered at GoDaddy; its nameservers point to Cloudflare,
which manages DNS and HTTPS for ptp-pk.com and www.ptp-pk.com.

## Publishing a change
```
git add -A
git commit -m "Describe the change"
git push
```
