const submit    = document.getElementById("submit"  );

const title     = document.getElementById("title"   );
const price     = document.getElementById("price"   );
const taxes     = document.getElementById("taxes"   );
const ads       = document.getElementById("ads"     );
const discount  = document.getElementById("discount");
const total     = document.getElementById("total"   );
const count     = document.getElementById("count"   );
const category = document.getElementById("category");
let btn = document.createElement("button");

let tbody = document.getElementById("tbody")
const search= document.getElementById("search");
search.style.display = "none";
const search_box= document.getElementById("box-search");

let submitMode = 'create';
let serchMode = "";
let tem;
function serchBy(id, e) {
    if (ArrProd.length > 0) {
        search.style.display = "block";
    }
    btn.style.display ="none"
    serchMode = id;
    search.focus();
    search.placeholder = id;
    if (search.placeholder === 'search-by-title') {
        e.classList.add("active-srch1");
        search.style.backgroundColor = "rgb(55, 84, 138)"
    } else {
        e.classList.add("active-srch2");
        search.style.backgroundColor = "rgb(25, 38, 80)"
    }
}
function getElementId(id,val) {
    if(price.value != ''&&
    taxes.value != ''&&
    ads.value != ''&&
        discount.value != '') {
        total.innerHTML = +price.value + +taxes.value + +ads.value - +discount.value;
        total.style.backgroundColor = "#040"
    } else {
        total.innerHTML = "";
        total.style.backgroundColor = "rgb(102, 14, 14)"
    }
    
}
let ArrProd;

if (localStorage.product) {
ArrProd =[...JSON.parse(localStorage.product)]
} else {
ArrProd = [];
}

window.onload = () => {
    if (ArrProd.length > 0) {
        
        btn.innerHTML = `deleteAll (${ArrProd.length})`;
        btn.id = "deleteall";
        search_box.prepend(btn);
        btn.onclick = () => {
            let conf = window.confirm(`Are You Sure To Delete All ${ArrProd.length} Products`);
            if (conf === true) {
                ArrProd = [];
                localStorage.clear();
                window.location.reload()
            }
        }
    }
}


for (let i = 0; i < ArrProd.length; i++){
    
    let table = `
    <tr>
    <td>${i+1}</td>
    <td>${ArrProd[i].title}</td>
    <td>${ArrProd[i].price}</td>
    <td>${ArrProd[i].taxes}</td>
    <td>${ArrProd[i].ads}</td>
    <td>${ArrProd[i].discount}</td>
    <td>${ArrProd[i].total}</td>
    <td>${ArrProd[i].category}</td>
    <td><button class="upd" onclick="updateThisElement(${i})">update</button></td>
    <td><button class="del" title="Warning..." onclick="deleThisElement(${i})">delete</button></td>
    </tr>
    `
    tbody.innerHTML += table;
    
}

function deleThisElement(i) {
    ArrProd.splice(i,1);
    localStorage.setItem("product", JSON.stringify(ArrProd));
    location.reload()
}
function updateThisElement(id) {
    btn.style.display ="none"
    title.value = ArrProd[id].title
    price.value = ArrProd[id].price
    taxes.value = ArrProd[id].taxes
    ads.value = ArrProd[id].ads
    discount.value = ArrProd[id].discount
    category.value = ArrProd[id].category;
    window.scrollTo({
        top: 0,
        behavior:"smooth"
    })
    submit.className="upd"
    submit.innerHTML = "update"
    submitMode = "update";
    tem = id;
}
//Submit Clicked
submit.onclick = () => {
    if (submitMode === 'create') {
        if (title.value != '' &&
            price.value != '' &&
            taxes.value != '' &&
            ads.value != '' &&
            discount.value != '' &&
            category.value != ''
            ) {
            if (+count.value > 1) {
                if (+count.value > 100) {
                    alert("Sorry Count Of Product Is Hight")
                } else {
                    for (let i = 0; i < +count.value; i++) {
                        let newProduct = {
                            title: title.value,
                            price: price.value,
                            taxes: taxes.value,
                            ads: ads.value,
                            discount: discount.value,
                            total: total.innerHTML,
                            category: category.value
                        }
                        ArrProd.push(newProduct);
                        localStorage.setItem("product", JSON.stringify(ArrProd));
                    }
                }
            } else {
                
                let newProduct = {
                    title: title.value,
                    price: price.value,
                    taxes: taxes.value,
                    ads: ads.value,
                    discount: discount.value,
                    total: total.innerHTML,
                    category: category.value
                }
                ArrProd.push(newProduct);
                localStorage.setItem("product", JSON.stringify(ArrProd));
            }
            title.value = '';
            price.value = '';
            taxes.value = '';
            ads.value = '';
            discount.value = '';
            total.innerHTML = '';
            count.value = '';
            category.value = '';
            window.location.reload()
        }
        
    }
    else {
        
        let newProduct = {
                    title: title.value,
                    price: price.value,
                    taxes: taxes.value,
                    ads: ads.value,
                    discount: discount.value,
                    total: total.innerHTML,
                    category: category.value
        }
        ArrProd[tem]=newProduct;
        localStorage.setItem("product", JSON.stringify(ArrProd));
        submit.innerHTML = "create"
        submitMode = "create"

            title.value = '';
            price.value = '';
            taxes.value = '';
            ads.value = '';
            discount.value = '';
            total.innerHTML = '';
            count.value = '';
        category.value = '';
        window.location.reload()
    }
}

search.onkeyup = () => {
    
    let data =''
    if (serchMode === "search-by-title") {
        data = ArrProd.filter(val => val.title === search.value)
    } else {
        data = ArrProd.filter(val => val.category === search.value)
        
    }
    if (data.length > 0) {
        tbody.innerHTML = ''
        for (let i = 0; i < data.length; i++){
            let table = `
    <tr>
    <td>${i+1}</td>
    <td>${data[i].title}</td>
    <td>${data[i].price}</td>
    <td>${data[i].taxes}</td>
    <td>${data[i].ads}</td>
    <td>${data[i].discount}</td>
    <td>${data[i].total}</td>
    <td>${data[i].category}</td>
    <td><button class="upd" onclick="updateThisElement(${i})">update</button></td>
    <td><button class="del" onclick="deleThisElement(${i})">delete</button></td>
    </tr>
    `
    
    tbody.innerHTML += table;
    
        }
    } else {
        tbody.innerHTML = ''
        for (let i = 0; i < ArrProd.length; i++) {
            let table = `
    <tr>
    <td>${i + 1}</td>
    <td>${ArrProd[i].title}</td>
    <td>${ArrProd[i].price}</td>
    <td>${ArrProd[i].taxes}</td>
    <td>${ArrProd[i].ads}</td>
    <td>${ArrProd[i].discount}</td>
    <td>${ArrProd[i].total}</td>
    <td>${ArrProd[i].category}</td>
    <td><button class="upd" onclick="updateThisElement(${i})">update</button></td>
    <td><button class="del" onclick="deleThisElement(${i})">delete</button></td>
    </tr>
    `
            tbody.innerHTML += table;
        }
    }
    if (data.length > 0) {
        let btn = document.createElement("button");
        if (data.length === 1) {
        btn.innerHTML = `delete This Product Only`;
        }else
        btn.innerHTML = `deleteAll (${data.length})`;
        btn.id = "deleteall";
        search_box.prepend(btn);
        btn.onclick = () => {
            let conf;
            if (data.length === 1) {
                 conf = window.confirm(`Are You Sure To Delete This Product Only`);
            }else
             conf = window.confirm(`Are You Sure To Delete All ${data.length} Products`);
            if (conf === true) {
                let newArr
                if (search.placeholder === "search-by-title") {
                    
                    newArr= ArrProd.filter(e=> e.title !=search.value)
                } else {
                    newArr= ArrProd.filter(e=> e.category !=search.value)
                }
                
                localStorage.setItem("product",JSON.stringify(newArr))
                window.location.reload()
                console.log(ArrProd)
            }
        }
    }
    if (search.value === "")
        location.reload()
}