
// 1. 初始化数据
var hashInit = init();
var keys = hashInit.keys;
var hash = hashInit.hash;



// 2. 生成键盘
generateKeyBoard(keys,hash);


// 3. 监听键盘
listenToUsers(hash);


// 4. 生成搜索
let CONST = {
    inputText: null,
    Baidu: null,
    Google: null,
    body: document.body
};
createSearchBar();
createInputEvent();
createSearchEvent();


//下面是工具函数

function createSearchBar(){ // 函数创建搜索bar
    
    let input = document.createElement('input');
    input.setAttribute('id', 'input_text');
    input.setAttribute('type', 'text');
    input.setAttribute('spellcheck', 'false');
    input.setAttribute('placeholder', 'Search');

    let baidu = document.createElement('button');
    baidu.setAttribute('id', 'baidu');
    baidu.setAttribute('class','baidu');
    baidu.innerText = '百度';

    let google = document.createElement('button');
    google.setAttribute('id', 'google');
    google.setAttribute('class','google');
    google.innerText = '谷歌';

    let div = document.createElement('div');
    div.setAttribute('id', 'search');
    div.setAttribute('class','search');
    
    let fragment = document.createDocumentFragment();
    fragment.appendChild(div);
    div.appendChild(input);
    div.appendChild(baidu);
    div.appendChild(google);
    CONST.body.appendChild(fragment);

    CONST.inputText = input;
    CONST.Baidu = baidu;
    CONST.Google = google;
}

function createInputEvent(){
    document.onclick = function (e){
        if (e.target === CONST.inputText) {
            CONST.inputText.classList.add('focus');
        } else {
            CONST.inputText.classList.remove('focus');
        }
        // 写起来语句过长或者影响阅读就不要用 三元操作符
    }
}

function createSearchEvent() {
    CONST.Baidu.addEventListener('click', function() {
        let question = CONST.inputText.value;
        if (question) {
            window.open('https://www.baidu.com/s?wd=' + question);
        } else {
            alert('你好像需要输入点什么～');
        }
    }, false);

    CONST.Google.addEventListener('click', function() {
        let question = CONST.inputText.value;
        if (question) {
            window.open('https://www.google.com/search?q=' + question);
        } else {
            alert('你好像需要输入点什么～');
        }
    }, false);
}

// 可以使用事件代理，常用于 table 等需要绑定很多类似事件的时候

function tag(tagName,attributes) {
    var element = document.createElement(tagName);
    for(var key in attributes){
        element[key] = attributes[key];
    }
    return element;
}

function getFromLocalStorage(name) {
    return JSON.parse(localStorage.getItem(name) || 'null');
}


function createSpan(textContent) {
    var span = tag('span',{className:'text',textContent:textContent});
    return span
}
function createButton(id) {
    var button = tag('button',{textContent:'E',id:id});
    button.onclick = function (asd) {
        var button2 = asd.target;
        var img2 = button2.previousSibling;
        var key = asd.target.id;
        var x = prompt('请输入一个网址');
        hash[key] = x;
        img2.src = 'http://' + x + '/favicon.ico';
        img2.onerror = function (ccc) {
            ccc.target .src = '//i.loli.net/2018/03/14/5aa8e951e8c16.png'
        };
        localStorage.setItem('zzz', JSON.stringify(hash));
    };
    return button;
}
function createImg(domain) {
    var img = tag('img');
    if(domain){
        img.src = 'http://' + domain + '/favicon.ico';
    }else{
        img.src = '//i.loli.net/2018/03/14/5aa8e951e8c16.png'
    }
    img.onerror = function (ccc) {
        ccc.target.src = '//i.loli.net/2018/03/14/5aa8e951e8c16.png'
    };
    return img;
}
function createKbd(key) {
    var kbd = tag('kbd',{className:'key'});
    if(key === 'delete'){
        kbd.id = 'delete';
    }
    if(key === 'tab'){
        kbd.id = 'tab';
    }
    if(key === 'caps lock'){
        kbd.id = 'capsLock';
    }
    if(key === 'return'){
        kbd.id = 'return';
    }
    if(key === 'shift'){
        kbd.id = 'shift';
    }
    return kbd;
}


function init() {
    var keys = {
        '0': {0:'`',1:'1',2:'2',3:'3',4:'4',5:'5',6:'6',7:'7',8:'8',9:'9',10:'0',11:'-',12:'=',13:'delete',length:14},
        '1': {0:'tab',1:'q',2:'w',3:'e',4:'r',5:'t',6:'y',7:'u',8:'i',9:'o',10:'p',11:'[',12:']',13:'\\',length:14},
        '2': {0:'caps lock',1:'a',2:'s',3:'d',4:'f',5:'g',6:'h',7:'j',8:'k',9:'l',10:';',11:'\'',12:'return',length:13},
        '3': {0:'shift',1:'z',2:'x',3:'c',4:'v',5:'b',6:'n',7:'m',8:',',9:'.',10:'/',11:'shift',length:12},
        length:4
    };
    var hash = {
        1 : 'www.baidu.com',
        q: 'qq.com',
        w: 'weibo.com',
        e: 'ele.me',
        t: 'taobao.com',
        y: 'youtube.com',
        i: 'iqiyi.com',
        d: 'movie.douban.com',
        j: 'jianshu.com',
        z: 'zhihu.com',
        b: 'baidu.com',
        n: 'nba.com',
        m: 'www.mcdonalds.com.cn/'
    };
    //取出localStorage中对应的hash
    var hashInLocalStorage = getFromLocalStorage('zzz');
    if(hashInLocalStorage){
        hash = hashInLocalStorage;
    }
    return {
        keys: keys,
        hash: hash
    }
}


function generateKeyBoard(keys,hash) {
    for(var index=0;index<keys['length'];index++){

        var div = tag('div',{className:'row'});

        main.appendChild(div);

        var row=keys[index];

        for(var index2=0;index2<row['length'];index2++){

            var span = createSpan(row[index2]);

            var button = createButton(row[index2]);

            var img = createImg(hash[row[index2]]);

            var kbd = createKbd(row[index2]);

            kbd.appendChild(span);
            kbd.appendChild(img);
            kbd.appendChild(button);

            div.appendChild(kbd);
        }
    }
}

let search  = document.querySelector('input');

function listenToUsers(hash) {
    document.onkeypress = function (zxc) {
        var key = zxc.key;
        var website = hash[key];
        if(website !== undefined && website !== null && search.classList.value === ""){
            window.open('http://'+website, '_blank');
        }
    };
    var kbd = document.getElementsByClassName('key');
    console.log(kbd[1]);
    for(let i=0;i<kbd.length;i++){
        kbd[i].onclick = function (zxc) {
            var kbdInfo = kbd[i];
            var span = kbdInfo.children;
            var key = span[0].innerText.toLowerCase();
            var website = hash[key];
            if(website !== undefined && website !== null){
                window.open('http://'+website, '_blank');
            }
        };
    }

}