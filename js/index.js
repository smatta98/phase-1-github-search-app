const form = document.querySelector('#github-form')
form.addEventListener('submit', (e) => {
    const userList = document.querySelector("#user-list")
    const repoList = document.getElementById('repos-list')
    repoList.innerHTML = ''
    userList.innerHTML = ''
    e.preventDefault()
   // 
   fetch(`https://api.github.com/search/users?q=${e.target[0].value}`).then(response => response.json()).then(response =>{
    response.items.map(item => {
        const li = document.createElement('li')
        const h2 = document.createElement('h2')
        h2.textContent = item.login

        h2.addEventListener('click', e => showUserResponse(item.login, e))
        const img = document.createElement('img')
        img.src = item.avatar_url
        
        li.append(h2, img)
        userList.append(li)
    })
   })
   form.reset()
})

function showUserResponse(username, e){
    const repoList = document.getElementById('repos-list')
    repoList.innerHTML = ''
    e.preventDefault()
    fetch(`https://api.github.com/users/${username}/repos`)
    .then(response => response.json())
    .then(data => data.map(repo => {
        const li = document.createElement('li')
        const h1 = document.createElement('h1')
        h1.textContent = repo.name
        li.append(h1)
        repoList.append(li)
    }))
}

