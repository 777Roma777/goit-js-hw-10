import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchBreeds, fetchCatByBreed } from './cat-api';

const refs = {
  selectBreed: document.querySelector('.breed-select'),
  loaderElement: document.querySelector('.loader'),
  errorElement: document.querySelector('.error'),
  catInfo: document.querySelector('.cat-info'),
};

refs.selectBreed.addEventListener('change', getInformationAboutCat);
fetchAndRenderBreeds();

function fetchAndRenderBreeds() {
  refs.selectBreed.style.display = 'none';
  refs.errorElement.style.display = 'none';
  refs.loaderElement.style.display = 'block';

  fetchBreeds()
    .then(breeds => {
      refs.selectBreed.innerHTML = renderBreedsSelect(breeds);
      refs.selectBreed.style.display = 'block';
    })
    .catch(() => {
      Notify.failure(refs.errorElement.textContent);
    })
    .finally(() => {
      refs.loaderElement.style.display = 'none';
    });
}

function getInformationAboutCat(event) {
  refs.catInfo.innerHTML = '';
  refs.catInfo.style.display = 'none';
  refs.loaderElement.style.display = 'block';

  fetchCatByBreed(event.target.value)
    .then(catInfo => {
      let { name, description, temperament } = catInfo.breeds[0];
      let { url } = catInfo;

      refs.catInfo.innerHTML = markupCatInformation({
        name,
        description,
        temperament,
        url,
      });

      refs.catInfo.style.display = 'block';
    })
    .catch(() => {
      Notify.failure(refs.errorElement.textContent);
    })
    .finally(() => {
      refs.loaderElement.style.display = 'none';
    });
}

function renderBreedsSelect(breeds) {
  return breeds
    .map(({ id, name }) => `<option value="${id}">${name}</option>`)
    .join('');
}

function markupCatInformation({ name, description, temperament, url }) {
  return `
    <img src="${url}" alt="${name}"/>
    <h2>${name}</h2>
    <h3>${description}</h3>
    <p>${temperament}</p>
  `;
}
