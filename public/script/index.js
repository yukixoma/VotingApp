function signupOn () {
    document.getElementById("signup").style.display = "";
    document.getElementById("signup on").style.display= "none";
    document.getElementById("note").innerText="Choose yours account";
}

if(note == "Username already used" || note == "Invalid username or password" ) {
    document.getElementById("note").innerText = note;
    document.getElementById("note").style.color = "red";
    document.getElementById("signup").style.display = "";
    document.getElementById("signup on").style.display= "none";
} else {
    document.getElementById("signup on").style.display = "";
    document.getElementById("note").innerText = note;
}

