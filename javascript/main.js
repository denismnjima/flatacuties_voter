
// Fetching for data ==> fetch() is used to get data from a local json server
let urlString ='http://localhost:3000/posts'
let url = new URL(urlString)
let sp = url.searchParams

const fetchData =()=>{
    fetch(url)
    .then(res=>{
        if(!res.ok) throw new Error('Request failed')
        return res.json()
    })
   .then(data=>{
    domCreator(data)
   })
   .catch(err=>{
    console.warn(err)
   })
}

fetchData()
// Dom constructor => uses response from the fetch request and creates the dom with the data
const domCreator = (data)=>{

    let postsContainer = document.querySelector('.posts')
    postsContainer.innerHTML= data.map((posts,index)=>{
        return `<div class="individual--post">
            <div class="post--head">
                <div class="post--author">
                    <img src="images/${posts.author_gender}.png" alt="profile image">
                    <div class="author--det">
                        <h3>${posts.author}</h3>
                        <p>${posts.date}</p>
                    </div>
                </div>
                <img src="images/menu2.png" alt="view-post" class="post--view">
            </div>
            <div class="post--body" onclick="showPost(${posts.id})">   
                <p>${posts.title}</p>   
                <img src="${posts.picture}" alt="${posts.title}">
            </div>
            <div class="post--footer">
                <h2>${posts.votes}</h2>
                <img src="images/lik.png" alt="" onclick="like(${posts.id},${posts.votes})">
                <img src="images/dislike.png" alt="" onclick="dislike(${posts.id},${posts.votes})">
            </div>
        </div>`;
    })
}
// SINGLE POST DOM CREATOR ==> This function creates the dom for the popup
const singlePostDomCreator = (data)=>{
    postPop.innerHTML=data.map((item)=>{
        return `     <div class="individual--post">
        <div class="post--head">
            <div class="post--author">
                <img src="images/${item.author_gender}.png" alt="profile image">
                <div class="author--det">
                    <h3>${item.author}</h3>
                    <p>${item.date}</p>
                </div>
            </div>
            <img src="images/menu2.png" alt="view-post" class="post--view" id="close-btn" onclick="hidePostPop()">
        </div>
        <div class="post--body">   
            <p>${item.title}</p>   
            <img src="${item.picture}" alt="${item.title}">
        </div>
        <div class="post--footer">
            <h2>${item.votes}</h2>
            <img src="images/lik.png" alt="" onclick="like(${item.id},${item.votes})">
            <img src="images/dislike.png" alt="" onclick="dislike(${item.id},${item.votes})">
        </div>
    </div>`
    })
}



// LIKE ==> This function increases the value of like ￼by 1

const like = (id,votes)=>{

    let urlEdpoint = `http://localhost:3000/posts/${id}`
    let updatedObj = {
        votes:votes+1
    }
    let request = new Request(urlEdpoint,{
        method: 'PATCH',
        headers:{
            'content-type':'application/json'
        },
        body:JSON.stringify(updatedObj)
    })
    fetch(request)
    .then(res=>{
        if(!res.ok) throw new Error('request failed')
        return res.json()
    })
    .then(data=>{
        console.log(data)

    })
    .catch(err=> console.warn(err.message))
}

// DISLIKE ==> This function increases the value of like by 1

const dislike = (id,votes)=>{
    let urlEdpoint = `http://localhost:3000/posts/${id}`

    if(votes<=0){
        newVotes =0 
    }
    else{
        newVotes = votes-1
    }
    let updatedObj = {
        votes:newVotes
    }
    let request = new Request(urlEdpoint,{
        method: 'PATCH',
        headers:{
            'content-type':'application/json'
        },
        body:JSON.stringify(updatedObj)
    })

    console.log(request)
    console.log(updatedObj)
    fetch(request)
    .then(res=>{
        if(!res.ok) throw new Error('request failed')
        return res.json()
    })
    .then(data=>{
        console.log(data)

    })
    .catch(err=> console.warn(err.message))
}

// HIDE POST POPUP ==> This function hides the post popup 
let postPop = document.querySelector('.post--full')
const showPost = (id)=>{
    // fetch for data
    let endpoint =`http://localhost:3000/posts?id=${id}`
    fetch(endpoint)
    .then(res=>{
        if(!res.ok) throw new Error('request failed')
        return res.json()
    })
    .then(data=>{
        singlePostDomCreator(data)
    })
    .catch(err=>{
        console.warn(err.message)
    })
    postPop.style.display = 'block'
}

// HIDE POST POPUP ==> This function hides the post popup 
const hidePostPop = ()=>{
    postPop.style.display = 'none'
}


