window.onload = function(){
    for(let i=0; i<9; i++){
        document.getElementById('area').innerHTML += '<div class="box"></div>'; 
    }                                                               //функция при загрузке страницы создает 9 div с классом 'box'
}

const area = document.getElementById('area');                       //переменная принимает #area
let boxes = document.getElementsByClassName('box');                 //переменная принимает .box
let move = 0;                                                       //переменная подсчёта ходов
let win = 0;                                                        //переменная определения победителя
let score1 = 0;                                                     //переменная счётчик очков 1
let score2 = 0;                                                     //переменная счётчик очков 2
let pop1 = new Audio('sound/pop1.mp3');                             //переменная для звукового файла
let pop2 = new Audio('sound/pop2.mp3');                             //переменная для звукового файла
let winSound = new Audio('sound/win.mp3');                          //переменная для звукового файла
let lostSound = new Audio('sound/lost.mp3');                        //переменная для звукового файла

area.addEventListener('click', function(event){                     //подключается слушатель на клик по элементам 'box', выполняется функция
    
    if(!event.target.innerHTML == ''){                              //если клик по занятому боксу
        alert('тут занято');                                        //сообщение
    }else if(event.target.className == 'box' &&                     //если клик по боксу и бокс пустой и ход чётный
    !event.target.innerHTML && move % 2 == 0){        
        event.target.innerHTML = 'X';                               //изменяет innerHTML бокса на Х
        pop1.play();                                                //проигрывание звукового файла
        check();                                                    //вызов функции check
        move ++;                                                    //счёт ходов +1
        if(win == 0){                                               //если нет победителя
            setTimeout(comp,500);                                   //выполняется функция comp через 0.5сек
        }                         
    }
})

function comp(){                                                    //функция для автономного хода противника
    while(move<8 && win == 0){                                      //цикл пока менее 8 ходов
        let r = Math.floor(Math.random()*9);                        //переменная с рандомным числом клетки
        if(!document.querySelectorAll('.box')[r].innerHTML){        //поиск пустого места
            document.querySelectorAll('.box')[r].innerHTML = 'O';   //если пустое место найдено то ставится О
            break;                                                  //выход из цикла
        }
    }
    pop2.play();                                                    //проигрывание звукового файла
    move ++;                                                        //счёт ходов +1
    check();                                                        //вызов функции check
}

function newGame(){                                                 //функция для очистки боксов по завершении игры
    for(let i=0; i < boxes.length; i++){                            //цикл перебора боксов
        boxes[i].innerHTML = '';                                    //боксы принимают пустое значение
        boxes[i].style.color = 'black';
    }
    move = 0;                                                       //сброс счётчика ходов
    win = 0;                                                        //сброс победителя
}

function check(){                                                   //функция поиска выигрышных комбинаций
    const arr = [                                                   //создание многомерного массива с выигрышными комбинациями
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]];
    
    for(let i=0; i < arr.length; i++){                              //цикл перебора клеток для поиска соответствия комбинаций
        if(boxes[arr[i][0]].innerHTML == 'X' &&                     //если есть соответствие по одной из линий по знаку Х и нет победителя
        boxes[arr[i][1]].innerHTML == 'X' &&
        boxes[arr[i][2]].innerHTML == 'X' && win == 0){
            boxes[arr[i][0]].style.color = 'red';                   //изменение цвета текста в клетках на линии соотвествия                   
            boxes[arr[i][1]].style.color = 'red';                   //изменение цвета текста в клетках на линии соотвествия
            boxes[arr[i][2]].style.color = 'red';                   //изменение цвета текста в клетках на линии соотвествия
            win = 1;                                                //присвоение переменной значение 1(есть победитель)
            score1 ++;                                              //счёт игрока Х +1
            winSound.play();                                        //проигрывание звукового файла
            document.getElementById('score1').innerHTML = 'Игрок Х: '+ score1;  //Замена показаний счёта очков игрока Х
            document.getElementById('score2').innerHTML = 'Игрок О: '+ score2;  //Замена показаний счёта очков игрока О
            setTimeout(newGame,1000);                               //вызов функции newGame через 1 сек
        }else if(boxes[arr[i][0]].innerHTML == 'O' &&               //иначе если есть соответствие по одной из линий по знаку О и нет победителя
        boxes[arr[i][1]].innerHTML == 'O' &&
        boxes[arr[i][2]].innerHTML == 'O' && win == 0){
            boxes[arr[i][0]].style.color = 'red';                   //изменение цвета текста в клетках на линии соотвествия
            boxes[arr[i][1]].style.color = 'red';                   //изменение цвета текста в клетках на линии соотвествия
            boxes[arr[i][2]].style.color = 'red';                   //изменение цвета текста в клетках на линии соотвествия
            win= 1;                                                 //присвоение переменной значение 1(есть победитель)
            score2 ++;                                              //счёт игрока О +1
            lostSound.play();                                       //проигрывание звукового файла
            document.getElementById('score1').innerHTML = 'Игрок Х: '+ score1;  //Замена показаний счёта очков игрока Х
            document.getElementById('score2').innerHTML = 'Игрок О: '+ score2;  //Замена показаний счёта очков игрока О
            setTimeout(newGame,1000);                               //вызов функции newGame через 1 сек
        }
    }
    if(move>8 && win == 0){                                         //если число ходов больше 8 и нет победителя
        setTimeout("alert('ничья')",500);                           //сообщение "ничья" через 0.5сек
        setTimeout(newGame,1000);                                   //выполняется функция newGame через 1сек
    }
}