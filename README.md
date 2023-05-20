

# FEC Atelier

FEC Atelier is a full-stack web application built to replicate the experience of a physical atelier. It is a place for people to browse and purchase custom-made products.

## Table of Contents
1. [Description](#description)
2. [Technologies Used](#technologies-used)
3. [Installation and Running](#installation-and-running)
4. [Sample .env file](#sample-env-file)
5. [Authors and Contributors](#authors-and-contributors)
6. [Wins and Improvements](#wins-and-improvements)
7. [Tips for a Better Readme](#tips-for-a-better-readme)

## Description

FEC Atelier is a full-stack web application developed to replicate the experience of a physical atelier, where people can browse and purchase custom-made products. It was built using React, Amazon AWS, Express.js, Jest, Node.js, MySQL, and Sequelize.

The application allows users to view products, create accounts, add items to their carts, and purchase items. It also enables admins to create new products, remove existing products, and manage orders.

## Technologies Used
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Amazon_AWS](https://img.shields.io/badge/Amazon_AWS-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![Jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![Sequelize](https://img.shields.io/badge/Sequelize-4479A1?style=for-the-badge&logo=sequelize&logoColor=white)

## Installation and Running

To get the project running, first clone the repository:

```
git clone https://github.com/username/PLUMBERSFEC.git
```

Then install the dependencies:

```
npm install
```

Finally, run the project:

```
npm run start
```

## Sample .env file

This project requires a .env file in order to connect to the database. The file should include the following information:

```
DB_HOST=
DB_USER=
DB_PASS=
DB_NAME=
PORT=
API_KEY=
```

## Authors and Contributors

The authors and contributors of this project are:

- [Sara Li](https://github.com/johndoe)
- [Eric Lee](https://github.com/Chugale)
- [Dillon Migdol](https://github.com/janedoe)
- [Cesar Guajardo](https://github.com/janedoe)

## Wins and Improvements

The project was successful in replicating the experience of a physical atelier with a web application. The application allows users to browse and purchase products, while also enabling admins to create, remove, and manage orders.

The project could be improved upon in terms of user experience and scalability. The user experience could be improved by adding more features, such as a wishlist and product reviews. Additionally, the application could be made more scalable by refactoring the code and adding more caching.


# PLUMBERSFEC
HackReactor FEC


## To make new branch:
  ### Step 1: Clone the master repo(if you haven't already, if you have then skip to step 2)
  ```
   > git clone <url of master repo>
  ```
  ### Step 2: Create new Branch
  ```
   > git branch <name of new branch>
  ```
  ### Step 3: Go to new Branch
  ```
   > git checkout <name of new branch>
  ```
  ### Step 4: Make sure you are in new branch
  ```
   > git branch
  ```
   You should see something like this:
   ```
   > git branch
      master
      *<name of new branch>
   ```
  ### Step 5: Rebasing and merging into branches
  Stash work before doing so
  ```
  > git stash
  ```
  Move to branch
  ```
  > git checkout main (whater your main branch in called)
  ```
  Pull down from GH
  ```
  > git pull origin main
  ```
  Move to branch and merge
  ```
  > git checkout 'BRANCH_NAME'

  > git merge main
  ```
  Now head to VSCode to resolve conflict issues for rebase

  After rebase merge is complete, reload in stashed items
  ```
  > git stash list (to view what will be added back in)
  > git stash pop (to add back to branch)
  ```




## DEPENDENCIES

  ### Webpack, Webpack CLI
  ### Nodemon
  ### eslint using HR linter config
  ### ReactJS, Modal
  ### Redux
  ### ExpressJS
  ### MongoDB

## File Structure
```
📦PLUMBERSFEC
 ┣ 📂client
 ┃ ┣ 📂dist
 ┃ ┃ ┣ 📂css
 ┃ ┃ ┃ ┗ 📜styles.css
 ┃ ┃ ┣ 📜bundle.js //will generate automatically when webpack is configured
 ┃ ┃ ┣ 📜bundle.js.map //will generate automatically when webpack is configured
 ┃ ┃ ┗ 📜index.html
 ┃ ┗ 📂src
 ┃ ┃ ┣ 📂components
 ┃ ┃ ┃ ┣ 📂product_detail //feel free to add more files
 ┃ ┃ ┃ ┃ ┗ 📜product_detail_main.jsx
 ┃ ┃ ┃ ┣ 📂questions_and_answers //feel free to add more files
 ┃ ┃ ┃ ┃ ┗ 📜questions_main.jsx
 ┃ ┃ ┃ ┣ 📂related_items //feel free to add more files
 ┃ ┃ ┃ ┃ ┗ 📜related_items_main.jsx
 ┃ ┃ ┃ ┣ 📂reviews   //feel free to add more files
 ┃ ┃ ┃ ┃ ┗ 📜reviews_main.jsx
 ┃ ┃ ┃ ┗ 📜App.jsx
 ┃ ┃ ┗ 📜index.jsx
 ┣ 📂server
 ┃ ┣ 📂src //empty for now
 ┃ ┗ 📜index.js
 ┣ 📜.babelrc
 ┣ 📜.gitignore
 ┣ 📜README.md
 ┣ 📜config.js //in .gitignore, do not push to repo
 ┣ 📜.env //in .gitignore, do not push to repo
 ┣ 📜package-lock.json
 ┣ 📜package.json
 ┗ 📜webpack.config.js
```


