# Musenga Hope Sichula — Personal Portfolio Website

**ICT251 Web Technologies — Activity 3: Interactive Personal Website**
Mulungushi University, School of Engineering and Technology

- **Live website:** https://musenga-hope-sichula-portfolio.onrender.com
- **Source code:** https://github.com/hopemusenga26-cell/My-Web

## About this website

This is my personal portfolio website. I am a BSc Data Science student (Student No. 202511308).
I built the site in Activity 2 and improved it for Activity 3: it now has a professional, responsive
design that works on phones and computers, a Projects & Skills section, and five interactive
JavaScript features.

The website is made with plain **HTML5, CSS and JavaScript**. It does not use any frameworks
and needs no build step.

### Sections on the page

| Section | What it contains |
|---|---|
| Home | My name, programme, a short introduction and a **View My Projects** button |
| About Me | A paragraph about me and my studies |
| Projects & Skills | Six examples of what I have built and learned, with a search and filter |
| My Hobbies | Three hobbies |
| My Learning Plan | Three learning steps, a weekly learning table and a study hours calculator |
| My Photos | Three captioned photos |
| My Media | My introduction video and audio clip, each with a written summary |
| Contact | A contact form that is checked in the browser (no message is sent) |

## The five JavaScript features

All of the JavaScript is in [`js/script.js`](js/script.js).

### 1. Contact form validation and preview (compulsory)

The form checks the name, email and message when you press **Validate & Preview**. It shows an
error next to any field that is wrong. When everything is correct, it shows a summary of what you
typed under the form, without reloading the page.

This is a browser demonstration only: **no message is sent** and nothing is saved.

**How to test it** (in the Contact section):

1. Press **Validate & Preview** with all fields empty → an error appears under Name, Email and Message.
2. Type only spaces in Name and Message → they are still rejected.
3. Type `abc` as the email → "Please enter a valid email address" appears.
4. Fill in every field correctly → a **"Validated — not sent"** summary appears below the form.

### 2. Mobile navigation

On narrow screens the menu links are hidden behind a **Menu** button to save space.

**How to test it:**

1. Make the browser window narrow (under 769 px), or open the site on a phone.
2. Press **Menu** → the links open and the button changes to **Close**.
3. Press a link → the page goes to that section and the menu closes.
4. Pressing **Close**, the Escape key, or clicking outside the menu also closes it.

### 3. Project search and filter

Visitors can search the projects or show only one category.

**How to test it** (in the Projects & Skills section):

1. Type `python` or `java` in the search box → only matching projects are shown.
2. Press **Data & AI**, **Programming** or **Web** → only that category is shown.
3. Type `zzz` → a "No projects match…" message appears.
4. Press **Reset** → all six projects are shown again.

### 4. Light / dark theme switch

The **Theme** button in the header switches the whole site between a dark and a light appearance.

**How to test it:**

1. Press the **Theme** button → the colours change and the button shows the current theme.
2. Reload the page → the site remembers your choice.

### 5. Study hours calculator

In the **My Learning Plan** section, visitors enter their planned study hours per day and days per
week, and the calculator shows the total study hours for the week.

**How to test it:**

1. Enter `2` hours and `5` days, then press **Calculate Weekly Hours** → "2 hours a day × 5 days a week = 10 hours of study per week."
2. Decimals work: `1.5` hours × `3` days → 4.5 hours.
3. Leave a field blank, or type `abc` → an error message appears next to that field.
4. Type `-2` hours → "Hours cannot be negative."
5. Type `0` or `8` days → "Days per week must be from 1 to 7."
6. Press **Clear** → the fields, errors and result are cleared.

## Accessibility

- Every link, button and form field can be reached with the **Tab** key and shows a visible focus outline.
- Every photo has a description (alt text), and every form field has a label.
- Text has strong contrast with its background in both themes.
- The video and audio do not play automatically, and nothing on the page moves on its own.

## Folder structure

```
My-Web/
├── index.html          the website (all sections)
├── css/
│   └── styles.css      all the styling: colours, layout, both themes, phone layout
├── js/
│   └── script.js       the five JavaScript features
├── images/             my three photos
├── videos/             my introduction video (video1.mp4) and audio clip (voice.m4a)
├── Activity 1.html     my first web page from Activity 1, kept for reference
└── README.md           this file
```

## How to view the website

- **Online:** open https://musenga-hope-sichula-portfolio.onrender.com
- **On your own computer:** download or clone this repository, open the folder in VS Code,
  right-click `index.html` and choose **Open with Live Server**.

## How it is published

The site is hosted on **Render** as a Static Site, connected to the `main` branch of this
GitHub repository. Every time I push a change to `main`, Render updates the live website.

| Render setting | Value |
|---|---|
| Root Directory | (blank) |
| Build Command | `echo "No build required"` |
| Publish Directory | `.` |
| Auto Deploy | On |

## Sources and credits

- Photos 1 and 2, the introduction video and the audio clip are my own. Photo 3 is an illustrated portrait of me.
- [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Learn) — reference for HTML, CSS and JavaScript.
- AI assistance: Claude (Anthropic) helped me restructure the page, write the CSS and JavaScript,
  and test it. The personal content, photos and media are my own.

&copy; 2026 Musenga Hope Sichula
