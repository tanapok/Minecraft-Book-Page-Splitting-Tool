let inputTextarea = document.getElementById("input-textarea");
let outputTextarea = document.getElementById("output-textarea");
let outputWindow = document.getElementById("mc-output");
let mcConsoleButton = document.getElementById("mc-c1-button");
let mcGenerateButton = document.getElementById("mc-generate");

const MAXCHAR = 25;
const MAXLINE = 14;

// 控制台按钮函数
function mcConsole() {
    if (outputWindow.classList.contains("folded")) {
        mcConsoleEnable();
    } else {
        mcConsoleDisable();
    }
}

// 打开控制台
function mcConsoleEnable() {
    outputWindow.classList.remove("folded");
    mcConsoleButton.innerText = "控制台↓";
}

// 关闭控制台
function mcConsoleDisable() {
    outputWindow.classList.add("folded");
    mcConsoleButton.innerText = "控制台↑";
}

// 
function mcGenerate() {
    mcConsoleEnable();
    buttonDisable();
    let index = 0;
    let currLine = 0;
    let currChar = 0;
    let page = -1;
    let inputText = inputTextarea.value;
    let outputText = [];
    let outString = "";
    if (inputText == "") {
        outputTextarea.value = "你还什么都没输入呢。"
        buttonEnable();
    }
    while (index < inputText.length) {
        if (currLine == 0 && currChar == 0) {
            page++;
            outputText[page] = "";
        }
        if (inputText[index] == "\n") {
            // 判断字符是否为换行符
            outputText[page] += "\n";
            index++;
        } else if (inputText.charCodeAt(index) > 255) {
            // 判断字符是否为中文
            if (MAXCHAR - currChar >= 2) {
                // 判断是否读取字符
                currChar += 2;
                outputText[page] += inputText[index];
                index++;
                continue;
            }
        } else {
            // 判断是否读取字符
            if (MAXCHAR - currChar >= 1) {
                currChar++;
                outputText[page] += inputText[index];
                index++;
                continue;
            }
        }
        // 换行 或 换页
        currLine++;
        if (currLine < MAXLINE) {
            currChar = 0;
            continue;
        } else {
            currLine = 0;
            currChar = 0;
            continue;
        }
    }
    for (let i = 0; i < outputText.length; i++) {
        outString += "===页 " + (i+1) +"/" + outputText.length + "===\n";
        outString += outputText[i] + "\n";
        // outString += "\n===页末===\n\n";
    }
    outputTextarea.value = outString;
    buttonEnable();
}

// 禁用按钮，并更新文本为“处理中”
function buttonDisable() {
    mcGenerateButton.innerText = "处理中";
    mcGenerateButton.setAttribute("disabled", "true");
}

// 启用按钮，并更新文本为“生成”
function buttonEnable() {
    mcGenerateButton.innerText = "生成";
    mcGenerateButton.removeAttribute("disabled");
}

function mcDelSpace() {
    let inputText = "";
    inputText = inputTextarea.value;
    let newInputText = "";
    let prev = "\n";
    let i = 0;
    while (i < inputText.length) {
        if (!(prev == "\n" && inputText[i] == "\n")) {
            prev = inputText[i];
            newInputText += inputText[i];
        }
        i++;
    }
    inputTextarea.value = newInputText;
}