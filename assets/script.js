const apiKey = '58CWWupWXVuvQt4pwm1O1UBZOOrfnywUCM6QUxBf';
const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;

function showLoader() {
    document.getElementById('loader').style.display = 'block';
}

function hideLoader() {
    document.getElementById('loader').style.display = 'none';
}

async function fetchData(urlApi) {
    const response = await fetch(urlApi);
    const data = await response.json();
    return data;    
}

async function fetchDataAndRender() {
    try {
        showLoader();

        const data = await fetchData(apiUrl);
        const { title, hdurl: imageUrl, date, explanation, copyright } = data;
        
        const apodContainer = document.querySelector('.apodContainer');
        const imgApod = document.createElement('img');
        imgApod.src = imageUrl;
        imgApod.alt = title;
        imgApod.classList.add('imageApo')

        const titleElement = document.createElement('h2');
        titleElement.textContent = title;
        titleElement.classList.add('titleImg')

        const dateElement = document.createElement('span');
        dateElement.textContent = date;
        dateElement.classList.add('date')

        const descriptionElement = document.createElement('p');
        descriptionElement.textContent = explanation;
        descriptionElement.classList.add('description')

        const copyrightElement = document.createElement('span');
        copyrightElement.textContent = `Photo by: ${copyright}`;
        copyrightElement.classList.add('copyright')

        apodContainer.appendChild(titleElement);
        apodContainer.appendChild(dateElement);
        apodContainer.appendChild(imgApod);
        apodContainer.appendChild(descriptionElement);
        apodContainer.appendChild(copyrightElement);

        hideLoader();
    } catch (error) {
        console.error("Error", error);
        hideLoader();
    }
}

fetchDataAndRender();
