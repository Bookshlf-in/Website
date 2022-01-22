<p align="center">
  <img src="https://raw.githubusercontent.com/Bookshlf-in/Website/main/public/images/logoView.png" width="350" />
  <h1 align="center">Bookshlf</h1>
</p>

Online Second Hand book store specially for Competitive Exams.

We are a small team of students who are enthusiastic developers. We are trying to create a better viable platform for students who want to learn but due to financial issues can't afford new books. We also want to help those who want to sell thier books which they don't need. We hope that you will find this platform usefull. We are always trying to make this platform better.

# Built With

- ### FrontEnd
  - [React](https://reactjs.org)
  - [Material UI](https://mui.com/)
- ### Hosting
  - [Firebase](https://firebase.google.com/)
- ### API
  - [axios](https://axios-http.com/)

# Contributing

Love the project and want to get involved? You’re in the right place!

# Contributors

<a href="https://github.com/Bookshlf-in/Website/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=Bookshlf-in/Website" />
</a>

Made with [contributors-img](https://contrib.rocks).

> Don't forget to ⭐ this repository !!

## Requirements

You will need `node` and `npm` installed globally on your machine.

- [Download and Install Nodejs](https://nodejs.org/en/download/)

* Open terminal, write the following command and press enter.

```
$ npm -v
```

The terminal should return your npm version.

## How to set up your local environment

#### 1. Clone App

- Make a new folder and open the terminal there.
- Write the following command and press enter.

```
  $ git clone https://github.com/Bookshlf-in/Website.git
```

#### 2. Install node packages

- Move inside the cloned folder.
- Write the following command and press enter to download all required node modules.

```
$ npm install
```

or

```
$ npm i
```

#### 3. Run Locally

- While you are still inside the cloned folder, write the following command to run the website locally.

```
  $ npm run start or npm start
```

## How to Contribute

To start contributing, follow the below guidelines:

**1.** Fork [this](https://github.com/Bookshlf-in/Website.git) repository.

**2.** Follow the Environment setup above.

**3.** Checkout into the dev branch. Create a branch from the dev branch with `git checkout -b branchname` where the name is something descriptive about the issue your branch will fix.

     $ git checkout -b <branch_name>

**4.** Make your changes, and test them to make sure they work.

**5.** Add and commit your changes

     $ git add . && git commit -m "<your_message>"

**6.** Push Code to Github under your branch

     $ git push origin <your_branch_name>

**7.** When you're ready to submit your pull request, merge the latest version of dev, to make sure your branch is up to date:

```
git checkout dev
git pull origin dev
git checkout <your_branch_name>
git merge dev
```

**8.** Resolve any merge conflicts if they exist, test to make sure your feature branch still works correctly, and then `git push origin <your_branch_name>`

**9.** On Github, create a pull request from your feature branch. Always make the PR against the dev branch! Make sure to summarize your changes you made, and if there's anything specific you want reviewed or tested, note that in the PR.

**10.** When approved, your branch will be merged into master and you're done! Thanks for contributing! :)

## API KEYS

- _This is a Neccessary Step to make APIs Work._

#### To Make API Requests Possible, Follow below Steps after Locally Setting Up Project.

- Create a File Named `.env` into Main Repository Folder eg : `...\Website\.env`.
- See `Demo.env.txt` for more clarity.
- Inside `.env` File Recently Created Add Following lines of Code

```
REACT_APP_BOOKSHLF=https://bookshlf.herokuapp.com/
REACT_APP_NODE_ENV=development
```

- Save and Restart your Project (if already running) with `npm start` to make changes Appear.

# Screenshots

## Author

**Abhishek Singh**

- [github/Mrhb787](https://github.com/Mrhb787)

## Copyright and License

Copyright (c) 2022, Bookshlf.

Bookshlf source code is licensed under the [MIT License](https://github.com/Bookshlf-in/Website/blob/main/LICENSE).
