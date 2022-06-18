// when i visit this page
// should see a clock in the header
// 9am - 5pm block

function startClock(){
    setInterval(function(){
        const now = moment().format("YYYY-MM-DD HH:mm:ss");

        $("#current-time").text(now)

    }, 1000);
}

function createTimeBlock(hour){
 

const row = $("<div>");

const currentHour = Number(moment().format("H"));

// past -- hour <currentHour
const isPast = hour < currentHour;

// present -- currentHour == Hour
const isPresent = hour === currentHour ;

// future -- hour > currentHour
const isFuture = hour > currentHour;

let rowClass = 'row';

if(isPast){
    rowClass = rowClass + 'past';
}

if(isPresent){
    rowClass = rowClass + 'present';
}

if(isFuture){
    rowClass = rowClass + 'future';
}

row.attr('class', 'row');

const timeCol = $('<div>')
timeCol.attr('class', 'time-col col-2')

timeCol.text(hour + ":00");

const textareaCol = $("<div>");
textareaCol.attr('class', 'textarea-col col-8')

const textarea = $('<textarea rows="3">')
textareaCol.append(textarea);

// with existing details from local storage
const existingNotes = localStorage.getItem(hour);
textarea.val(existingNotes);    

const buttonCol = $('<div>');
buttonCol.attr('class', 'button-col col-2');

const saveButton = $('<button class="btn btn-primary save-button">');
saveButton.text('Save');

buttonCol.append (saveButton);

row.append(timeCol, textareaCol, buttonCol);

return row;

}


    
// if timeblock is in the future, give class=future
// if timeblock is in the past, give class=past
// if timeblock is in the present, give class=present


$(function(){
    
    startClock();

    const timeBlockContainer = $(".container");

    for (let hour = 9; hour < 18; hour++) {
        
        const timeBlock = createTimeBlock(hour);

        timeBlockContainer.append(timeBlock);
}

$(document).on('click', '.save-button', function(event){
    
    // when user click on save button of particular timeblock
    
    const buttonClicked = $(event.target);

    const textarea = buttonClicked.parent().prev().children();

    const timeCol = buttonClicked.parent().prev().prev();
    
    const time = timeCol.text()

    const hour = time.slice(0, -3);

    // grab user input
    const userInput = textarea.val()

    // key should be the hour of timeblock
    // save to local storage
    localStorage.setItem(hour, userInput);

})



})