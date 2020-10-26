/**
 * Course: COMP 426
 * Assignment: a04
 * Author: Daniel Koceja
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
    // TODO: Generate HTML elements to represent the hero
    // TODO: Return these elements as a string, HTMLElement, or jQuery object
    // Example: return `<div>${hero.name}</div>`;
    return `<div class="card" style="background-color:${hero.backgroundColor};color: ${hero.color};"><div class="card-image"><figure class="image is-4by3"><img src="${hero.img}" alt="hero"></figure></div><div class="card-content"><div><span style="font-weight:bold;">name: </span>${hero.first} ${hero.last}</div><div>${hero.name}</div><p>${hero.description}</p><div>${hero.firstSeen.toLocaleDateString()}</div><button class="button">edit</button></div></div>`;
};



/**
 * Given a hero object, this function generates a <form> which allows the
 *     user to edit the fields of the hero. The form inputs should be
 *     pre-populated with the initial values of the hero.
 * @param hero  The hero object to edit (see data.js)
 */
export const renderHeroEditForm = function(hero) {
    // TODO: Generate HTML elements to represent the hero edit form
    // TODO: Return these elements as a string, HTMLElement, or jQuery object
    // Example: return `<form>${hero.name}</form>`;
    return `<div class="card" style="background-color:${hero.backgroundColor};color: ${hero.color};"><div class="card-image"><figure class="image is-4by3"><img src="${hero.img}" alt="hero"></figure></div><div class="card-content"><form><div><span style="font-weight:bold;">name: </span><input type="text" value="${hero.first}"></div><div><input type="text" value="${hero.last}"></div><div><input type="text" value="${hero.name}"></div><textarea>${hero.description}</textarea><div><input type="date" value="${hero.firstSeen.getFullYear()}-${(hero.firstSeen.getMonth()+1 < 10) ? `0${hero.firstSeen.getMonth()+1}` : hero.firstSeen.getMonth()+1}-${(hero.firstSeen.getDate() < 10) ? `0${hero.firstSeen.getDate()}` : hero.firstSeen.getDate()}"></div><button class="button">cancel</button><button class="button" type="submit">save</button></form></div></div>`;
};



/**
 * Given an array of hero objects, this function converts the data into HTML and
 *     loads it into the DOM.
 * @param heroes  An array of hero objects to load (see data.js)
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

    // Pick a hero from the list at random
    const randomHero = heroes[Math.floor(Math.random() * heroes.length)];

    // TODO: Generate the hero edit form using renderHeroEditForm()

    // TODO: Append the hero edit form to the $root element
    $('#heroes').append(renderHeroEditForm(randomHero));

    for (let i = 0; i < 4; i++) {
        $('#heroes').append(`<div class="invisible"></div>`);
    }
};



/**
 * Use jQuery to execute the loadHeroesIntoDOM function after the page loads
 */
$(function() {
    loadHeroesIntoDOM(heroicData);
});
