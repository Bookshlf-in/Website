<p align="center">
  <img src="https://raw.githubusercontent.com/Bookshlf-in/Website/main/public/images/logoView.png" width="350" />
</p>

# [Bookshlf](https://bookshlf.in)

Online E-Commerce Store for Selling & Purchasing Used Books. Specially for Competitive Exams.

- It Is a Student Oriented Platform.
- Bookshlf Pickups Books from Partnered Seller and sells to the buyer in any corner of India.
- Under Bookshlf Partnership Program the Partner is eligible for 60% of the profit earned by selling thier books.

# Index

|  #  |                         Title                          |                                    |                               |
| :-: | :----------------------------------------------------: | :--------------------------------: | :---------------------------: |
|  1  |                  [Built](#built-with)                  |
|  2  |             [Requirements](#requirements)              |
|  3  | [Setup Locally](#how-to-set-up-your-local-environment) |
|  4  |              [Contribute](#contributing)               |   [Contributing](#contributing)    | [Contributers](#contributors) |
|  5  |                 [API Keys](#api-keys)                  |
|  6  |             [Sample Screens](#screenshots)             | [Visit Store](https://bookshlf.in) |

# Built With

[ <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />](https://reactjs.org)

[<img src="https://img.shields.io/badge/Material%20UI-007FFF?style=for-the-badge&logo=mui&logoColor=white" />](https://mui.com/)

[<img src="https://img.shields.io/badge/firebase-ffca28?style=for-the-badge&logo=firebase&logoColor=black" />](https://firebase.google.com/)

[<img src="https://img.shields.io/badge/AXIOS-109989?style=for-the-badge&logo=FASTAPI&logoColor=white" />](https://axios-http.com/)

## Requirements

You will need `node` and `npm` installed globally on your machine.

- [Download and Install Nodejs](https://nodejs.org/en/download/)
- Open terminal, write the following command and press enter.

```bash
$ npm -v
```

The terminal should return your npm version.

> NOTE : npm version 14 and above is required!

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

# Contributing

Love the project and want to get involved? You’re in the right place!

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

**10.** Basic CI Checks should pass and when approved, your branch will be merged into master and you're done! Thanks for contributing!

# API KEYS

> This is a Neccessary Step to make APIs Work.

#### To Make API Requests Possible, Follow below Steps after Locally Setting Up Project.

- Create a File Named `.env` into Main Repository Folder eg : `...\Website\.env`.
- See `Demo.env.txt` for more clarity.
- Inside `.env` File Recently Created Add Following lines of Code

```bash
REACT_APP_BOOKSHLF=http://localhost:4000
REACT_APP_NODE_ENV=development
```

- Save and Restart your Project (if already running) with `npm start` to make changes Appear.

## Contributors

<a href="https://github.com/Bookshlf-in/Website/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=Bookshlf-in/Website" />
</a>

Made with [contributors-img](https://contrib.rocks).

> Don't forget to ⭐ this repository !!

## Future Plans

- Adding Next Js Framework for Server Side Rendering.
- Adding React Redux for States centeralization and better API Syncronization.
- Adding Theme Provider of mui.
- Full Fledged Admin Panel with Analytics.
- Adding Night Mode.
- Online Payments (Card / UPI)
- Coupons
- Enhanced Search with Recommendations
- User specific recommendation in home page

> Note : These are not mandatory upcoming changes. More changes can be introduced later.

## Author

**Abhishek Singh**

- [github/Mrhb787](https://github.com/Mrhb787)

## Copyright and License

Copyright (c) 2022, Bookshlf.

Bookshlf source code is licensed under the [MIT License](https://github.com/Bookshlf-in/Website/blob/main/LICENSE).
