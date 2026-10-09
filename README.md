# My Web — Musenga Hope Sichula

Welcome to my web! This is my personal portfolio website for **ICT251 Web Technologies, Activity 3**
(Mulungushi University, School of Engineering and Technology). I am a BSc Data Science student, and the
site grew out of my Activity 2 page: it keeps my About Me, hobbies, learning plan, photos, video and audio,
and adds a Projects & Skills section, a professional responsive design and four JavaScript features.

- **Live site (Render):** <!-- TODO: Musenga — paste the onrender.com link after deploying --> _coming soon_
- **Source code:** https://github.com/hopemusenga26-cell/My-Web

Built with plain **HTML5, CSS and vanilla JavaScript**: no frameworks, no build step.

## JavaScript features and how to test them

All feature logic is in [`js/script.js`](js/script.js).

| # | Feature | How to test it |
|---|---------|----------------|
| 1 | **Contact form validation and preview** (compulsory) | Go to **Contact**. (a) Press *Validate & Preview* with everything empty: an error appears under Name, Email and Message. (b) Type only spaces in Name and Message: they are still rejected. (c) Enter `abc` or `a@b` as the email: "Please enter a valid email address". (d) Fill everything in correctly: a **"Validated — not sent"** preview appears below the form, without reloading the page. Nothing is ever sent or stored. |
| 2 | **Mobile navigation** | Make the window narrower than 769 px (or use a phone). The links collapse behind a **Menu** button. Press it: the menu opens and the button changes to **Close**. Choose a link: the page scrolls there and the menu closes. Escape or a click outside also closes it. |
| 3 | **Project search and filter** | In **Projects & Skills**, type in the search box (e.g. `java`, `OCR`, upper or lower case both work) or press a category button (*Data & AI*, *Programming*, *Web*). Type something that matches nothing (e.g. `zzz`): a "No projects match…" message appears. **Reset** shows all six projects again. |
| 4 | **Theme switch** | Press the **Theme** button in the header to switch between dark and light. The button always shows the current theme. Reload the page: your choice is remembered (localStorage; if the browser blocks storage the switch still works for that visit). |

Accessibility details: every control is reachable with the Tab key and shows a visible focus outline;
error messages use `aria-live` and `aria-invalid`; the menu button uses `aria-expanded` and `aria-controls`;
the animated background stops for visitors who choose *reduce motion*. The video and audio never autoplay.

## Folder structure

```
My-Web/
├── index.html          # the whole page (one h1, sections linked from the nav)
├── css/
│   └── styles.css      # external stylesheet: palette, layout, both themes, media queries
├── js/
│   └── script.js       # background animation + the four JavaScript features
├── images/
│   ├── photo1.jpg
│   ├── photo2.jpg
│   └── photo3.jpg
├── videos/
│   ├── video1.mp4      # introduction video
│   └── voice.m4a       # audio clip
├── Activity 1.html     # my Activity 1 page, kept for reference (not linked)
└── README.md
```

## Run it locally

Open the folder in VS Code and use **Live Server**, or run `python -m http.server` in the folder
and visit http://localhost:8000.

## Deployment

Deployed on **Render** as a Static Site from the `main` branch: Root Directory blank,
Build Command `echo "No build required"`, Publish Directory `.`, Auto Deploy on.

## Sources and credits

- Photos 1 and 2, the introduction video and the audio clip are my own.
- Photo 3 is an illustrated portrait of me.
- [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Learn): reference for HTML, CSS and JavaScript
  (form validation, `matchMedia`, `localStorage`, `aria-*` attributes).
- Colour contrast checked against WCAG 2.1 AA.
- AI assistance: Claude (Anthropic) helped restructure the page, write the CSS and JavaScript, and test it.
  The personal content, photos and media are my own.

&copy; 2026 Musenga Hope Sichula
