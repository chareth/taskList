// index between low/med and med/high
var lm = 0;
var mh = 0;
var tasks = [];

function Item(t, p){
    this.task = t;
    this.priority = p;
}

// insert the element into the correct place in the tasks list
function insert(element){
    var p = element.priority;
    if(p == 0){
        // stick at bottom of low prority
        tasks.splice(lm, 0, element);
        lm++;
        mh++
    }else if(p == 1){
        tasks.splice(mh, 0, element);
        mh++;
    }else if(p ==2){
        tasks.push(element);
    }
}

// removes the given from tasks and adjusts lm and mh
function takeOut(index, p){
    // remove from tasks
    tasks.splice(index, 1);

    // adjust lm and mh
    if(p === 0){
        lm--;
        mh--;
    }else if (p === 1){
        mh--;
    }


}

function getColor(num){
    if(num == 0){
        return "black";
    }else if(num == 1){
        return "orange";
    }else if(num == 2){
        return "red";
    }
}


function getPriority(color){
    if(color === 'black'){
        return 0;
    }else if(color === 'orange'){
        return 1;
    }else if(color === 'red'){
        return 2;
    }
}

// Array Remove - By John Resig (MIT Licensed)
Array.prototype.remove = function(from, to) {
    var rest = this.slice((to || from) + 1 || this.length);
    this.length = from < 0 ? this.length + from : from;
    return this.push.apply(this, rest);
};

$(document).ready(function() {
    
    // on save
    $('#btnSave').click(function() {
        $('#cblist').empty();
        
        var thing = new Item($('#txtName').val(),$('#priority').val());
        insert(thing);
        
        tasks.forEach(addCheckbox);
        $('#txtName').val('');
        $('#priority').val('0');
        
    });
         
    
});

function checked_update(){
    // clear everything
    $('#cblist').empty();
    takeOut($(this).attr('id'), getPriority($(this).attr('color')));
    // display updated tasks list
    tasks.forEach(addCheckbox);
}

function addCheckbox(item) {
    var container = $('#cblist');
    var inputs = container.find('input');
    var id = inputs.length;

    var color = 'color:'+ getColor(item.priority);

    
    $('<input />', { type: 'checkbox', id: 'cb'+id, onclick: 'checked_update()', value: item.task}).appendTo(container);
    $('<label />', { 'for': 'cb'+id, text: item.task, style:color }).appendTo(container);
    $('<br />').appendTo(container);
    
        
}
