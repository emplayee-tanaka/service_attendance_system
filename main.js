$(function () {

    var name = "カードをかざしてください"
    var account = ""
    var password = ""
    
    document.getElementById('name').textContent = name

    var test = () => {
        console.log("test")
    }

    setInterval(test,1000)




    $('#attendance_button').click(function() {
        document.getElementById('name').textContent = "田中"
    });
  
  });