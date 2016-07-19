# 🎛 Dash Components

[![Build Status](https://travis-ci.org/dashaudio/dash-components.svg?branch=production)](https://travis-ci.org/dashaudio/dash-components)

## Documentation

For complete documentation, please view the component guide at `https://components.dashaudio.co/`.

## Quick Start

The web components can be used by including a single script tag on your page:

    <script src="https://components.dashaudio.co/versions/vX.Y.Z/components.js"></script>
    <dash-button primary>My Button</dash-button>

The library also exports a style sheet which can be used independently of the components:

    <link rel="stylesheet" href="https://components.dashaudio.co/versions/vX.Y.Z/components.css" />
    <span class="dash-text-heading">My Heading</span>

You may also include the library directly via NPM. The NPM distribution contains the script and
optional stylesheet, but note that external resources such as fonts and images are not included,
and at runtime the script will call `https://components.dashaudio.co` as needed to get them.

    npm install dash-components --save-dev
    require('dash-components')
