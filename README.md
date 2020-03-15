# Profile Generator

This CLI application dynamically generates a PDF file based on the Github username the user gives. The user will be prompted in the command line for their github username as well as their favorite color, which will be used as the background and theme of the PDF file. The PDF file will contain their profile image, their location, github profile, blog, their bio, number of public repositories, number of followers, number of GitHub stars, and number of users following.

## Demo
run 'node index.js' in terminal


![gif](/assets/commandline.gif)

![screenshot](/assets/screenshot.png)

## Technologies Used

* [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML): used for structuring and creating elements on the DOM
* [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS): used to style html elements on the page
* [Node.js](https://developer.mozilla.org/en-US/docs/Web/API/Node): JavaScript runtime, allows users to run JavaScript on the server
* [Inquirer NPM](https://www.npmjs.com/package/inquirer): Command Line Interface for Node.js
* [Electron NPM](https://www.npmjs.com/package/electron): Framework that allows users to write cross-platform desktop applications using JavaScript, HTML, and CSS
* [Electron-html-to NPM](https://www.npmjs.com/package/electron-html-to): Allows users to convert a HTML/CSS/JS page into any format

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
This was the main function that this application ran on. First, the prompt was run, which asked the user for their username and to pick their favorite color. this information was fed into the 'getUserInfo' function, which contains an Github API call to return the information needed. A '.then' (promise) statement is used right after, and the 'getStars' function, which contains another Github API call to grab information about Stars is made using the information the user gave. Another promise is made, in which the information from both API calls are passed into the 'generateHTML' function, which will generate a HTML file with the information from both Github API calls. After this, another promise is made to convert the html file into a PDF. I used the 'electron-html-to' package to do this, and followed their documentation in order to convert the HTML generated into a PDF file. 

## Authors

**Rachel Yeung**
* [Portfolio](https://rachelyeung.herokuapp.com/)
* [Github](https://github.com/xrachhel)
* [LinkedIn](https://www.linkedin.com/in/rachel-yeung-814986159/)
