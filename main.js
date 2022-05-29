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
        if (isCardIdGetted){
            alert(name + "さんが出勤しました")
            initialize()
            reloadDisplay()
        } else {
            alert("カードをかざしてください")
        }
    });
    $('#leaving_button').click(function() {
        if (isCardIdGetted){
            alert(name + "さんが退勤しました")
            initialize()
            reloadDisplay()
        } else {
            alert("カードをかざしてください")
        }
    });

    $('#cacncel_button').click(function() {
        alert("キャンセルされました")
        initialize()
        reloadDisplay()
    });

    $('#login_button').click(function() {
        isCardIdGetted = true
        name = "テスト太郎"
        account = "testtarou"
        password = "testpassword"
        reloadDisplay()
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
        isCardIdGetted = false
    }

    function reloadDisplay() {
        document.getElementById('name').textContent = isCardIdGetted ? name + "さん" : name
        document.getElementById('account_text').value = account
        document.getElementById('password_text').value = password
    }

    function startGetCardIdTimer() {
        getCardIdTimer = setInterval(getCardId,2000)
    }
  
  });