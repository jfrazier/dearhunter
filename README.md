# Dear Hunter,

A simple game project using PhaserJS and Electron.

author: Jason Frazier

# Getting Started

1. Clone the project from Github
2. Run `npm install`
3. Run `npm start`
4. Play the game

# Project Hierarchy

```bash
├── LICENSE             - The MIT License
├── README.md           - This README
├── app                 - All the application files
│   ├── app.js          - The application bootstrap script.
│   ├── assets          - All assets go here. Will copy to dist.
│   │   └── images      - You can structure these folders however you want.
│   ├── index.html      - The basic index.html
│   ├── states          - All the game states go here.
│   │   └── main.js     - The main game state.
├── dist                - This directory gets created when you run gulp.
├── gulpfile.js         
├── main.js             - Electron bootstrap file.
├── package.json        - NodeJS Package JSON.
└── vendor              - All vendor dependencies should go here.
    ├── css
    ├── fonts
    └── js
        └── phaser.js   - PhaserJS!
```

# License Notes

This project is licensed under MIT.

# Acknowledgements

Thanks to kitanata for getting PhaserJS running in Electron.
https://github.com/kitanata/Electron-Phaser
