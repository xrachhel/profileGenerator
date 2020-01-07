# Profile Generator

For this homework, we had to create a command-line application that dynamically generates a PDF file based on the Github username the user gives. The user will be prompted in the command line for their github username as well as their favorite color, which will be used as the background and theme of the PDF file. The PDF file will contain their profile image, their location, github profile, blog, their bio, number of public repositories, number of followers, number of GitHub stars, and number of users following
## Screenshot 
![gif](/assets/commandline.gif)
![screenshot](/assets/screenshot.png)

## Built With

* [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML): used for structuring and creating elements on the DOM
* [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS): used to style html elements on the page
* [Node.js](https://developer.mozilla.org/en-US/docs/Web/API/Node): Javascript runtime, allows users to run Javascript on the server
* [Inquirer NPM](https://www.npmjs.com/package/inquirer)
* [Electron NPM](https://www.npmjs.com/package/electron) 
* [Electron-html-to NPM](https://www.npmjs.com/package/electron-html-to)


## Deployed Link

* [See Live Site](https://xrachhel.github.io/profileGenerator/)



## Code snippet 
```function init() {
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
```
This was the main function that this application ran on. First, the prompt was run, which asked the user for their username and to pick their favorite color. 

## Authors

Rachel Yeung 

- [Link to Portfolio Site](https://xrachhel.github.io/interactivePortfolio/)
- [Link to Github](https://github.com/xrachhel/dayPlanner)
- [Link to LinkedIn](https://www.linkedin.com/)
