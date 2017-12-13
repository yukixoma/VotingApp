$("#username").text = "Hello " + username;
$("#username-form").value = username;

$("#question").attr({
    value: data.vote,
    placeholder: data.vote,
})

$("#manage").attr("href","/user/" + username + "/poll/manage");


var href = "/user/" + username + "/" + vote + "/update";
$("#form").attr("action",href);


for (var i = 1; i < Object.keys(data).length -3; i++) {
    var key = "option" + i;
    var div = '<div' + ' id="' + key +'">' + '<input class="form-control mr-sm-2" type="text" name="'+ key +'"' 
    + ' value="' + data[key].option + '">' +
    '<br>' + '</div>'
    $("#option").append(div);
    console.log(div);
}

var option = Object.keys(data).length - 4;

$("#more").on("click",function(){
    option +=1;
    var html ='<div' + ' id="' + "option" + option +'">'   + '<input class="form-control mr-sm-2" type="text" name="option' + option + '"' +
    'placeholder="Option ' + option +'"> <br>' + '</div>';
    $("#option").append(html);
    console.log(html);
})

$("#delete").on("click",function(){
    if (option > 2) {
    var key = "option" + option;
    $("#"+key).remove();
    option -= 1;
    } else {
        return;
    }
})