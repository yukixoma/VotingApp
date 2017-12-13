$("#vote").text(data.vote);
for (var i = 1; i< Object.keys(data).length -3; i++ ) {
    var key = "option"+i;
    console.log(key);
    var button = ' <div class="form-check">' + '<label class="form-check-label">' +
    '<input type="radio" class="form-check-input" name="optionsRadios" value="' + data[key].option + '">'
    + data[key].option +'</label> </div>';
    $("#radio").append(button);
}
var info = '<input class="form-control" type="text" name="username" value ="' + data.username +'">' +
                '<input class="form-control" type="text" name="vote" value="' + data.vote + '">';
$("#info").html(info);

if(auth) {
    var div = '<form class="form-inline my-2 my-lg-0" action="/login" method="POST">' +            
    '<button class="btn btn-danger my-2 my-sm-0" type="submit">' + 
        'Sign out' +
    '</button> ' +  '</form>';
    $("#login").remove();
    $("#login_field").html(div);
    $("#manage").css("display","");
}



