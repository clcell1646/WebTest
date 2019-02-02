$(document).ready(function() {
  var level = 1;
  var num1 = null;
  var num2 = null;
  var operator = null;

  var g1 = $(".g1");
  var g2 = $(".g2");
  var g3 = $(".g3");

  function disable(g, swt = false) {
      g.attr("disabled", "disabled");
      g.css({"color": "gray", "border": "1px solid gray"});
      if(swt) {
        switch (operator) {
          case "+":
            $("#btn_plus").css({"color": "gray", "border": "1px solid pink"});
            break;
          case "-":
            $("#btn_minus").css({"color": "gray", "border": "1px solid pink"});
            break;
          case "×":
            $("#btn_multiply").css({"color": "gray", "border": "1px solid pink"});
            break;
          case "÷":
            $("#btn_divide").css({"color": "gray", "border": "1px solid pink"});
            break;
          default:

        }
      }
  }

  function enable(g) {
      g.removeAttr("disabled");
      g.css({"color": "black", "border": "1px solid black"});
  }

  sequence1();
  function sequence1() {
    level = 1;
    enable(g1);
    disable(g2);
    disable(g3);
  }

  function sequence2() {
    level = 2;
    enable(g2);
  }

  function sequence3() {
    level = 3;
    disable(g2, true);
    enable(g3);
  }

  // Set Display Value
  function pressBtn(n) {
    if(level == 1) {
      setDispNum(0);
      sequence2();
    }

    if(operator && level == 2) {
      setDispNum(0);
      sequence3();
    }

    var dispNum = $("#display").val();
    dispNum = dispNum + n.toString();
    if(dispNum.indexOf(".") == -1) { // .이 존재하지 않는다면
      dispNum = dispNum.replace(/^0/, ""); // 첫자의 0 문자 하나만 제거하는 정규표현식
    }
    setDispNum(dispNum);
  }

  function setDispNum(num) {
    $("#display").val(num);
  }

  function getDispNum() {
    var dispVal = $("#display").val();
    dispVal = parseFloat(dispVal);
    return dispVal;
  }

  $("#btn_dot").click(function() {
    var dispNum = $("#display").val();
    if(dispNum.indexOf(".") != -1) { // .이 존재하는데 .이 입력되었다면, 혹은 numPadOnly가 true 일 때는 return.
      return;
    }
    pressBtn(".");
  })
  $("#btn_1").click(function() {
    pressBtn(1);
  })
  $("#btn_2").click(function() {
    pressBtn(2);
  })
  $("#btn_3").click(function() {
    pressBtn(3);
  })
  $("#btn_4").click(function() {
    pressBtn(4);
  })
  $("#btn_5").click(function() {
    pressBtn(5);
  })
  $("#btn_6").click(function() {
    pressBtn(6);
  })
  $("#btn_7").click(function() {
    pressBtn(7);
  })
  $("#btn_8").click(function() {
    pressBtn(8);
  })
  $("#btn_9").click(function() {
    pressBtn(9);
  })
  $("#btn_0").click(function() {
    pressBtn(0);
  })
  $("#btn_C").click(function() {
    $("#display").val(0);
  })
  $("#btn_AC").click(function() {
    allClear();
    $("#display").val(0);
  })

  // 지우기 메서드 건들x
  $("#btn_erase").click(function() {
    var dispNum = $("#display").val();
    if(dispNum.length == 1) { // 길이가 1이라면 0 또는 다른 숫자 단 하나뿐이므로 0으로 바꾼다.
      dispNum = "0";
    } else {
      dispNum = dispNum.slice(0, -1); // 마지막 문자 제거
      if(dispNum[dispNum.length - 1] == ".") {
        dispNum = dispNum.slice(0, -1);
      }
    }
    $("#display").val(dispNum);
  })

  // 연산자 4개, 클릭시 색상 변환과 operator, num1 저장.
  $(".g2").click(function() {
      $(".g2").css("border-color", "black");
      $(this).css("border-color", "red");
      operator = this.value;
      num1 = getDispNum();
  })

  // 연산 버튼
  $("#btn_equal").click(function() {
    num2 = getDispNum();
    operation();
    allClear();
  })

  // 올 클리어
  function allClear() {
    sequence1();
    num1 = null;
    num2 = null;
    operator = null;
  }

  // 연산
  function operation() {
    switch (operator) {
      case "+":
        num1 = num1 + num2;
        break;
      case "-":
        num1 = num1 - num2;
        break;
      case "×":
        num1 = num1 * num2;
        break;
      case "÷":
        num1 = num1 / num2;
        break;
      default:
    }
    setDispNum(num1);
  }
})
