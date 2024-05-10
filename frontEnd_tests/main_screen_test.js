const {Builder,By} = require ("selenium-webdriver");
const assert = require("assert");

async function main_to_host_test(){
   try {
//           console.log("beginning to intialize");
           let driver = await new Builder().forBrowser("firefox").build();
//           console.log("WebDriver initialized successfully.");

           await driver.get("http://localhost:8000/UI/main_screen.html");
 //          console.log("Navigated to the specified URL.");
	
	   let button1 = await driver.findElement(By.id("hostGameBtn"));
	   button1.click().then(function() {
        return driver.getCurrentUrl();
	    })
	    .then(function(currentUrl) {
		  assert(currentUrl.includes('host_game.html'));
		  console.log("main to host passed");
		  driver.close();
	    });

    } catch (error) {
        console.error("An error occurred:", error);
    }
}


async function main_to_join_test(){
   try {
  //         console.log("beginning to intialize");
           let driver = await new Builder().forBrowser("firefox").build();
   //        console.log("WebDriver initialized successfully.");

           await driver.get("http://localhost:8000/UI/main_screen.html");
    //       console.log("Navigated to the specified URL.");
	
	   let button1 = await driver.findElement(By.id("joinGameBtn"));
	   button1.click().then(function() {
        return driver.getCurrentUrl();
	    })
	    .then(function(currentUrl) {
		  assert(currentUrl.includes('join_game.html'));
		  console.log("main to join passed");
		  driver.close();
	    });

    } catch (error) {
        console.error("An error occurred:", error);
    }
}
main_to_host_test()
main_to_join_test()
