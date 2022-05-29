$(function () {

    var name = "カードをかざしてください"
    var account = ""
    var password = ""
    var isCardIdGetted = false
    var getCardIdTimer

    
    document.getElementById('name').textContent = name


    startGetCardIdTimer()




    $('#attendance_button').click(function() {
        alert(name + "さんが出勤しました")
        //ここにDBのかーどIDを消す処理
        initialize()
        reloadDisplay()
    });
    $('#leaving_button').click(function() {
        alert(name + "さんが退勤しました")
        //ここにDBのかーどIDを消す処理
        initialize()
        reloadDisplay()
    });


    function getCardId() {
        console.log("test")
    }

    function initialize() {
        name = "カードをかざしてください"
        account = ""
        password = ""
    }

    function reloadDisplay() {
        document.getElementById('name').textContent = name
        document.getElementById('account').value = account
        document.getElementById('password').value = password
    }

    function startGetCardIdTimer() {
        getCardIdTimer = setInterval(getCardId,1000)
    }
  
  });