const request = async (user, repo) => {
    const userData = await getUser(user)
    const repoData = await getRepo(user,repo)
    return [userData,repoData]
    
}

const getUser = async(user) => {
    const urlUser = `https://api.github.com/users/${user}`
    const userResponse = await fetch(urlUser)
    const json = await userResponse.json()
    return json
}

const getRepo = async(user, page, repo ) => {
    page = '1'
    const urlRepo = `https://api.github.com/users/${user}/repos?page=${page}&per_page=${repo}`
    const repoResponse = await fetch(urlRepo)
    const json = await repoResponse.json()
    return json
}

// Button
const btn = document.querySelector('.btn')

btn.addEventListener('click', async(e)=>{
    e.preventDefault()
    // DOM Elements values
    const page = document.getElementById('pagina').value
    const name = document.getElementById('nombre').value
    const repoPage = document.getElementById('repoPagina').value
    const resultados = document.getElementById('resultados')
    const data = await request(name,repoPage)
    try {
        resultados.innerHTML= ` 
    <div class="row">    
            <div class="col-6">
            
                <h3>Datos de Usuario</h3>
                <div class="container">
                    <img src= ${data[0].avatar_url} style= "width:50%">
                    <h5>Nombre de Usuario:${data[0].name} </h5>
                    <h5>Nombre de login:${data[0].login} </h5>
                    <h5>Cantidad de Repositorios:${data[0].public_repos} </h5>
                    <h5>Localidad:${data[0].location} </h5>
                    <h5>Tipo de usuario:${data[0].type}</h5>
                </div>
                </div>
                <div class="col-6">
                <h3>Nombre de Repositorios</h3>
                <div class="container" id="repos">
                    
                </div>
            </div>
        </div>
    `
    const repoSection = document.getElementById('repos')
    data[1].forEach(repos => {repoSection.innerHTML += `<h5>${repos.name}</h5>`});
    } catch (error) {
        alert('El usuario no existe')
    }
    
    
})