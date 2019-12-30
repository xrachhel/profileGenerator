const inquirer = require("inquirer")
const fs = require("fs")
const util = require("util")
const fetch = require("node-fetch")
const electron = require("electron")

const writeFileAsync = util.promisify(fs.writeFile)

function promptUser(){
    return inquirer.prompt([
        {
            type: "input",
            name: "username",
            message: "What is your github username?"
        },
        {
            type: "list",
            name: "color",
            message: "What is your favorite color?",
            choices: ['green', 'blue', 'pink', 'red']
        }

    ])
}

const colors = {
    green: {
      wrapperBackground: "#E6E1C3",
      headerBackground: "#C1C72C",
      headerColor: "black",
      photoBorderColor: "#black"
    },
    blue: {
      wrapperBackground: "#5F64D3",
      headerBackground: "#26175A",
      headerColor: "white",
      photoBorderColor: "#73448C"
    },
    pink: {
      wrapperBackground: "#879CDF",
      headerBackground: "#FF8374",
      headerColor: "white",
      photoBorderColor: "#FEE24C"
    },
    red: {
      wrapperBackground: "#DE9967",
      headerBackground: "#870603",
      headerColor: "white",
      photoBorderColor: "white"
    }
  };
  
  function generateHTML(data) {
    return `<!DOCTYPE html>
    <html lang="en">
    
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta http-equiv="X-UA-Compatible" content="ie=edge" />
      <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" />
      <link href="https://fonts.googleapis.com/css?family=BioRhyme|Cabin&display=swap" rel="stylesheet">
      <title>Document</title>
      <div class="wrapper ">
        <div class="photo-header">
          <img class="photo-headerimg"
            src="data:image/jpeg;base64,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"
            alt="">
          <h1 class="photo-headerh1">Hi!</h1>
          <h2 class="photo-headerh2">My Name is rachel</h2>
          <h3>currently at ucb</h3>
          <div class="links-nav">
            <a href="#" class="nav-link">San Francisco</a>
            <a href="#" class="nav-link">GitHub</a>
            <a href="#" class="nav-link">Blog</a>
          </div>
        </div>
    
        <main class="container">
          <h1 class="photo-headerh1">Hello</h1>
    
    <div class="container">
        <div class="card col">
          <h2>Public Repositories</h2>
          <h4>20</h4>
        </div>
        <div class="card col">
            <h2>Followers</h2>
            <h4>0</h4>
        </div>
        <div class="card col">
            <h2>Github Stars</h2>
            <h4>0</h4>
        </div>
        <div class="card col">
            <h2>Following</h2>
            <h4>0</h4>
        </div>
    
    </div>
         
        </main>
        <div class="wrapper"></div>
      </div>
      
    
      <style>
        @page {
          margin: 0;
        }
    
        *,
        *::after,
        *::before {
          box-sizing: border-box;
        }
    
        html,
        body {
          padding: 0;
          margin: 0;
        }
    
        html,
        body,
        .wrapper {
          height: 100%;
        }
    
        .wrapper {
          background-color: ${colors[data.color].wrapperBackground};
          padding-top: 100px;
        }
    
        body {
          background-color: white;
          -webkit-print-color-adjust: exact !important;
          font-family: 'Cabin', sans-serif;
        }
    
        main {
          background-color: #E9EDEE;
          height: auto;
          padding-top: 30px;
        }
    
        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          font-family: 'BioRhyme', serif;
          margin: 0;
        }
    
        h1 {
          font-size: 3em;
        }
    
        h2 {
          font-size: 2.5em;
        }
    
        h3 {
          font-size: 2em;
        }
    
        h4 {
          font-size: 1.5em;
        }
    
        h5 {
          font-size: 1.3em;
        }
    
        h6 {
          font-size: 1.2em;
        }
    
        .photo-header {
          position: relative;
          margin: 0 auto;
          margin-bottom: -50px;
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          background-color: ${colors[data.color].headerBackground};
         color: ${colors[data.color].headerColor};
          padding: 10px;
          width: 95%;
          border-radius: 6px;
        }
    
        .photo-headerimg {
          width: 250px;
          height: 250px;
          border-radius: 50%;
          object-fit: cover;
          margin-top: -75px;
          border: 6px solid ${colors[data.color].photoBorderColor};
          box-shadow: rgba(0, 0, 0, 0.3) 4px 1px 20px 4px;
        }
    
        .photo-headerh1,
        .photo-headerh2 {
          width: 100%;
          text-align: center;
        }
    
        .photo-headerh1 {
          margin-top: 10px;
        }
    
        .links-nav {
          width: 100%;
          text-align: center;
          padding: 20px 0;
          font-size: 1.1em;
        }
    
        .nav-link {
          display: inline-block;
          margin: 5px 10px;
        }
    
        .workExp-date {
          font-style: italic;
          font-size: .7em;
          text-align: right;
          margin-top: 10px;
        }
    
        .container {
          padding: 50px;
          padding-left: 100px;
          padding-right: 100px;
        }
    
        .row {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          margin-top: 20px;
          margin-bottom: 20px;
        }
    
        .card {
          padding: 20px;
          border-radius: 6px;
          background-color: ${colors[data.color].headerBackground};
           color: ${colors[data.color].headerColor};
          margin: 20px;
        }
    
        .col {
          flex: 1;
          text-align: center;
        }
    
        a,
        a:hover {
          text-decoration: none;
          color: inherit;
          font-weight: bold;
        }
    
        @media print {
          body {
            zoom: .75;
          }
        }
      </style>`
          }

promptUser()
.then(function(answer){
    getRepos(answer.username)
    console.log(answer)
    const html = generateHTML(answer)
    return writeFileAsync("index.html", html)

})

async function getRepos(answer){
    const queryUrl = "https://api.github.com/search/users?q=" + answer
    const response = await fetch(queryUrl)
    const result = await response.json()
    console.log(result)
}

// function requestUser (username){

//     const httprequest = new XMLHttpRequest()
//     const url = `https://api.github.com/users/${username}/repos`

//     httprequest.open("GET", url, true)

//     httprequest.onload = function(){
//         const data = JSON.parse(this.response)
//         console.log(data)

//     }
//     httprequest.send()
// }


// const questions = [

  
// ];

// function writeToFile(fileName, data) {
 
// }

// function init() {

// init();
