function SendMail(){
    var params ={
        from_name : document.getElementById("name").value,
        email_id :  document.getElementById("email").value,
        message: document.getElementById("message").value,
        subject : document.getElementById("subject").value,
        phone : document.getElementById("phone").value,
    }
    emailjs.send("service_84r9qsg","template_rtxmui2",params).then(function(res){
        alert("success!"+res.status)
    })

    setTimeout(function () {
        location.reload();
    }, 3000);
}