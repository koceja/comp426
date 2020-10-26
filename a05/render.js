/**
 * Course: COMP 426
 * Assignment: a05
 * Author: <type your name here>
 *
 * This script uses jQuery to build an HTML page with content taken from the
 * data defined in data.js.
 */



/**
 * Given a hero object (see data.js), this function generates a "card" showing
 *     the hero's name, information, and colors.
 * @param hero  A hero object (see data.js)
 */
export const renderHeroCard = function(hero) {
    // TODO: Copy your code from a04 to render the hero card
    return `<div data-id="${hero.id}" class="card" style="background-color:${hero.backgroundColor};color: ${hero.color};"><div class="card-image"><figure class="image is-4by3"><img src="${hero.img}" alt="hero"></figure></div><div class="card-content"><div><span style="font-weight:bold;">name: </span>${hero.first} ${hero.last}</div><div class="hero-name">${hero.name}</div><p>${hero.description}</p><div>${hero.firstSeen.toLocaleDateString()}</div><button class="button edit-button">edit</button></div></div>`;
};



/**
 * Given a hero object, this function generates a <form> which allows the
 *     user to edit the fields of the hero. The form inputs should be
 *     pre-populated with the initial values of the hero.
 * @param hero  The hero object to edit (see data.js)
 */
export const renderHeroEditForm = function(hero) {
    // TODO: Copy your code from a04 to render the hero edit form
    return `<div data-id="${hero.id}" class="card" style="background-color:${hero.backgroundColor}; color: ${hero.color};"><div class="card-image"><figure class="image is-4by3"><img src="${hero.img}" alt="hero"></figure></div><div class="card-content"><form data-id="${hero.id}"><div><span style="font-weight:bold;">name: </span><input name="first" type="text" value="${hero.first}"></div><div><input name="last" type="text" value="${hero.last}"></div><div><input name="name" type="text" value="${hero.name}"></div><textarea name="description">${hero.description}</textarea><div><input name="firstSeen" type="date" value="${hero.firstSeen.getFullYear()}-${(hero.firstSeen.getMonth()+1 < 10) ? `0${hero.firstSeen.getMonth()+1}` : hero.firstSeen.getMonth()+1}-${(hero.firstSeen.getDate() < 10) ? `0${hero.firstSeen.getDate()}` : hero.firstSeen.getDate()}"></div><button class="button cancel-button">cancel</button><button class="button submit-button" type="submit">save</button></form></div></div>`;
};



/**
 * Handles the JavaScript event representing a user clicking on the "edit"
 *     button for a particular hero.
 * @param event  The JavaScript event that is being handled
 */
export const handleEditButtonPress = function(event) {
    // TODO: Render the hero edit form for the clicked hero and replace the
    //       hero's card in the DOM with their edit form instead
    let par = $(event.target).parent().parent();
    let id = par.data("id");
    par.remove();
    $('#heroes').append(renderHeroEditForm(heroicData.find((hero) => hero.id === id)));
    attachListeners();
};



/**
 * Handles the JavaScript event representing a user clicking on the "cancel"
 *     button for a particular hero.
 * @param event  The JavaScript event that is being handled
 */
export const handleCancelButtonPress = function(event) {
    // TODO: Render the hero card for the clicked hero and replace the
    //       hero's edit form in the DOM with their card instead
    event.preventDefault();
    let par = $(event.target).parent().parent().parent();
    let id = par.data("id");
    par.remove();
    $('#heroes').append(renderHeroCard(heroicData.find((hero) => hero.id === id)));
    attachListeners();
};



/**
 * Handles the JavaScript event representing a user clicking on the "cancel"
 *     button for a particular hero.
 * @param event  The JavaScript event that is being handled
 */
export const handleEditFormSubmit = function(event) {
    // TODO: Render the hero card using the updated field values from the
    //       submitted form and replace the hero's edit form in the DOM with
    //       their updated card instead
    event.preventDefault();
    const id = $(event.target).data("id");
    const curr = heroicData.find(hero => hero.id === id);
    curr.first = $(event.target).find('input[name="first"]').val();
    curr.last = $(event.target).find('input[name="last"]').val();
    curr.name = $(event.target).find('input[name="name"]').val();
    curr.description = $(event.target).find('textarea[name="description"]').val();
    const newDate = new Date($(event.target).find('input[name="firstSeen"]').val())
    curr.firstSeen.setFullYear(newDate.getFullYear());
    curr.firstSeen.setMonth(newDate.getMonth());
    curr.firstSeen.setDate(newDate.getDate());

    let par = $(event.target).parent().parent();
    par.remove();

    $('#heroes').append(renderHeroCard(curr));
    attachListeners();

};



/**
 * Given an array of hero objects, this function converts the data into HTML,
 *     loads it into the DOM, and adds event handlers.
 * @param  heroes  An array of hero objects to load (see data.js)
 */
export const loadHeroesIntoDOM = function(heroes) {
    // Grab a jQuery reference to the root HTML element
    const $root = $('#root');

    // TODO: Generate the heroes using renderHeroCard()
    let heroDivs = `<div id="heroes">`;
    for (let i = 0; i < heroes.length; i++) {
        heroDivs = heroDivs + renderHeroCard(heroes[i]);
    }
    heroDivs = heroDivs + `</div>`;
    // TODO: Append the hero cards to the $root element
    $root.append(heroDivs);


    for (let i = 0; i < 4; i++) {
        $('#heroes').append(`<div class="invisible"></div>`);
    }
    
    $(document).on('submit', "form", handleEditFormSubmit);

    attachListeners();
    
};

function attachListeners() {
    // TODO: Use jQuery to add handleEditButtonPress() as an event handler for
    //       clicking the edit button
    let buttons = document.querySelectorAll('.edit-button');
    
    buttons.forEach( button => button.addEventListener('click', handleEditButtonPress));


    

    // TODO: Use jQuery to add handleCancelButtonPress() as an event handler for
    //       clicking the cancel button
    buttons = document.querySelectorAll('.cancel-button');
    
    buttons.forEach( button => button.addEventListener('click', handleCancelButtonPress));
}

/**
 * Use jQuery to execute the loadHeroesIntoDOM function after the page loads
 */
$(function() {
    loadHeroesIntoDOM(heroicData);
});
