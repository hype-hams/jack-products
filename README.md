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
 ┃ ┃ ┃ ┣ 📂reviews //feel free to add more files
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
  
  
