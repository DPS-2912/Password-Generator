const inputSlider = document.getElementById("myRange");
const lengthDisplay = document.getElementById("data-lengthNumber");
const passwordDisplay = document.getElementById("data-passwordDisplay");
const copyMsg = document.getElementById("data-copyMsg");
const copyBtn = document.getElementById("icon-copied");
const uppercaseCheck = document.getElementById("uppercase");
const lowercaseCheck = document.getElementById("lowercase");
const numbersCheck = document.getElementById("numbers");
const symbolsCheck = document.getElementById("symbols");
const generateBtn = document.getElementById("generate-button");
const indicator = document.getElementById("data-strengthIndicator");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
const symbolString = '`~!@#$%^&*()-=_+{}[];:,.<>/?"';

var passwordLength = inputSlider.value;
inputSlider.oninput = function() {
    lengthDisplay.innerHTML = this.value;
    passwordLength = this.value;
    const min = inputSlider.min;
    const max = inputSlider.max;
    let percentage = ((passwordLength - min)*100/(max-min));
    inputSlider.style = 'background: linear-gradient(to right, var(--vb-violet), var(--vb-violet) ' + percentage + '%, var(--lt-violet) ' + percentage + '%, var(--lt-violet) 100%)'
  }

var password = "";  
var checkCount = 1 ;

function getRandom(min,max){
    return Math.floor(Math.random()*(max-min))+min;
}
function generateNumber()
{
    return getRandom(0,10);
}
function generateLowercase()
{
    return String.fromCharCode(getRandom(97,123));
}
function generateUppercase()
{
    return String.fromCharCode(getRandom(65,91));
}
function generateSymbol(){
    let index = getRandom(0,symbolString.length);
    return symbolString.charAt(index);       
}


function calculateStrenght()
{
    let hasUpper = false;
    let hasLower = false;
    let hasNumber = false;
    let hasSymbol = false;

    if(uppercaseCheck.checked) hasUpper = true;
    if(lowercaseCheck.checked) hasLower = true;
    if(numbersCheck.checked) hasNumber = true;
    if(symbolsCheck.checked) hasSymbol = true;

    if(hasUpper && hasLower &&(hasNumber|| hasSymbol) && passwordLength>=6)
    {
        indicator.style.backgroundColor= "green";
        indicator.style.boxShadow= "0px 0px 20px 2px green";
    }
    else if((hasLower||hasUpper) && (hasNumber||hasSymbol) && passwordLength>=6)
    {
        indicator.style.backgroundColor= "yellow";
        indicator.style.boxShadow= "0px 0px 20px 2px yellow";
    }
    else{
        indicator.style.backgroundColor= "gray";
        indicator.style.boxShadow= "0px 0px 20px 2px  rgb(152, 150, 150)";
    }
}

async function copyContent(){
    try{
        await navigator.clipboard.writeText(passwordDisplay.value);
        alert('Message Copied')
    }
    catch(e)
    {
        alert('Failed to copy')
    }
}

copyBtn.addEventListener('click',()=>{
    if(passwordDisplay.value)
        copyContent();
});


function handleChange()
{
    checkCount = 0;
    allCheckBox.forEach((checkbox) => {
        if(checkbox.checked)
            checkCount += 1;
    })   
}

allCheckBox.forEach((checkbox) => {
    checkbox.addEventListener('change',handleChange);
});
function shufflePassword(array)
{
    // Fisher Gates Method
    for(let i = array.length-1 ; i>0 ; i--)
    {
        const j = Math.floor(Math.random()*(i+1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    let str = "";
    array.forEach((el)=>(str+=el));
    return str;
}
generateBtn.addEventListener('click' , ()=>{
    if(checkCount <= 0) {
        uppercaseCheck.checked = true;
        checkCount = 1;
    }   
        if(passwordLength<checkCount)
        {
            passwordLength = checkCount;
            inputSlider.value = passwordLength;
            lengthDisplay.innerText = passwordLength;
        } 

    password="";

    let funcArr = [];

    if(uppercaseCheck.checked){
        funcArr.push(generateUppercase);
    }
    if(lowercaseCheck.checked){
        funcArr.push(generateLowercase);
    }
    if(numbersCheck.checked){
        funcArr.push(generateNumber);
    }
    if(symbolsCheck.checked){
        funcArr.push(generateSymbol);
    }
    // Compulsory Addition
    for(let i = 0 ; i<funcArr.length ; i++)
    {
        password += funcArr[i]();
    }
    // Remaining Addition
    for(let i = 0 ; i<passwordLength-funcArr.length ; i++)
    {
        let ind = getRandom(0,funcArr.length);
        password += funcArr[ind]();
    }

    // Shuffle password
    password = shufflePassword(Array.from(password));
    passwordDisplay.value = password;
    calculateStrenght(password);
})