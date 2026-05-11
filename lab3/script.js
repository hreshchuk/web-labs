(function() {
  var names = ["Bill", "John", "Jen", "Jason", "Paul", "Frank", "Steven", "Larry", "Paula", "Laura", "Jim"];

  // 1.2.2 — Hello / Good Bye залежно від першої літери (j/J)

  console.log("=== 1.2.2: Hello / Good Bye by first letter ===");

  for (var i = 0; i < names.length; i++) {
    if (names[i].charAt(0).toLowerCase() === "j") {
      SpeakGoodBye.speak(names[i]);
    } else {
      SpeakHello.speak(names[i]);
    }
  }

  // 1.2.3 — Додатковий спосіб селекції: сума ASCII-кодів імені
  // Якщо сума парна — Hello, якщо непарна — Good Bye

  console.log("=== 1.2.3: Hello / Good Bye by ASCII sum (even = Hello, odd = Good Bye) ===");

  for (var i = 0; i < names.length; i++) {
    var sum = 0;
    for (var j = 0; j < names[i].length; j++) {
      sum += names[i].charCodeAt(j);
    }
    if (sum % 2 === 0) {
      SpeakHello.speak(names[i]);
    } else {
      SpeakGoodBye.speak(names[i]);
    }
  }
})();
