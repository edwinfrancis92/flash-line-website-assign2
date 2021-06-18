/**
 * Author: Edwin Cheah 100636913
 * Target: enquire.html, payment.html
 * Purpose: Assignment 1 part 2 and Enhancement JS
 * Created: 1 May 2020
 * Last updated: 3 May 2020 - 2001hrs
 * Credits: None.
 */

"use strict";
var running

/* Enhancement 1 */
	/*Meal Combo Selection Dynamically changes side and drinks options*/
	function changeSideAndDrinks(){
		
		var mealCombo = document.getElementById("meal-combo").value; // Meal Selection

		var sideSelection = document.getElementById("side-selection"); //Side Selection - ADD ENHANCEMENT, change on the fly based off meal combo
		var drinkSelection = document.getElementById("drink-selection"); //Drinks Selection - ADD ENHANCEMENT, change on the fly based off meal combo

		
		/* Drop Box Arrays */
			var selectFlash = [["Chili Cheese Flash Fries", "Vibe's Spicy Shaker Fries", "Frost's Snow Soft Mash"],["Large Coke","Large Pepsi","A bottle of Harry's Beer"]]
			var selectArrow = [["Green Arrow's Baked Potatoes", "Queen's Chips", "Thea Queen's Pasta"],["Large Coke","Large Pepsi","A Bottle of the Queen's Wine"]]
			var selectSMan = [["Kent Farm Mac'n'Cheese", "Louis Lane's Super Mash", "Metropolis Cheese Fries"],["Large Coke","Large Pepsi","A bottle of Smallville Wineries Wine","A bottle of Kent Farm Beer"]]
			var selectSGirl = [["Al's Dive Bar Vegan Chips", "Martian Boild Potato Slices", "Kat Co. Olives"], ["Large Coke","Large Pepsi","A bottle of National City Wineries Wine","A bottle of Al's Dive Bar Black Beer"]]

			var sidePara = document.getElementById("sides-paragraph")
			var drinkPara = document.getElementById("drinks-paragraph")
			sidePara.hidden = false;
			drinkPara.hidden = false;




		/* If Statements - Checks combo selections, and dynamically changes behavior of form */
			/* Hides Side and Drink options when nothing is selected */	
			if (mealCombo == ""){
				sidePara.hidden = true;
				drinkPara.hidden = true;
			}

			/* When Big Belly Flash Burger is selected */
			if (mealCombo == "Big Belly Flash Burger Combo"){		
				clearSelects(drinkSelection)
				clearSelects(sideSelection)
				for (var index = 0; index < selectFlash[index].length; index ++){
					/* Prints Out Sides Selection */
					if (index == 0){
						for (var j = 0; j < selectFlash[index].length; j++){
							var option = document.createElement("option");
							option.value = selectFlash[index][j]
							option.text = selectFlash[index][j]
							sideSelection.appendChild(option)
						}
					}
			
					/* Prints Out Drinks Selection */
					if (index == 1){
						for (var j = 0; j < selectFlash[index].length; j++){
							var option = document.createElement("option");
							option.value = selectFlash[index][j]
							option.text = selectFlash[index][j]
							drinkSelection.appendChild(option)
						}
					}
				}
			}

			/* When Green Arrow Seabass is selected */
			if (mealCombo == "Green Arrow Seabass Combo"){
				clearSelects(drinkSelection)
				clearSelects(sideSelection)
				for (var index = 0; index < selectArrow[index].length; index ++){
					/* Prints Out Sides Selection */
					if (index == 0){
						for (var j = 0; j < selectArrow[index].length; j++){
							var option = document.createElement("option");
							option.value = selectArrow[index][j]
							option.text = selectArrow[index][j]
							sideSelection.appendChild(option)
						}
					}

					/* Prints Out Drinks Selection */
					if (index == 1){
						for (var j = 0; j < selectArrow[index].length; j++){
							var option = document.createElement("option");
							option.value = selectArrow[index][j]
							option.text = selectArrow[index][j]
							drinkSelection.appendChild(option)
						}
					}
				}
			}

			/* When Krypton Beef Steak is selected */
			if (mealCombo == "Krypton Beef Steak Combo"){
				clearSelects(drinkSelection)
				clearSelects(sideSelection)
				/* Prints Out Sides Selection */
				for (var index = 0; index < selectSMan[index].length; index ++){
					if (index == 0){
						for (var j = 0; j < selectSMan[index].length; j++){
							var option = document.createElement("option");
							option.value = selectSMan[index][j]
							option.text = selectSMan[index][j]
							sideSelection.appendChild(option)
						}
					}
					
					/* Prints Out Drinks Selection */
					if (index == 1){
						for (var j = 0; j < selectSMan[index].length; j++){
							var option = document.createElement("option");
							option.value = selectSMan[index][j]
							option.text = selectSMan[index][j]
							drinkSelection.appendChild(option)
						}
					}
				}
			}

			/* When Supergirl's Vegetarian Combo is selected */
			if (mealCombo == "Supergirl's Vegetarian Combo"){
				clearSelects(drinkSelection)
				clearSelects(sideSelection)
				/* Prints Out Sides Selection */
				for (var index = 0; index < selectSGirl[index].length; index ++){
					if (index == 0){
						for (var j = 0; j < selectSGirl[index].length; j++){
							var option = document.createElement("option");
							option.value = selectSGirl[index][j]
							option.text = selectSGirl[index][j]
							sideSelection.appendChild(option)
						}
					}
				
					/* Prints Out Drinks Selection */
					if (index == 1){
						for (var j = 0; j < selectSGirl[index].length; j++){
							var option = document.createElement("option");
							option.value = selectSGirl[index][j]
							option.text = selectSGirl[index][j]
							drinkSelection.appendChild(option)
						}
					}
				}
			}
	}
	
	/* Clears Selected Drinks and Sides - Function was adapted from https://www.somacon.com/p542.php and https://stackoverflow.com/questions/3364493/how-do-i-clear-all-options-in-a-dropdown-box */
	function clearSelects(x){
		var i
		var length = x.options.length - 1;
		for(i = length; i >= 1; i--) {
		x.remove(i);
		}
	}

	/*Hides Side and Drink Options*/
	function hideSideNDrink(){
		document.getElementById("sides-paragraph").hidden = true
		document.getElementById("drinks-paragraph").hidden = true
	}

/* Enhancement 2 - Countdown timer with auto redirect*/
function countdownTimeStart(){
		
	var countDownDate = new Date().getTime();
	countDownDate += 2 * 60000

	// Update the count down every 1 second
	var x = setInterval(function() {
		// Get todays date and time
		var now = new Date().getTime();

		// Find the distance between now an the count down date
		var count = countDownDate - now;
	
		// Time calculations for days, hours, minutes and seconds
		var hours = Math.floor((count % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		var minutes = Math.floor((count % (1000 * 60 * 60)) / (1000 * 60));
		var seconds = Math.floor((count % (1000 * 60)) / 1000);

		// Output the result in an element with id="demo"
		document.getElementById("timer").innerHTML = minutes + "m " + seconds + "s ";

		// If the count down is over, write some text 
		if (count <= 0) {
			clearInterval(x);
			document.getElementById("timer").innerHTML = "EXPIRED";
			cancelRedirect();
		}
	}, 1000);
}

function cancelRedirect(){
	sessionStorage.clear();
	location.href="index.html";
	
	}	
	
	
/* Enhancement 3 (very minor if any even considered) */
	/* On enquire page, Only user to only select soy, gluen and diary free checkboxes if No is not checked */
	function checkBoxValidation(){
		var noDietry = document.getElementById("NO");
		var glutenFree = document.getElementById("GF");
		var soyFree = document.getElementById("Soy");
		var dairyFree = document.getElementById("Dairy");
	
		
		if (soyFree.checked || glutenFree.checked || dairyFree.checked){
		noDietry.checked = false;
		}

	}

	

function enhancement_init() {
	//Starts a CountDown  timer on paymentpage
	if (document.getElementById("payment_Form")!=null){   
	countdownTimeStart()
	}
	
	if (document.getElementById("enquire_form")!=null){  
	// Hides Side and Drink Selections on Startup
	running = hideSideNDrink(); 

	// Unchecks NO checkbox if another is selected
	document.getElementById("Dietry-Container").addEventListener('change', checkBoxValidation); 


	/* Changes Meal options based on Meal Combo Selection */
	document.getElementById("meal-combo").addEventListener("change", changeSideAndDrinks);
	
	}

}
window.addEventListener("load",enhancement_init);
