var option = 2;

$("#more").on("click",function(){
    option +=1;
    console.log(option);
    var html ='<div' + ' id="' + "option" + option +'">'   + '<input class="form-control mr-sm-2" type="text" name="option' + option + '"' +
    'placeholder="Option ' + option +'"> <br>' + '</div>';
    $("#option").append(html);
    console.log(html);
})

$("#delete").on("click",function(){
    var key = "option" + option;
    $("#"+key).remove();
    if(option > 2) option -= 1;
})




$("#username").text("Hello " + username);
$("#username-form").attr("value", username);
$("#manage").attr("href","/user/" + username + "/poll/manage");



