<p align="center">
  <img src="https://raw.githubusercontent.com/Bookshlf-in/Website/main/public/images/logoView.png" width="350" />
</p>

# [Bookshlf](https://bookshlf.in)

Online E-Commerce Store for Selling & Purchasing Used Books. Specially for Competitive Exams.

- It Is a Student Oriented Platform.
- Bookshlf Pickups Books from Partnered Seller and sells to the buyer in any corner of India.
- Under Bookshlf Partnership Program the Partner is eligible for upto 60% of the profit earned by selling thier books.

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

**10.** When approved, your branch will be merged into master and you're done! Thanks for contributing! :)

## Contributors

<a href="https://github.com/Bookshlf-in/Website/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=Bookshlf-in/Website" />
</a>

Made with [contributors-img](https://contrib.rocks).

> Don't forget to ⭐ this repository !!

# API KEYS

- This is a Neccessary Step to make APIs Work.

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

![about](https://user-images.githubusercontent.com/56078689/150652118-c9a16ed7-9d64-468f-9301-ee2610458e91.png)
![addbook](https://user-images.githubusercontent.com/56078689/150652120-0ae6e910-5ad4-4d1d-9054-60b10470e66d.png)
![address](https://user-images.githubusercontent.com/56078689/150652126-dc0c5a0e-a8f9-4263-b3ab-a23d9d380e9e.png)
![bookdetails](https://user-images.githubusercontent.com/56078689/150652129-be5ba10c-36d0-44f9-9958-9228c470adb9.png)
![cart](https://user-images.githubusercontent.com/56078689/150652130-ac89daa6-ee38-4a41-beea-4651a1eee00c.png)
![checkout](https://user-images.githubusercontent.com/56078689/150652136-e6b37fb5-473f-4d74-86e0-0aee83bc62d7.png)
![contact](https://user-images.githubusercontent.com/56078689/150652138-a6724825-e465-4e2c-91ea-9c3ce7be5461.png)
![home1](https://user-images.githubusercontent.com/56078689/150652142-94ca8407-7ef9-4b17-abf9-1cbe3bd0a2b8.png)
![home2](https://user-images.githubusercontent.com/56078689/150652144-7a9bea54-2961-42c5-b9c6-826e8070d8ac.png)
![home3](https://user-images.githubusercontent.com/56078689/150652147-763f8fec-e894-4641-9e83-219fef8c4b17.png)
![home4](https://user-images.githubusercontent.com/56078689/150652153-2baced4f-b03c-4a87-a99e-e7d429a7ab72.png)
![login](https://user-images.githubusercontent.com/56078689/150652158-3e3ae064-ecf2-4381-bb13-8df6b0dc3a6c.png)
![order](https://user-images.githubusercontent.com/56078689/150652161-d409b76f-1eeb-40fd-9440-7e8d44659e1e.png)
![recovery](https://user-images.githubusercontent.com/56078689/150652163-df7f004c-9b5a-46ce-9a08-90f32b5e2d63.png)
![search](https://user-images.githubusercontent.com/56078689/150652167-6f32a830-24ce-457a-9954-320fc7f4ca22.png)
![signup](https://user-images.githubusercontent.com/56078689/150652170-8b496caa-7091-4da4-afec-12466f5eff66.png)
![wallet](https://user-images.githubusercontent.com/56078689/150652172-513d9463-a27d-4cbb-ba35-8216c7791140.png)
![wishlist](https://user-images.githubusercontent.com/56078689/150652173-88c351ed-76d0-4b31-8861-1a44fcab88e3.png)

## Future Plans

- Adding Next Js Framework for Server Side Rendering.
- Adding React Redux for States centeralization and better API Syncronization.
- Adding Theme Provider of mui.
- Full Fledged Admin Panel with Analytics.
- Adding Night Mode.
- Ecorrierz API Integration
- Online Payments (Card / UPI)
- Coupons
- Enhanced Search with Recommendations

> Note : These are not mandatory upcoming changes. More changes can be introduced later.

## Author

**Abhishek Singh**

- [github/Mrhb787](https://github.com/Mrhb787)

## Copyright and License

Copyright (c) 2022, Bookshlf.

Bookshlf source code is licensed under the [MIT License](https://github.com/Bookshlf-in/Website/blob/main/LICENSE).
