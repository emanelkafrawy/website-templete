'use strict';

//check if there is a color in local storage 
let mainColors = localStorage.getItem('color_option');

if(mainColors !== null) {
    //not empty
    document.documentElement.style.setProperty('--main-color',mainColors);

    //check for active class  *remove active from all classes*
    document.querySelectorAll('.colors-list li').forEach(element => {

        element.classList.remove('active'); 

           //add active class on element on data-color == local storage 
        if(element.dataset.color === mainColors) {
            //add active class
            element.classList.add('active'); 
        }
     });

}

//background option 
let backgroundoption = true;

//variable to control the enterval 
let backgroundinterval ; 




//check if there is local storage or not 
let backgrounditem = localStorage.getItem('background_option');

//check if random local storage exist or not 
if(backgrounditem !== null ) {

    if(backgrounditem === 'true') {

        backgroundoption = true; 

    } else {

        backgroundoption = false; 
        
    }


    //remove allactive class from span
    document.querySelectorAll('.random-background span').forEach(element => {

        element.classList.remove('active'); 

    });
    
    
    
    //add active class on element 
        if(backgrounditem === 'true') {

            //add active class
            document.querySelector('.random-background .yes').classList.add('active'); 
        } else {

            //add active class
            document.querySelector('.random-background .no').classList.add('active'); 
        }
    
}




//select landing page 
let landingPage = document.querySelector('.landing-page'),
    opened = document.querySelector('.toggle-settings .fa-gear');

opened.onclick = function () {

    this.classList.toggle('fa-spin');

    document.querySelector('.settings-box').classList.toggle('open');

    
};


//switch colors
let colorsw = document.querySelectorAll('.colors-list li');

//loop on all list items
colorsw.forEach(li => {

    //click color list item
   li.addEventListener('click',(e) => {
      
    //console.log(e.target.dataset.color);

    //set color on root
    document.documentElement.style.setProperty('--main-color',e.target.dataset.color);

    //set color on local storage 
    localStorage.setItem('color_option',e.target.dataset.color);

    //remove active class from all children
    handleActive(e);

   });
   
});

 

//switch random background
let randomBackground = document.querySelectorAll('.random-background span');

//loop on all list items
randomBackground.forEach(span => {

    //click color span item
   span.addEventListener('click',(e) => {

    //remove active class from all children
    handleActive(e);
    if(e.target.dataset.background === 'yes') {

        backgroundoption = true ;

        randomizeImg();

         //set color on local storage 
     localStorage.setItem('background_option',true);

    } else {

        backgroundoption = false ;

        clearInterval(backgroundinterval);

             //set color on local storage 
     localStorage.setItem('background_option',false);
    }
   });
   
});



//get array to make background slier
let imageArray = ["one.jpg","two.jpg","three.jpg","four.jpg"];




//function to rundomize
function randomizeImg () {
     
    if(backgroundoption === true ) {

        backgroundinterval = setInterval(() => {

            //get random number
           let randomNumber = Math.floor(Math.random() * imageArray.length);
           
           //changing background url
           landingPage.style.backgroundImage = 'url("imgs/' + imageArray[randomNumber] + '")';
       
       }, 3000);
       
    } 
}

randomizeImg();


/*************************************** SKILLS */
//select Skills selector 
let ourSkills = document.querySelector(".skills");

window.onscroll = function () {
   
    //skills offset top
    let skillsOffsetTop =ourSkills.offsetTop;
   
    //outer height
    let skillsOuterHeight = ourSkills.offsetHeight; //height including border and all the css design

    //window height
    let windowHeight = this.innerHeight;

    //window scroll top
    let windowScrollTop = this.pageYOffset;

    if(windowScrollTop > ( skillsOffsetTop + skillsOuterHeight - windowHeight )) {  
        //يعني وصل للجزء الي هوا عاوزه بتاع الاسكلز ف الاخر

        let AllSkills = document.querySelectorAll(".skill-box .skill-progress span");

        AllSkills.forEach(Skill => {

           Skill.style.width = Skill.dataset.prog ;
        
        });
      
    }

};


//create pop up with the image

let ourgallary = document.querySelectorAll(".gallary img");

ourgallary.forEach(img => {
    
    img.addEventListener('click',(e) => {

        //create over-lay element 
        let overlay = document.createElement('div');
        
        //add class to over lay
        overlay.className = 'popup-overlay';

        //append overlay to the body 
        document.body.appendChild(overlay);

        //create pop up
        let popupbox = document.createElement('div');

        //add class to the pop up box
        popupbox.className = 'popubbox';

        if(img.alt !== null) {

            //create heading 
            let imgheading = document.createElement('h3');
    
            //create text for heading 
            let imgText = document.createTextNode(img.alt);
    
            //append the text to the heading 
            imgheading.appendChild(imgText);
    
            //append the heading to the popup 
            popupbox.appendChild(imgheading);
    
          }

    
        //create the image 
        let popupImage = document.createElement('img');

      //set image source 
      popupImage.src = img.src

      //add image to pop up
      popupbox.appendChild(popupImage);

      //append pop up to body 
      document.body.appendChild(popupbox);


        //create the close span
        let closeSpan =document.createElement("span");

        //create the close text 
        let closebutton = document.createTextNode("x");

        //append text to close button 
        closeSpan.appendChild(closebutton);

        //add class to close button 
        closeSpan.className = 'closeButton';

        //add close button to the popup box
        popupbox.appendChild(closeSpan);

    });

});


//close popup 

document.addEventListener('click', function (e) {

    if(e.target.className == 'closeButton') {

        //remove the current popup 

        e.target.parentNode.remove();

        //remove overlay
        document.querySelector('.popup-overlay').remove();
    }
});

//select all bullets

const allbullet =  document.querySelectorAll(".nav-bullets .bullet");
//console.log(allbullet);


//select all links

const allnav =  document.querySelectorAll(".links a");


function someWhere(elements ) {
    elements.forEach(element => {
        element.addEventListener("click", (e) => {
            e.preventDefault();
            //web api
            document.querySelector(e.target.dataset.section).scrollIntoView({
                behavior : 'smooth'
            })
        });
    });
    
}
someWhere(allbullet);
someWhere(allnav);

//function handle active state 
function handleActive(ev) {

    ev.target.parentElement.querySelectorAll('.active').forEach(element => {

        element.classList.remove('active'); 
 
     });  
     //add active class on the element which i click on it 
     ev.target.classList.add('active'); 


}


//bullets show or display
let bulletsspan = document.querySelectorAll('.bullets-options span'),
    bulletsContainer = document.querySelector(".nav-bullets"),
    bulletLocalStorage = localStorage.getItem("bullets_option");

if(bulletLocalStorage !== null) {
  
    bulletsspan.forEach(span=>{

        span.classList.remove("active");
        });

     if(bulletLocalStorage === 'block') {
         
        bulletsContainer.style.display = 'block';

        document.querySelector(".bullets-options .yes").classList.add("active");

     } else {

        bulletsContainer.style.display = 'none';
        document.querySelector(".bullets-options .no").classList.add("active");
     }
}



bulletsspan.forEach(span => {
    span.addEventListener('click',(e) => {

        if(span.dataset.display === 'show' ) {

            bulletsContainer.style.display = 'block';
            localStorage.setItem("bullets_option", 'block');
        }else {

        bulletsContainer.style.display = 'none';
        localStorage.setItem("bullets_option", 'none');

        }

        handleActive(e);
    });

});

//reset options
document.querySelector(".reset-options").onclick = function () {

    //localStorage.clear();
    //OR u can do this 
    localStorage.removeItem("color_option");
    localStorage.removeItem("background_option");
    localStorage.removeItem("bullets_option");

    //reload window 
    window.location.reload();

};

//toggle menue 
let toggleButton = document.querySelector(".toggle-menu"),
    tlinks = document.querySelector(".links");

toggleButton.onclick = function (e) {

    //stop propagation
    e.stopPropagation();//يعني لو دوست ع البوتن نفسه او الاسبان الاتنين هيبقي واحد
    this.classList.toggle("menu-active"); //the arrow
    tlinks.classList.toggle("open"); //the list

};    

//كلمه تارجت دي بتدجيبلي الاليمنت ديف او ايا كان كامل بالكلاس وبكل حاجه فيه
//click anywhere outside the menu to close the toggle
document.addEventListener("click",(e) => {

    if(e.target !== toggleButton && e.target !== tlinks) {

        // console.log("this is not span");
        //check if menu is open
        if(tlinks.classList.contains("open")) {

            toggleButton.classList.toggle("menu-active"); //the arrow
            tlinks.classList.toggle("open"); //the list

        }
    }
});

//stop propagation on the menu li
tlinks.onclick = function(e ) {
    e.stopPropagation();
}



