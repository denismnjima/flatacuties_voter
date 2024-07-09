const ul = document.querySelector('ul')
const h1 = document.querySelector('#welcome-text')
let shoppinList =[]


const takeInput = ()=>
    {
    let input = document.getElementById('input-item')
    if(input.value != ''){
        shoppinList.push(
            {
                item: input.value,
                purchased:false
            }
        )
        createDOM(shoppinList)
        input.value =''
    }
}

const createDOM = (list)=>
    {
    ul.innerHTML =''
     list.forEach((listItem,index)=>{
        if(listItem.purchased == false){
            ul.innerHTML +=`<li id="${index}"><p>${listItem.item}</p> <button class="del" onclick="removeItem(${index})"><i class="bi bi-trash3"></i></button><button class="pur" onclick="markpurchased(${index})"><i class="bi bi-check2"></i></button></li>`
        }
        else{
            ul.innerHTML +=`<li id="${index}" class="selected"><p>${listItem.item}</p><button class="del" onclick="removeItem(${index})"><i class="bi bi-trash3"></i></button><button class="pur" onclick="markpurchased(${index})"><i class="bi bi-check2"></i></button></li>`
        }
    })
}
const removeItem = (index)=>
    {
    shoppinList.splice(index,1)
    createDOM(shoppinList)
}

const markpurchased = (index)=>
    {
    if(shoppinList[index].purchased == true){
        shoppinList[index].purchased = false
        createDOM(shoppinList)
    }
    else{
        shoppinList[index].purchased = true
        createDOM(shoppinList)
    }

        
}