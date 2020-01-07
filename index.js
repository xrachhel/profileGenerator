const fs = require ("fs")
const inquirer = require("inquirer")
const axios = require("axios")
const util = require("util")
require("dotenv").config()
const convertFactory = require("electron-html-to")

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
  var userInfo =[]; 
  
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
            src="${data.result[9]}"
            alt="">
          <h1 class="photo-headerh1">Hi!</h1>
          <h2 class="photo-headerh2">My Name is ${data.result[0]}</h2>
          <h3>Currently at ${data.result[7]}</h3>
          <div class="links-nav">
            <a href="#" class="nav-link">${data.result[1]}</a>
            <a href="${data.result[2]}" class="nav-link">GitHub</a>
            <a href="${data.result[3]}" class="nav-link">Blog</a>
          </div>
        </div>
    
        <main class="container">
          <h1 class="photo-headerh1">${data.result[8]}</h1>
    
    <div class="container">
        <div class="card col">
          <h2>Public Repositories</h2>
          <h4>${data.result[4]}</h4>
        </div>
        <div class="card col">
            <h2>Followers</h2>
            <h4>${data.result[5]}</h4>
        </div>
        <div class="card col">
            <h2>Github Stars</h2>
            <h4>${data.stars}</h4>
        </div>
        <div class="card col">
            <h2>Following</h2>
            <h4>${data.result[6]}</h4>
        </div>
    
    </div>
         
        </main>
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

const questions = [
  {
    type: "input",
    name: "username",
    message: "What is your Github username?"
  },
  {
    type: "list",
    name: "color",
    message: "What is your favorite color?",
    choices: ["red", "blue", "green", "pink"]
  }
];

function init() {
  inquirer.prompt(questions).then(function({username, color}){
    getUserInfo(username)
    .then(function(result){
      getStars(username).then(function(stars){
        return generateHTML({stars, color, result})
      })
      .then(function(response){
        console.log("Generating your PDF file!")
        var conversion = convertFactory({
          converterPath: convertFactory.converters.PDF
        });
        conversion({html: response}, function(err, result) {
          if (err) {
            return console.error(err);
          }
          result.stream.pipe(fs.createWriteStream('github.pdf'));
          conversion.kill();
        });
      })
    })
  })
}

function getUserInfo(username){
  const info = axios.get(`https://api.github.com/users/${username}`)
  .then(function(response){
    const dataInfo = response.data
    const name = dataInfo.name
    const location = dataInfo.location
    const github = dataInfo.html_url
    const blog = dataInfo.blog
    const repo = dataInfo.public_repos
    const followers = dataInfo.followers
    const following = dataInfo.following
    const company = dataInfo.company 
    const bio = dataInfo.bio
    const pic = dataInfo.avatar_url
    var arr = [name, location, github, blog, repo, followers, following, company, bio, pic]
    userInfo = [...arr]
    return userInfo
  })
  .catch(function(err){console.log("error")})
  return info
}




function getStars(username){
  const stars = axios.get(`https://api.github.com/users/${username}/repos`)
  .then(function(response){
    return response.data.reduce(function(total, curr){
      total += curr.stargazers_count
      return total
    }, 0)
  })
  .catch(function(err){console.log("error")})
  return stars
}
init();

