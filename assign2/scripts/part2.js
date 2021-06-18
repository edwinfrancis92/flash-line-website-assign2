/**
 * Author: Edwin Cheah 100636913
 * Target: enquire.html, payment.html
 * Purpose: Assignment 1 part 2 and Validation JS for payment and enquire pages
 * Created: 29 April 2020
 * Last updated: 3 May 2020 - 2001hrs
 * Credits: None.
 */

"use strict";


/* Enquire Page Validation */
function validateEnquire(){

   var errMsg = "" //error message default variable
   var result = true; // Deafult result

   /*Enquire Page Variables*/
      /*Name*/
      var firstName = document.getElementById("first-name").value; //First Name Variable
      var lastName = document.getElementById("Last-Name").value; //Last Name Variable

      /*Address*/
      var customerEmail = document.getElementById("customer-email").value; //Customer E-mail Variable
      var address = document.getElementById("Street-Address").value; //Street Address Variable
      var suburb = document.getElementById("Suburb/Town").value; //Suburb Variable
      var state = document.getElementById("State").value; //State Variable
      var postalCode = document.getElementById("postal-code").value; //Postal Code Variable

      /*Contact Details*/
      var phoneNumber = document.getElementById("Phone-Number").value; //Phone Number
      var prefContact = getPrefContact();

      /*Ticket Booking Details*/
      var passengerQuant = document.getElementById("Passenger-Quanity").value; //No. of Tickets
      var destiSelection = document.getElementById("destination_selection2").value; //Selected Destination
      var seatClass = document.getElementById("seat_class_selection").value; //Seat Class Selection
      
      /*Meal Selection*/
      var mealQuant = document.getElementById("Meals-Quanity").value; //Quantity of Meal Orders
      var mealCombo = document.getElementById("meal-combo").value; // Meal Selection
      var sideSelection = document.getElementById("side-selection").value; //Side Selection - ADD ENHANCEMENT, change on the fly based off meal combo
      var drinkSelection = document.getElementById("drink-selection").value; //Drinks Selection - ADD ENHANCEMENT, change on the fly based off meal combo

      /* Dietry Check boxes*/ //need to ensure NO is not checked when others are checked
      var noDietry = document.getElementById("NO").checked; //No Dietry Restrictions
      var glutenFree = document.getElementById("GF").checked; //Gluten Free Checkbox
      var soyFree = document.getElementById("Soy").checked; //Soy Free Checkbox
      var dairyFree = document.getElementById("Dairy").checked; //Dairy Free Checkbox

      /*Textbox Questions Variables*/
      var textQuestions = document.getElementById("textareaabout").value; //Text Area for comments and question

      /*Travel Date Variables*/
      var currentDate = new Date (); //Creates new date
      var date = currentDate.toISOString().slice(0,10); //Converts date to ISO Format and remove time stamp
      var dateSelected = document.getElementById("date_selection").value; // User Selected Date
      
      
   /*Enquire Page Functions and Validations*/
      /*Date Validation Code*/
      if (dateSelected < date){
         errMsg+= "Invalid Date, Please select a date from today onwards!\n";
         result = false;
      }

      /*State-Postal Code Validation - Calls State/Postcode Validation Function, if false returns message*/
      var stateValiMsg = stateVali(state, postalCode); //State/Postal Code Function Call
      if (stateValiMsg != ""){
         errMsg += stateValiMsg;
         result = false;
      }

      /*Error Message Code*/
      if(errMsg != ""){
         alert (errMsg);
      }

      /*Calls Enquire Page Session Storage Function to store form*/
      else {
         storeEnquireForm(firstName, lastName, customerEmail, address, suburb, state, postalCode, phoneNumber, prefContact, passengerQuant, destiSelection, seatClass, mealQuant, mealCombo, sideSelection, drinkSelection, noDietry, glutenFree, soyFree, dairyFree, dateSelected, textQuestions)

         }

   return result;
}


/*Payment Page Validation function*/
function validatePayment(){
   var errMsg ="";
   var result = true;

   /*Payment Page Variables*/
      /*Card Details*/
      var cardType = document.getElementById("Card-Type"); //Card Type
      var nameOnCard = document.getElementById("Name-on-Card"); //Name on Card
      var cvv = document.getElementById("CVV").value; //CVV Code
      var cardNumber = document.getElementById("Card-Number"); //Card Number
      var cardExpiry = document.getElementById("Card-Expiry").value; // Card Expiry

      /*Current Date Variable assignments*/
      var d = new Date();
      var yy = d.toISOString().slice(2,4); // Get Last 2 digits of current year from ISO Date String
      var mm = d.toISOString().slice(5,7); // Get digit of current month from ISO Date String
      var afterMM = (parseInt(mm) + 1).toString(); // +1 to current month
      afterMM = (0 + afterMM).slice(-2); // Add a 0 infront of afterMM variable and slice -2 to get a 0 infront of single month and no 0 infront of months with 2 numbers (eg. Jan = 01 instead of 1, Dec = 12 instead of 012)
      var afterCurrentDate = (afterMM + "-" + yy); //Assigns the next month of the current year to variable
      var creditMM = cardExpiry.slice(0,2); // Get month from user input credit card date
      var creditYY = cardExpiry.slice(3,5); // Get 2 digit year from user input credit card date
   
   /*Payment Page Functions and Validations*/
      /*Card Type and Number Validation Function Call*/
      var cardTypeVali = cardTypeValidate(cardType, cardNumber)
      if (cardTypeVali != ""){
         errMsg += cardTypeVali;
         result = false
      }
      /*Card Date Validation Code*/
      if (creditYY < yy || (creditYY == yy && creditMM <= mm)){
         errMsg += "Credit Card expiry date not valid, enter date in MM-YY format from \"" + afterCurrentDate+ "\" onwards.\n"; 
         result = false;
      }

      /*Card CVV Validation Function Call*/
      var cardCvvVali = cardCvvValidate(cardType, cvv)
      if (cardCvvVali != ""){
         errMsg += cardCvvVali;
         result = false
      }
   

   if(errMsg != ""){
      alert (errMsg);
   }




return result;

}

/*Store Enequire Form to Session Storage*/
function storeEnquireForm(firstName, lastName, customerEmail, address, suburb, state, postalCode, phoneNumber, prefContact, passengerQuant, destiSelection, seatClass, mealQuant, mealCombo, sideSelection, drinkSelection, noDietry, glutenFree, soyFree, dairyFree, dateSelected, textQuestions){
   if (typeof(Storage) !== "undefined") { //Check if Storage function can be used

      /*Session storage events*/
         /*Name - First and Last*/
         sessionStorage.setItem("firstName", firstName);
         sessionStorage.setItem("lastName", lastName);

         /*Contact Details*/
         sessionStorage.setItem("customerEmail", customerEmail);
         sessionStorage.setItem("phoneNumber", phoneNumber);
         sessionStorage.setItem("prefContact", prefContact); //preffered contact medium

         /*Address*/
         sessionStorage.setItem("address", address);
         sessionStorage.setItem("suburb", suburb);
         sessionStorage.setItem("state", state);
         sessionStorage.setItem("postalCode", postalCode);

         /*Booking Details*/
         sessionStorage.setItem("passengerQuant", passengerQuant); // No. of Tickets/Passengers
         sessionStorage.setItem("destiSelection", destiSelection); // Detination
         sessionStorage.setItem("seatClass", seatClass); // Seat Class Selection
         sessionStorage.setItem("dateSelected", dateSelected); // Selected travel date

         /*Meal Bookings*/
         sessionStorage.setItem("mealQuant", mealQuant); // QUanity of Meal Orders
         sessionStorage.setItem("mealCombo", mealCombo); // Selected Meal Combos
         sessionStorage.setItem("sideSelection", sideSelection); // Selected Sides
         sessionStorage.setItem("drinkSelection", drinkSelection); //Seleced Drink
        
         /* Dietry Needs Checkbox */
         sessionStorage.setItem("noDietry", noDietry); // No Detry Requirements
         sessionStorage.setItem("glutenFree", glutenFree);
         sessionStorage.setItem("soyFree", soyFree);
         sessionStorage.setItem("dairyFree", dairyFree);
         
         /*Text Area - Comments and Questions from Customers */
         sessionStorage.setItem("questions", textQuestions); // Textbox
    }
    
    else {
      alert ("Storage Failed")// If browser doesn't support storage, diplay alerts
    }

}

/* Retrive Stored Data from Session Storage */
function getPaymentForm(){

   if (typeof(Storage) !== "undefined") { //Check if Storage function can be used
      /* Session Storage Retrival if firstName is not empty */
      if (sessionStorage.getItem("firstName")!==null){

         /*Dietry Requirements - Functon - Calls a function that prints out dietry requirements to readonly and hidden fields*/
            getDietryReqs()

         /*Displays on website as readonly */
            /*Name - First and Last*/
            document.getElementById("confirm_first_name").innerHTML = sessionStorage.getItem("firstName");
            document.getElementById("confirm_last_name").innerHTML = sessionStorage.getItem("lastName");

            /*Contact Details*/
            document.getElementById("confirm_Email").innerHTML = sessionStorage.getItem("customerEmail");
            document.getElementById("confirm_Phone_Number").innerHTML = sessionStorage.getItem("phoneNumber"); 
            document.getElementById("confirm_Pref_Contact").innerHTML = sessionStorage.getItem("prefContact"); //preffered contact medium
            
            /*Address*/
            document.getElementById("confirm_Street_Add").innerHTML = sessionStorage.getItem("address");
            document.getElementById("confirm_Suburb/Town").innerHTML = sessionStorage.getItem("suburb");
            document.getElementById("confirm_State").innerHTML = sessionStorage.getItem("state");
            document.getElementById("confirm_Postal").innerHTML = sessionStorage.getItem("postalCode"); 

            /* Get Ticketbooking summary and calculate it's cost */
            var ticketCost = printTicketSummary();

            /*Meal Bookings - Fucntion - Calls a function that displays a summary of the meal order*/
            var totalMealCost = printMealsSummary(); //
            
            /* get Text Area input function, and displays it if there is content */
            var question = getTextBox()

            /*Calculates and diplays final cost of booking*/
            var totalCost = ticketCost + totalMealCost;
            document.getElementById("total_cost").innerText = "$" + totalCost;
            

         /* Print to hiddnen fields - NOTE: checkboxes are in fucntion called earlier*/
            /*Name*/
            document.getElementById("first-name").value = sessionStorage.getItem("firstName");
            document.getElementById("Last-Name").value = sessionStorage.getItem("lastName");

            /*Contact Details*/
            document.getElementById("customer-email").value = sessionStorage.getItem("customerEmail");
            document.getElementById("Phone-Number").value = sessionStorage.getItem("phoneNumber"); 
            document.getElementById("Preferred-Contact").value = sessionStorage.getItem("prefContact");

            /*Address*/
            document.getElementById("Street-Address").value = sessionStorage.getItem("address");
            document.getElementById("Suburb/Town").value = sessionStorage.getItem("suburb");
            document.getElementById("State").value = sessionStorage.getItem("state");
            document.getElementById("postal-code").value = sessionStorage.getItem("postalCode"); 

            /*Ticket booking details to hidden text inputs*/
            document.getElementById("Passenger-Quanity").value = sessionStorage.getItem("passengerQuant");
            document.getElementById("destination_selection2").value = sessionStorage.getItem("destiSelection");
            document.getElementById("seat_class_selection").value = sessionStorage.getItem("seatClass");
            document.getElementById("date_selection").value = sessionStorage.getItem("dateSelected");
            
            /*Meal Orders to hidden text inputs */
            document.getElementById("Meals-Quanity").value = sessionStorage.getItem("mealQuant"); //Meal order Quanity
            document.getElementById("meal-combo").value = sessionStorage.getItem("mealCombo"); // Meal Combo selection
            document.getElementById("side-selection").value = sessionStorage.getItem("sideSelection");
            document.getElementById("drink-selection").value = sessionStorage.getItem("drinkSelection");
            
            /* get Text area value and puts into a hidden textbox there is content */
            document.getElementById("textareaabout").value = sessionStorage.getItem("questions");

            /* Prints out total cost to hidden total field*/
            document.getElementById("total_cost_summary").value = "$" + totalCost;

      }
   }
   else {
      alert ("Storage Failed\n")// If browser doesn't support storage, diplay alerts
    }
}

/*Gets prefered contact from Contact-Container array*/
function getPrefContact(){
   var contactMethod ="Not Chosen - Deafult to Email";
   var contactArray = document.getElementById("Contact-Container").getElementsByTagName("input");
   for(var i = 0; i <contactArray.length; i++){
      if(contactArray[i].checked)
         contactMethod = contactArray[i].value
   }
return contactMethod;

}

/* Displays a summary of ticket options selected and the final price on payment page */
function printTicketSummary(){
   /* variable assignments */
      var passengerQuant =  sessionStorage.getItem("passengerQuant");
      var seatClass = sessionStorage.getItem("seatClass");
      var destiSelection = sessionStorage.getItem("destiSelection");
      var travelDate = sessionStorage.getItem("dateSelected");
      var ticketCost = 0;
      var destinationCost = 0;
      var seatCost =0;

   /* Displays number of tickets chosen per class and to destination */
      document.getElementById("confirm_Tickets").innerHTML = passengerQuant + " x " + seatClass + " tickets to " + destiSelection;

   /* Displays Travel Date */
      document.getElementById("confirm_Travel_Date").innerHTML = travelDate;

   /*Boolean Calculation of ticket cost - it sees what ticket and destination is selected and calculates cost*/
      if (passengerQuant != null ){
         if (seatClass == "Economy"){
            seatCost = 0
         }
         if (seatClass == "Business"){
            seatCost = 40
         }
         if (seatClass == "Oliver Queen Special"){
            seatCost = 60
         }
         if (destiSelection == "National City"){
            destinationCost = 60
         }
         if (destiSelection == "Star City"){
            destinationCost = 25
         }
         if (destiSelection == "Gotham City"){
            destinationCost = 20
         }
         if (destiSelection == "Keystone City"){
            destinationCost = 40
         }
         if (destiSelection == "Smallville"){
            destinationCost = 50
         }
         ticketCost = passengerQuant*(seatCost+destinationCost); // Total Cost of Ticket
      }
   
   /* Displays Ticket Purchase Summary on payment page table */
      document.getElementById("desti_Select").innerText = destiSelection + " - $" + destinationCost + " per passenger"; // Shows selected destination and the cost to travel there per passenger
      document.getElementById("seat_Select").innerText = seatClass + " - $" + seatCost + " per passenger"; // Shows selected seat class it's price per passenger
      document.getElementById("ticket_Quant").innerText = "Totat Tickets - " + passengerQuant; // Calculates total tickets booked
      document.getElementById("ticket_Cost").innerText = "$" + ticketCost; // Calculates total cost of tickets to be purchased

   return ticketCost //Returns full ticket cost price to getPaymentForm function to be used.
}

/* Displays Meal orders and price summary readonly on payment page*/
function printMealsSummary(){
   /*Meal Variables*/
      var mealQuant = sessionStorage.getItem("mealQuant"); // Number of Meals ordered
      var mealCombo = sessionStorage.getItem("mealCombo"); // Meal Combo Selected
      var sideSelection = sessionStorage.getItem("sideSelection"); // Side Selection
      var drinkSelection = sessionStorage.getItem("drinkSelection"); // Drink Selection
      var mealCost = 0;
      var totalMealCost = 0;

   /* Calculate Meal Cost based on combo selection*/
      if (mealQuant != ""){

         if (mealCombo == "Big Belly Flash Burger Combo"){
            mealCost = 18;
         }
         if (mealCombo == "Green Arrow Seabass Combo"){
            mealCost = 25;
         }
         if (mealCombo == "Krypton Beef Steak Combo"){
            mealCost = 30;
         }
         if (mealCombo == "Supergirl's Vegetarian Combo"){
            mealCost = 25;
         }
         if (mealCombo == "Supergirl's Vegetarian Combo"){
            mealCost = 25;
         }
         totalMealCost = mealCost*mealQuant; // Calculates Total Cost of a Meal

      }
   
   /* Prints out meal order details */
      document.getElementById("confirm_Meal_Summary").innerHTML = mealQuant + " x " + mealCombo; //Outputs number of meals order mades and the selection (4x Green Arrow Seabass Combo)
      document.getElementById("meal_Combo").innerHTML = mealCombo + " - $" + mealCost + " per passenger"; //Shows price of each combo per person
      document.getElementById("confirm_Sides").innerHTML = sideSelection; // Shows confimed sides selection
      document.getElementById("confirm_Drinks").innerHTML = drinkSelection; //Shows cofirmed drink selection
      document.getElementById("total_Meal_Cost").innerHTML = "$" + totalMealCost; // Shows total meal cost
      document.getElementById("total_meal_orders").innerHTML = "Total Orders - " + mealQuant; //Shows total orders made

   return totalMealCost //returns value of the total meal to getPaymentForm Function
}

/* Displays dietry requirements readonly on payment page and checks hidden checkboxes if true*/
function getDietryReqs(){
   /* Dietry Variable Assignments */
   var noDietry = sessionStorage.getItem("noDietry"); // No dietry option
   var glutenFree = sessionStorage.getItem("glutenFree");
   var soyFree = sessionStorage.getItem("soyFree");
   var dairyFree = sessionStorage.getItem("dairyFree");
   
   /*Checks if checkbox is true and checks hidden checkboxes if true*/
   document.getElementById("NO").checked = (noDietry=="true");
   document.getElementById("GF").checked = (glutenFree=="true");
   document.getElementById("Soy").checked = (soyFree=="true")
   document.getElementById("Dairy").checked = (dairyFree=="true")
   
   /*If true, print list of dietry requirements to booking meal order summary*/
   var dietryReqs = "";
   if (noDietry=="true"){
      dietryReqs += "<li>None</li>";
   }
   if (soyFree=="true"){
      dietryReqs += "<li>Soy Free</li>";
   }
   if (glutenFree=="true"){
      dietryReqs += "<li>Gluten Free</li>";
   }
   if (dairyFree=="true"){
      dietryReqs += "<li>Dairy Free</li>";
   }
   document.getElementById("confirm_Dietry").innerHTML = dietryReqs;
}

/* Displays text area comments and questions readonly on payment page */
function getTextBox(){
   /* Text area variable assignments */
      var quest = ""
      var questionsInput = sessionStorage.getItem("questions");

   /* Validate if text box containts any input and displays none if there is none */
      if (questionsInput != ""){
         quest = questionsInput
      }
      else{
         quest = "None."
      }

   /*Print out text area values tp read only*/
   document.getElementById("confirm_Questions").innerHTML = quest;
}

/* Validates Credit Card Numbers against selected card type on payment page*/
function cardTypeValidate(cardType, cardNumber){
   var cardTypeErr = ""
   if(cardType.value == "Mastercard" && !cardNumber.value.match(/^[5][0-5]\d{14}$/)){
      cardTypeErr += "Not a valid Mastercard. Mastercards start with 51-55 and have 16-digits.\n"
   }
   else if(cardType.value == "Visa" && !cardNumber.value.match(/^[4]\d{15}$/)){
         cardTypeErr+= "Not a valid Visa Card. Visa Cards start with 4 and have 16-digits.\n"
   }
   else if(cardType.value == "American-Express" && !cardNumber.value.match(/^[3][4-7]\d{13}$/)){
         cardTypeErr += "Not a valid American Express Card. American Express Cards start with 34-37 and have 15-digits.\n"
   }
   return cardTypeErr;
}

/*Validates Credit Card CVV against selected card type on payment page */
function cardCvvValidate(cardType, cvv){
   var cvvErr = ""
   if ((cardType.value == "Mastercard" || cardType.value == "Visa") && cvv.length != "3"){
         cvvErr += cardType.value + " CVV only has 3 numbers.\n"
   }

   if (cardType.value == "American-Express" && cvv.length != "4"){
         cvvErr += cardType.value + " CVV only has 4 numbers.\n"
   }
   return cvvErr
}


/* State-Postal Code Verification on Enquire Page*/
function stateVali(state, postalCode){

   var stateValiMsg = "" //Empty State Validation Method

   /*IF statements dynamically validating state number with postal code selection */
   if(state == "VIC"){
      if (!postalCode.match(/^(3\d\d\d)$|^(8\d\d\d)$/))
         stateValiMsg = "Please put a vaild VIC postal code. - 3XXX or 8XXX\n";
   }

   if(state == "NSW"){
      if (!postalCode.match(/^(1\d\d\d)$|^(2\d\d\d)$/))
      stateValiMsg = "Please put a vaild NSW postal code. - 1XXX or 2XXX\n";
   }

   if(state == "QLD"){
      if (!postalCode.match(/^(4\d\d\d)$|^(9\d\d\d)$$/))
      stateValiMsg = "Please put a vaild QLD postal code. - 4XXX or 9XXX\n";
   }

   if(state == "NT"){
      if (!postalCode.match(/^0\d\d\d$/))
      stateValiMsg = "Please put a vaild NT postal code. - 0XXX\n";
   }

   if(state == "WA"){
      if (!postalCode.match(/^6\d\d\d$/))
      stateValiMsg = "Please put a vaild WA postal code.- 6XXX\n";
   }

   if(state == "SA"){
      if (!postalCode.match(/^5\d\d\d$/))
      stateValiMsg = "Please put a vaild SA postal code. - 5XXX\n";
   }

   if(state == "TAS"){
      if (!postalCode.match(/^7\d\d\d$/))
      stateValiMsg = "Please put a vaild TAS postal code. - 7XXX\n";
   }

   if(state == "ACT"){
      if (!postalCode.match(/^0\d\d\d$/))
      stateValiMsg = "Please put a vaild ACT postal code. - 0XXX\n";
   }

   return stateValiMsg //Returns error message if user input fails validation
}




/*Cancel and redirects payment page to home is user clicks cancel*/
function cancelRedirect(){
   sessionStorage.clear();
   location.href="index.html";

}



function init(){
   /*Functions are call if Enquire_form is loaded*/
   if (document.getElementById("enquire_form")!=null){   

   document.getElementById("enquire_form").onsubmit = validateEnquire; //register the event listener
   }

      /*Functions are call if payment_Form is loaded*/
   else if (document.getElementById("payment_Form")!=null){
      getPaymentForm();
      document.getElementById("payment_Form").onsubmit = validatePayment;
      document.getElementById("Cancel").onclick = cancelRedirect;
   }


}

window.addEventListener("load", init);