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
```html
var time = ["9", "10", "11", "12", "13", "14", "15", "16", "17"]
    
function currentTime(){
    var current = moment().format("H")
    for (var i = 0; i < time.length; i++){
    if(parseInt(time[i]) > current){
        $("#" + time[i]).attr("style", "background-color: green")
    }
    else if(parseInt(time[i]) == current){
        $("#" + time[i]).attr("style", "background-color: red")
    }
    else if(parseInt(time[i]) < current){
        $("#" + time[i]).attr("style", "background-color: grey")
    }
    }
}
currentTime()
```
This was the function i used to set the color of the input boxes based on the time of day. I created an array of the 'hour' in military time, which were the ids i had set for each individual input box in my HTML code. I created the function currentTime(), which would control the background colors of the input boxes. I set a variable 'current' as the current time and set it equal to the current time in military time in hours (this was done using moment.js). I then created a for loop that would iterate through the array i created earlier. I then created 3 conditional statements, comparing the 'time' in my array with the current hour. Since my array consisted of strings, i had to parseInt() them to make sure that they were interpreted as integers. Inside my conditional statement, i grabbed the input box using the Id, and attributed a background color based on whichever condition it met. 

## Authors

Rachel Yeung 

- [Link to Portfolio Site](https://xrachhel.github.io/interactivePortfolio/)
- [Link to Github](https://github.com/xrachhel/dayPlanner)
- [Link to LinkedIn](https://www.linkedin.com/)
