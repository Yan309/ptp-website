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

## Hosting on GitHub Pages
1. Create a new public repository on GitHub (for example `ptp-website`).
2. Upload everything in this folder **except** the `media/` and `logos/` source folders.
3. In the repository go to **Settings → Pages**, choose **Deploy from a branch**,
   branch `main`, folder `/ (root)`, and save.
4. The site goes live at `https://<your-username>.github.io/ptp-website/` within a minute or two.
