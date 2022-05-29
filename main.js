$(function () {

    var name = "カードをかざしてください"
    var account = ""
    var password = ""
    //カード番号を取得してるかどうか
    var isCardIdGetted = false
    var getCardIdTimer

    document.getElementById('name').textContent = name

    startGetCardIdTimer()

    $('#attendance_button').click(function() {
        alert(name + "さんが出勤しました")
        initialize()
        reloadDisplay()
        isCardIdGetted = false
    });
    $('#leaving_button').click(function() {
        alert(name + "さんが退勤しました")
        initialize()
        reloadDisplay()
        isCardIdGetted = false
    });

    $('#cacncel_button').click(function() {
        alert("キャンセルされました")
        initialize()
        reloadDisplay()
        isCardIdGetted = false
    });


    function getCardId() {
        //カード情報を保持してない時のみDBにカード情報を取りに行く
        if (!isCardIdGetted){
            //ここでDBのカード番号を取得する処理
            //取得出来たらname等に情報を格納、isCardIdGettedをtrueにする。DBのカード番号を削除する
            console.log("test")
        }
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