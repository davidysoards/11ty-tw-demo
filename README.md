`mkdir 11ty-tw-demo`
`cd 11ty-tw-demo`

`npm init -y`
`npm i @11ty/eleventy`

Make an index.html file

```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>

</body>
</html>
```

Make a markdown.md file

```
# Heading 1

## Heading 2

Lorem ipsum dolor sit amet consectetur, adipisicing elit. Impedit qui ducimus doloribus nulla mollitia dicta animi labore sint quidem ipsum, quasi, non harum libero tempore autem illo! Eum, similique accusamus!
```

https://www.markdownguide.org/basic-syntax/

`npx eleventy`

```
Update index.html

---
title: Beatles
---

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{ title }}</title>
</head>
<body>
  <h1>{{ title }}</h1>
</body>
</html>
```

`npx eleventy --serve`

Update index.html

```
---
title: Beatles
beatles:
  - John
  - Paul
  - George
  - Ringo
---

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{ title }}</title>
</head>
<body>
  <h1>{{ title }}</h1>
  <ul>
    {% for beatle in beatles %}
    <li>{{ beatle }}</li>
    {% endfor %}
  </ul>
</body>
</html>
```

Add dashes to the loop tags to remove extra whitespace

```
<ul>
  {%- for beatle in beatles %}
  <li>{{ beatle }}</li>
  {%- endfor %}
</ul>
```

Add a layout to the frontmatter of the markdown

```
---
layout: layout.html
---
```

Add a folder \_includes/ to the root and add a file layout.html with the following

```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{ pageTitle }}</title>
</head>
<body>
  {{ content }}
</body>
</html>
```

Update your markdown.md

```
---
layout: layout.html
pageTitle: The Markdown Page
---

# {{ pageTitle }}

Lorem ipsum dolor sit amet consectetur, adipisicing elit. Impedit qui ducimus doloribus nulla mollitia dicta animi labore sint quidem ipsum, quasi, non harum libero tempore autem illo! Eum, similique accusamus!
```

Update you layout.html

```
---
footNote: This is from the layout
---

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{ pageTitle }}</title>
</head>
<body>
  {{ content }}
  <small>{{ footNote }}</small>
</body>
</html>
```

Make 3 post files with this format

```
---
tags: post
layout: layout.html
title: The First Post
date: 2020-02-08
---

# {{ title }}

The world is going crazy.
```

Create a file blog.html with the following

```
---
pageTitle: Blog
layout: layout.html
---
<h1>{{ pageTitle }}</h1>
<h2>Posts</h2>
<ul>
{%- for post in collections.post %}
  <li>{{ post.data.title }}, {{ post.data.date }}</li>
{%- endfor %}
</ul>
```

Move your post-\*.md files into a folder named posts.

Make a \_header.html file in the \_includes/ folder

```
<header>
  <p>Header Text</p>
</header>
```

And also a \_includes/\_footer.html

```
<footer>
  <p>Footer Text</p>
</footer>
```

Update your layout.html

```
---
footNote: This is from the layout
---
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{ pageTitle }}</title>
</head>
<body>
{% include _header.html %}
  <main>
    {{ content }}
    <small>{{ footNote }}</small>
  </main>
{% include _footer.html %}
</body>
</html>
```

Create a \_data/ folder in the project root and add a file globalData.json

```
{
  "greeting": "Hello Global Data!"
}
```

Update your index.html file

```
---
layout: layout.html
pageTitle: The Beatles
beatles:
  - John
  - Paul
  - George
  - Ringo
---

<h1>{{ pageTitle }}</h1>
<ul>
  {%- for beatle in beatles %}
  <li>{{ beatle }}</li>
  {%- endfor %}
</ul>
<p><em>{{ globalData.greeting }}</em></p>
```

Change the \_data/globalData.json to \_data/globalData.js

```
module.exports = {
  greeting: "Hello Global Data!",
  currentYear: new Date().getFullYear()
}
```

Update \_includes/\_footer.html

```
<footer>
  <p>&copy; {{ globalData.currentYear }}</p>
</footer>
```

Create .eleventy.js config file at the project root

```
module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy('src/js');
  eleventyConfig.addPassthroughCopy('src/css/style.css');

  return {
    dir: {
      output: 'dist',
      input: 'src',
    },
  };
};
```

Make a src/ folder at the root and move the .html, .md, posts, \_includes and \_data folders into it.

Create a js/ folder and a src/js/main.js

```
console.log('it works!')
```

Update \_includes/layout.html

```
---
footNote: This is from the layout
---

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="/css/style.css" />
    <title>{{ pageTitle }}</title>
  </head>
  <body>
    {% include _header.html %} {{ content }}
    <small>{{ footNote }}</small>
    {% include _footer.html %}
    <script src="/js/main.js"></script>
  </body>
</html>
```

`npm i tailwindcss`

Create a css/ folder and src/css/tailwind.css file

```
@tailwind base;
@tailwind components;
@tailwind utilities;
```

`npx tailwindcss build src/css/tailwind.css -o src/css/style.css`

In src/\_include/layout.html add a class to the body

```
<body class="bg-gray-300">
```

Update the Markup in src/index.html

```
<h1 class="text-5xl">{{ pageTitle }}</h1>
<ul>
  {%- for beatle in beatles %}
  <li class="max-w-sm mx-auto p-6 bg-white rounded-md shadow-xl mb-6">
    {{ beatle }}
  </li>
  {%- endfor %}
</ul>
<p><em>{{ globalData.greeting }}</em></p>
```

In src/\_include/\_header.html add the following classes

```
<header class="bg-blue-700 text-white p-6">
```

Update src/\_include/\_footer.html

```
<footer class="bg-blue-700 text-white p-6">
  <p class="text-xs">&copy; {{ globalData.currentYear }}</p>
</footer>
```

Update the `<main>` in src/\_include/layout.html

```
<main class="container mx-auto px-4 py-2">
```

Update src/index.html

```
---
layout: layout.html
pageTitle: The Beatles
beatles:
  - name: John Lennon
    instrument: Guitar
    photo: https://res.cloudinary.com/davidsoards/image/upload/john.jpg
  - name: Paul McCartney
    instrument: Bass
    photo: https://res.cloudinary.com/davidsoards/image/upload/paul.jpg
  - name: George Harrison
    instrument: Guitar
    photo: https://res.cloudinary.com/davidsoards/image/upload/george.jpg
  - name: Ringo Starr
    instrument: Drums
    photo: https://res.cloudinary.com/davidsoards/image/upload/ringo.jpg
---

<h1 class="text-5xl">{{ pageTitle }}</h1>
<ul>
  {%- for beatle in beatles %}
  <li class="max-w-sm mx-auto p-6 bg-white rounded-md shadow-xl mb-6">
    <img src="{{beatle.photo}}" alt="{{beatle.name}}" />
    <h2>{{beatle.name}}</h2>
    <p>{{beatle.instrument}}</p>
  </li>
  {%- endfor %}
</ul>
<p><em>{{ globalData.greeting }}</em></p>
```

Update the markup in src/index.html

```
<h1 class="text-5xl font-bold">{{ pageTitle }}</h1>
<ul class="lg:grid lg:grid-cols-2 lg:gap-6">
  {%- for beatle in beatles %}
  <li
    class="max-w-xl sm:flex items-center mx-auto p-6 bg-white rounded-lg shadow-xl mb-6"
  >
    <img
      class="sm:w-1/2 sm:rounded-full"
      src="{{beatle.photo}}"
      alt="{{beatle.name}}"
    />
    <div class="text-center sm:text-left sm:pl-6">
      <h2 class="text-3xl font-bold">{{beatle.name}}</h2>
      <p class="text-xl">{{beatle.instrument}}</p>
    </div>
  </li>
  {%- endfor %}
</ul>
<p><em>{{ globalData.greeting }}</em></p>
```

`npx tailwindcss init`

or

`npx tailwindcss init --full`

`npm i postcss-cli @fullhuman/postcss-purgecss`

Make a postcss.config.js at the project root

```
const purgecss = require('@fullhuman/postcss-purgecss')({
  // Specify the paths to all of the template files in your project
  content: ['./src/**/*.html'],

  // Include any special characters you're using in this regular expression
  defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
});

module.exports = {
  plugins: [require('tailwindcss'), purgecss],
};
```

Add these scripts to your package.json file

```
"scripts": {
  "build:css": "postcss src/css/tailwind.css -o src/css/style.css",
  "build": "rm -rf dist && eleventy",
  "start": "eleventy --serve"
},
```
