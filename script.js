function ready() {
    const calcWindow = document.getElementsByClassName("calculator__window")[0];
    const buttons = document.getElementsByClassName("button_item")

    for (let index = 0; index < buttons.length; index++) {
        const buttonItem = buttons[index]
        buttonItem.addEventListener("click", function(event){
            handleClickButtonItem(event)
        })
    }

    function handleClickButtonItem(event) {
        let value = event.target.innerText // Здесь мы получаем значение нажатой кнопки
        let calcWindowText = calcWindow.innerText // Здесь мы получили содержимое окна калькулятора

        // Если значение нажатой кнопки- символ И последний символ в предыдущем значении в окне калькулятора
        // тоже символ, то мы останавливаем нашу функцию
        if(isNaN(Number(value)) && isNaN(Number(calcWindowText.slice(-1)))) {
            return false
        }

        let newCalcWindowText = calcWindow.innerText + value
        let isEqually = !!(value === '=')

        calcWindow.innerText = newCalcWindowText

        if (isEqually) {
            const arraySymbols = newCalcWindowText.split('')


            // здесь мы узнаем что является числом, а что строкой
            for (let index = 0; index < arraySymbols.length; index++) {
                const symbol = arraySymbols[index]
                if(!isNaN((Number(symbol)))) {
                    arraySymbols[index] = Number(symbol)
                }
            }

            // здесь мы из цифр слепляем числа
            for (let index = 0; index < arraySymbols.length; index++) {
                const symbol = arraySymbols[index]

                if(!isNaN(Number(symbol))) {
                    const afterSymbol = arraySymbols[index + 1]
                    if(!isNaN(Number(afterSymbol))) {
                        arraySymbols.splice(index + 1, 1);// начиная с позиции 1, удалить 1 элемент
                        arraySymbols[index] = Number((symbol.toString() + afterSymbol.toString())) // Мы слепили числа
                    }
                }
            }

            // здесь мы находим математические знаки и выполняем математические операции
            for (let index = 0; index < arraySymbols.length; index++) {
                const symbol = arraySymbols[index] // Это переменная, которая содержит в себе значение каждого элемента массива

                // Number(входящий параметр) - функция, которая пытается преобразовать входящий параметр в число
                // В случае если преобразовать не получилось, то функция вернет NaN

                // isNaN(входящий параметр) - это функция, которая проверяет входящий параметр равен ли он NaN
                // и она возвращает True or False
                // Если значение элемента массива - символ, то
                if(isNaN(Number(symbol)) && symbol !== '=') {
                    const beforeSymbol = arraySymbols[index - 1] // это соседние элементы рядом с символом
                    const afterSymbol = arraySymbols[index + 1]
                    let result = 0

                    if(symbol === '+') {
                        result = beforeSymbol + afterSymbol
                    } else if (symbol ==='-'){
                        result = beforeSymbol - afterSymbol
                    } else if(symbol === '/') {
                        result = beforeSymbol / afterSymbol
                    } else if(symbol === '*') {
                        result = beforeSymbol * afterSymbol
                    }

                    arraySymbols[index + 1] = result

                    arraySymbols.splice(index - 1, 2) // вырезал из массива элемент до символа со сдвигом
                    index -= 1
                }
            }

            calcWindow.innerText += arraySymbols[0]

        }


    }



}

document.addEventListener("DOMContentLoaded", ready)