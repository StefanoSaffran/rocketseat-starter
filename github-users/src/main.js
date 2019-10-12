import api from './service/api';

import '../src/styles.css'

import '@fortawesome/fontawesome-free/js/fontawesome'
import '@fortawesome/fontawesome-free/js/brands' // https://fontawesome.com/icons?d=gallery&s=brands&m=free

class App {
  constructor() {
    this.repositories = [];

    this.formEl = document.querySelector('#repo-form');
    this.inputEl = document.querySelector('input[name=repository]');
    this.listEl = document.querySelector('#repo-list');

    this.registerHandlers();

 /*    library.add(github);
    dom.watch(); */
  }

  registerHandlers(username) {
    this.formEl.onsubmit = event => this.addRepository(event);
  }

  setLoading(loading = true) {
    if (loading === true) {
      let loadingEl = document.createElement('span');
      loadingEl.appendChild(document.createTextNode('Carregando..'));
      loadingEl.setAttribute('id', 'loading');
    } else {
      document.querySelector('#loading').remove();
    }
  }

  addRepository(event) {
    event.preventDefault();

    const repoInput = this.inputEl.value;

    if (repoInput.length === 0) return;

    this.setLoading();

    api.get(`/users/${repoInput}`)
      .then(res => {
        console.log(res.data);
        const { avatar_url, html_url, location, name, public_repos } = res.data;

        this.repositories.push({
          avatar_url,
          name,
          location,
          public_repos,
          html_url,
        });

        this.render();
      })
      .catch(err => {
        console.warn('Erro ao buscar repositório')
        alert('O repositório não existe');
      })

    this.inputEl.value = '';

    this.setLoading(false);
  }

  render() {
    this.listEl.innerHTML = '';
    this.repositories.forEach(repo => {
      let imgEl = document.createElement('img');
      imgEl.setAttribute('src', repo.avatar_url);

      let titleEl = document.createElement('strong');
      titleEl.appendChild(document.createTextNode(repo.name))

      let locationEl = document.createElement('p');
      locationEl.appendChild(document.createTextNode(repo.location))

      let reposEl = document.createElement('p');
      reposEl.appendChild(document.createTextNode(`Has ${repo.public_repos} public repositories`))

      let linkEl = document.createElement('a');
      linkEl.setAttribute('target', '_blank');
      linkEl.setAttribute('href', repo.html_url);
      linkEl.appendChild(document.createTextNode('Profile'))

      const listItemEl = document.createElement('li');
      listItemEl.appendChild(imgEl)
      listItemEl.appendChild(titleEl)
      listItemEl.appendChild(locationEl)
      listItemEl.appendChild(reposEl)
      listItemEl.appendChild(linkEl)

      this.listEl.appendChild(listItemEl);
    })
  }
}

new App();
