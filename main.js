$(function () {

    var name = "カードをかざしてください"
    var account = ""
    var password = ""
    //カード番号を取得してるかどうか
    var isCardIdGetted = false
    var gettedCardNumberArray = []
    var getCardIdTimer

    document.getElementById('name').textContent = name

    startGetCardIdTimer()

    $('#attendance_button').click(function() {
        if (isCardIdGetted){
            alert(name + "さんが出勤しました")
            initialize()
            reloadDisplay()
            deleteCardNumberFromDB(gettedCardNumberArray[0])
        } else {
            alert("カードをかざしてください")
        }
    });
    $('#leaving_button').click(function() {
        if (isCardIdGetted){
            alert(name + "さんが退勤しました")
            initialize()
            reloadDisplay()
            deleteCardNumberFromDB(gettedCardNumberArray[0])
        } else {
            alert("カードをかざしてください")
        }
    });

    $('#cacncel_button').click(function() {
        if (isCardIdGetted){
            deleteCardNumberFromDB(gettedCardNumberArray[0])
        }
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


    async function getCardId() {
        //カード情報を保持してない時のみDBにカード情報を取りに行く
        if (!isCardIdGetted){
          try {
            const response = await fetch('https://bj1ci45en5.execute-api.us-west-2.amazonaws.com/test/getcardnumber', {
              method: "GET",
              mode: 'cors'
            });
        
            if (response.ok) {
              const resJson = await response.json();
              const responseCardNumbers = JSON.parse(resJson.body).Items
              responseCardNumbers.forEach(element => gettedCardNumberArray.push(element.cardNumber));
              if (gettedCardNumberArray[0]){
                //isCardIdGettedをtrueにしてDBアクセスを止める
                isCardIdGetted = true
                if (gettedCardNumberArray[0] == 123){
                    name = "田中　一郎"
                    account = "tanaka_ichiro"
                    password = "tanaka1rou"
                    reloadDisplay()
                } else if (gettedCardNumberArray[0] == 456){
                    name = "山田　二郎"
                    account = "yamada_jiro"
                    password = "yamada2rou"
                    reloadDisplay()
                }
              }

            } else {
              throw new Error('Network response was not ok.');
            }
        
          } catch (error) {
            console.error(error);
          }
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

    async function deleteCardNumberFromDB(cardNumber) {
        try {
          const response = await fetch('https://bj1ci45en5.execute-api.us-west-2.amazonaws.com/test/deletecardnumber', {
            method: "PUT",
            mode: 'cors',
            cardNumber: cardNumber
          });
          if (response.ok) {
            ///ログ出力
          } else {
            throw new Error('Network response was not ok.');
          }
      
        } catch (error) {
          console.error(error);
        }
    }
    
    // async function putCardNumberFromDB(cardNumber) {
    //     try {
    //       const response = await fetch('https://bj1ci45en5.execute-api.us-west-2.amazonaws.com/test/postcardnumber', {
    //         method: "PUT",
    //         mode: 'cors',
    //         cardNumber: cardNumber
    //       });
      
    //       if (response.ok) {
    //         ///ログ出力
    //       } else {
    //         throw new Error('Network response was not ok.');
    //       }      
    //     } catch (error) {
    //       console.error(error);
    //     }
    // }
});