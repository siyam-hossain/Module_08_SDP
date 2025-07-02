const loadDrinks = ()=>{

    const drinksContainer = document.getElementById("drinks-container");
    drinksContainer.innerHTML = "";

    fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a')
    .then(
        (response)=> response.json()
    )
    .then(
        (data)=>{
            // console.log(data);
            displayCards(data.drinks);
        }
    )
    .catch(
        (err)=>{
            console.log(err);
        }
    )
}
const displayCards = (drinks)=>{
    // console.log(drinks);
    const drinksContainer = document.getElementById("drinks-container");
    

    drinks.forEach(
        (drink)=> {
            // console.log(drink);
            const div = document.createElement("div");

            div.className = 'col-lg-3 col-md-5 col-sm-6 mt-4 border border-secondary border-1 mx-1 rounded p-3';


            // data-id="${drink.idDrink}"

            div.innerHTML = `
            <img class="card-img mt-2 rounded" src=${drink.strDrinkThumb} />
            <div class="d-flex flex-column mt-3 text-center">
                <h5>Name: ${drink.strGlass}</h5>
                <p>Category: ${drink.strCategory}</p>
                <p>Instructions: ${drink.strInstructions.slice(0,20)}</p>
            </div>
            <div class="d-grid d-lg-block d-xl-block d-xxl-block mb-2">
            <button id="add-btn-${drink.idDrink}" onclick="addToGroup(this,'${drink.strGlass}','${drink.idDrink}')" class="btn btn-success add-btn mb-1"> Add to group</button> 

            <button type="button" class="btn btn-info details-btn mb-1" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick = "showDetails('${drink.idDrink}')">Details</button>
            </div>
            `;
            drinksContainer.appendChild(div);
        }
    );
}





const searchDrinks = (event)=>{
    event.preventDefault();
    const searchValue = document.getElementById("searchField").value;
    console.log(searchValue);

    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchValue}`)
    .then(
        (response)=> response.json()
    )
    .then(
        (data)=>{
            console.log(data);
            const drinksContainer = document.getElementById("drinks-container");
            
            if(data.drinks){
                drinksContainer.innerHTML = "";
                displayCards(data.drinks);
            }else{
                drinksContainer.innerHTML = "";
                const div = document.createElement("div");
                div.className = "container text-center mt-4";

                div.innerHTML = `
                <h3 class="text-danger">No Drinks Found !</h3>
                `;
                drinksContainer.appendChild(div);

            }
            document.getElementById("searchField").value = "";
        }
    )
    .catch(
        (err)=>{
            console.log(err);
        }
    )
}

const showDetails = (id)=>{
    // console.log(id);
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then(
        (response)=> response.json()
    )
    .then(
        (data)=>{
            console.log(data);
            const modalBody = document.getElementById("modal-body");
            modalBody.innerHTML = "";

            const modalTitle = document.getElementById("exampleModalLabel");
            modalTitle.innerHTML = "";

            const div = document.createElement("div");
            const div2 = document.createElement("div");

            const drink = data.drinks[0];
            // console.log(drink);
            div.className = "row p-3"

            div2.innerHTML = `
                ${drink.strGlass}
            `;

            div.innerHTML =`
            <img class="rounded img-fluid mb-3 mx-auto d-block" src="${drink.strDrinkThumb}" style="width:100%; max-width:450px ;"/>
            <p><b>Details</b></p>
            <p class="">Category: <b>${drink.strCategory}</b></p>
            <p>Alcoholic: <b>${drink.strAlcoholic}</b></p>
            <p>Glass: <b>${drink.strGlass}</b></p>
            <p>${drink.strInstructions}</p>
            
            `;

            
            modalTitle.appendChild(div2);
            modalBody.appendChild(div);

        }
    )
    .catch(
        (err)=>{
            console.log(err);
        }
    )

}

const addToGroup = (btn,name,drinkId)=>{
    // console.log(name);
    const cardCount = document.getElementById("card-count").innerText;
    // console.log(cardCount);
    let convertedCount = parseInt(cardCount);
    
    
    if(convertedCount < 7){

        convertedCount += 1;
        document.getElementById("card-count").innerText = convertedCount;

        // console.log(convertedCount);
        const groupContainer = document.getElementById("group-container");

        const div = document.createElement("div");
        
        div.innerHTML = `
        <hr>
        <div class="d-flex justify-content-between align-content-center">
            <b class = "p-1 d-flex justify-content-start align-item-center">${name}</b>
            <button onclick="removeDrink(this, '${drinkId}')" type="button" class="btn btn-danger">Remove</button>
            
        </div>
        
        `;
        
        groupContainer.appendChild(div);

        primaryToSecondary(btn);
    }else{
        alert("Cannot add more than 7 drinks to the group");
    }
}

const removeDrink = (btn,drinkId)=>{
    const outerDiv = btn.closest("div").parentElement;
    outerDiv.remove();

    const cardCount = document.getElementById("card-count").innerText;
    let convertedCount = parseInt(cardCount);
    convertedCount -= 1;
    document.getElementById("card-count").innerText = convertedCount;

    const addBtn = document.getElementById(`add-btn-${drinkId}`);
    if (addBtn) {
        secondaryToPrimary(addBtn);
    }
}

const primaryToSecondary = (btn)=>{
    btn.disabled = true;
    btn.textContent = 'Drink is added';
    btn.classList.remove('btn-success');
    btn.classList.add('btn-secondary');

}

const secondaryToPrimary = (btn)=>{
    btn.disabled = false;
    btn.textContent = 'Add to group';
    btn.classList.remove('btn-secondary');
    btn.classList.add('btn-success');
}


loadDrinks();

