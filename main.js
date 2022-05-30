$(function () {

    var name = "カードをかざしてください"
    var account = ""
    var password = ""
    //カード番号を取得してるかどうか
    var isCardIdGetted = false
    var gettedCardNumberArray = []
    var getCardIdTimer

    document.getElementById('name').textContent = name
    setClock()
    startGetCardIdTimer()

    $('#attendance_button').click(function() {
        if (isCardIdGetted){
            alert(name + "さんが出勤しました")
            deleteCardNumberFromDB(gettedCardNumberArray[0])
            gettedCardNumberArray.shift();
            initialize()
            reloadDisplay()
            if (!gettedCardNumberArray.length) {
                isCardIdGetted = false
            }
        } else {
            alert("カードをかざしてください")
        }
    });
    $('#leaving_button').click(function() {
        if (isCardIdGetted){
            alert(name + "さんが退勤しました")
            deleteCardNumberFromDB(gettedCardNumberArray[0])
            gettedCardNumberArray.shift();
            initialize()
            reloadDisplay()
            if (!gettedCardNumberArray.length) {
                isCardIdGetted = false
            }
        } else {
            alert("カードをかざしてください")
        }
    });

    $('#cacncel_button').click(async function() {
        if (isCardIdGetted){
            await deleteCardNumberFromDB(gettedCardNumberArray[0])
            gettedCardNumberArray.shift();
        }
        if (!gettedCardNumberArray.length) {
            isCardIdGetted = false
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

            } else {
              throw new Error('Network response was not ok.');
            }
        
          } catch (error) {
            console.error(error);
          }
            console.log("test")
        }
        if (gettedCardNumberArray.length){
          isCardIdGetted = true
          if (gettedCardNumberArray[0] == 1181181542562211440){
              name = "田中　一郎さん"
              account = "tanaka_ichiro"
              password = "tanaka1rou"
              reloadDisplay()
          } else if (gettedCardNumberArray[0] == 146721962032161221311440){
              name = "山田　二郎さん"
              account = "yamada_jiro"
              password = "yamada2rou"
              reloadDisplay()
          }
        }
    }

    function initialize() {
        name = "カードをかざしてください"
        account = ""
        password = ""
    }

    function reloadDisplay() {
        document.getElementById('name').textContent = name
        document.getElementById('account_text').value = account
        document.getElementById('password_text').value = password
    }

    function startGetCardIdTimer() {
        getCardIdTimer = setInterval(getCardId,2000)
    }

    async function deleteCardNumberFromDB(cardNumber) {
        try {
          const response = await fetch('https://bj1ci45en5.execute-api.us-west-2.amazonaws.com/test/deletecardnumber', {
            method: "DELETE",
            mode: 'cors',
            body: JSON.stringify({
                "routeKey":"DELETE",
                "pathParameters":cardNumber
            })
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

    function setClock(){
        (()=>{
            // ゼロ埋めして2桁の数値にする
            const zero = n => (n < 10 ) ? "0" + n.toString() : n.toString();
 
            // 日付の文字列化
            const youbi = ["日","月","火","水","木","金","土"];
            const getDateString = date =>
                `${ date.getFullYear() }年 ${ zero(date.getMonth() + 1) }月  ${ zero(date.getDate()) }日 ${ youbi[date.getDay()] }曜日`;
 
            // 時間の文字列化
            const getHourString = date =>
                `${ zero(date.getHours()) }: ${ zero(date.getMinutes()) }: ${ zero(date.getSeconds()) }`;
 
            // DOMの構築を待つ
            window.addEventListener('DOMContentLoaded',()=> {
                // 日時を表示するDOM要素を取得
                const dateDiv = document.getElementById("date");
                const clockDiv = document.getElementById("clock");
 
                // 現在の日
                let nowDate = null;
 
                // 1秒周期のタイマーセット
                setInterval( ()=>{
                    // 現在の日時を取得
                    const now = new Date();
                    // 日付が変わったら日付を再表示
                    if( nowDate !== now.getDate() ) {
                        nowDate = now.getDate();
                        dateDiv.innerText = getDateString(now);
                    }
 
                    // 時間を再表示
                    clockDiv.innerText = getHourString(now);
                },1000);
            });
        })();

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