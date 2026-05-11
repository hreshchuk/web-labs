// Бібліотека сортування — псевдопростір імен SortLib
var SortLib = (function () {

  // Допоміжна: порівняння з урахуванням напрямку
  function cmp(a, b, asc) {
    return asc ? a > b : a < b;
  }

  // Допоміжна: обробка розрідженого масиву
  // Повертає { clean: [...числа], hadUndefined: bool }
  function handleSparse(arr) {
    var clean = [];
    var hadUndefined = false;
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] === undefined) {
        hadUndefined = true;
      } else {
        clean.push(arr[i]);
      }
    }
    return { clean: clean, hadUndefined: hadUndefined };
  }

  // Допоміжна: вивід статистики
  function printStats(name, arr, comparisons, swaps, hadUndefined) {
    console.log("=== " + name + " ===");
    if (hadUndefined) {
      console.log("  [!] Масив містив undefined-елементи — вони були видалені перед сортуванням.");
    }
    console.log("  Результат: [" + arr.join(", ") + "]");
    console.log("  Порівнянь: " + comparisons + " | Переміщень/обмінів: " + swaps);
  }

  // 1. Сортування обміном (Bubble Sort)
  function bubbleSort(arr, asc) {
    asc = (asc === undefined) ? true : asc;
    var parsed = handleSparse(arr);
    var a = parsed.clean.slice();
    var n = a.length;
    var comparisons = 0, swaps = 0;

    for (var i = 0; i < n - 1; i++) {
      for (var j = 0; j < n - 1 - i; j++) {
        comparisons++;
        if (cmp(a[j], a[j + 1], asc)) {
          var tmp = a[j]; a[j] = a[j + 1]; a[j + 1] = tmp;
          swaps++;
        }
      }
    }

    printStats("Bubble Sort (обмін) " + (asc ? "↑" : "↓"), a, comparisons, swaps, parsed.hadUndefined);
    return a;
  }

  // 2. Сортування мінімальних елементів (Selection Sort)
  function selectionSort(arr, asc) {
    asc = (asc === undefined) ? true : asc;
    var parsed = handleSparse(arr);
    var a = parsed.clean.slice();
    var n = a.length;
    var comparisons = 0, swaps = 0;

    for (var i = 0; i < n - 1; i++) {
      var idx = i;
      for (var j = i + 1; j < n; j++) {
        comparisons++;
        if (cmp(a[idx], a[j], asc)) {
          idx = j;
        }
      }
      if (idx !== i) {
        var tmp = a[i]; a[i] = a[idx]; a[idx] = tmp;
        swaps++;
      }
    }

    printStats("Selection Sort (мінімальних елементів) " + (asc ? "↑" : "↓"), a, comparisons, swaps, parsed.hadUndefined);
    return a;
  }

  // 3. Сортування вставками (Insertion Sort)
  function insertionSort(arr, asc) {
    asc = (asc === undefined) ? true : asc;
    var parsed = handleSparse(arr);
    var a = parsed.clean.slice();
    var n = a.length;
    var comparisons = 0, swaps = 0;

    for (var i = 1; i < n; i++) {
      var key = a[i];
      var j = i - 1;
      while (j >= 0) {
        comparisons++;
        if (cmp(a[j], key, asc)) {
          a[j + 1] = a[j];
          swaps++;
          j--;
        } else {
          break;
        }
      }
      a[j + 1] = key;
    }

    printStats("Insertion Sort (вставок) " + (asc ? "↑" : "↓"), a, comparisons, swaps, parsed.hadUndefined);
    return a;
  }

  // 4. Сортування Шелла (Shell Sort)
  function shellSort(arr, asc) {
    asc = (asc === undefined) ? true : asc;
    var parsed = handleSparse(arr);
    var a = parsed.clean.slice();
    var n = a.length;
    var comparisons = 0, swaps = 0;

    var gap = Math.floor(n / 2);
    while (gap > 0) {
      for (var i = gap; i < n; i++) {
        var key = a[i];
        var j = i;
        while (j >= gap) {
          comparisons++;
          if (cmp(a[j - gap], key, asc)) {
            a[j] = a[j - gap];
            swaps++;
            j -= gap;
          } else {
            break;
          }
        }
        a[j] = key;
      }
      gap = Math.floor(gap / 2);
    }

    printStats("Shell Sort (Шелла) " + (asc ? "↑" : "↓"), a, comparisons, swaps, parsed.hadUndefined);
    return a;
  }

  // 5. Швидке сортування Хоара (Quick Sort)
  function quickSort(arr, asc) {
    asc = (asc === undefined) ? true : asc;
    var parsed = handleSparse(arr);
    var a = parsed.clean.slice();
    var comparisons = 0, swaps = 0;

    function partition(a, low, high) {
      var pivot = a[high];
      var i = low - 1;
      for (var j = low; j < high; j++) {
        comparisons++;
        if (cmp(pivot, a[j], asc)) {
          i++;
          var tmp = a[i]; a[i] = a[j]; a[j] = tmp;
          swaps++;
        }
      }
      var tmp = a[i + 1]; a[i + 1] = a[high]; a[high] = tmp;
      swaps++;
      return i + 1;
    }

    function qs(a, low, high) {
      if (low < high) {
        var pi = partition(a, low, high);
        qs(a, low, pi - 1);
        qs(a, pi + 1, high);
      }
    }

    qs(a, 0, a.length - 1);
    printStats("Quick Sort (Хоара) " + (asc ? "↑" : "↓"), a, comparisons, swaps, parsed.hadUndefined);
    return a;
  }

  // Публічний інтерфейс бібліотеки
  return {
    bubbleSort:    bubbleSort,
    selectionSort: selectionSort,
    insertionSort: insertionSort,
    shellSort:     shellSort,
    quickSort:     quickSort
  };

})();
