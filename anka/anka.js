document.getElementById('plate').addEventListener('input', function() {
    this.value = this.value.replace(/\s+/g, '').toUpperCase();
});

document.getElementById('car-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const plateInput = document.getElementById('plate');
    const brandInput = document.getElementById('brand');
    const currentKmInput = document.getElementById('current-km');
    const inspectionKmInput = document.getElementById('inspection-km');
    const inspectionDateInput = document.getElementById('inspection-date');

    const plate = plateInput.value.toUpperCase().trim().replace(/\s+/g, '');
    const brand = brandInput.value.toUpperCase().trim();
    const currentKm = parseInt(currentKmInput.value);
    const inspectionKm = parseInt(inspectionKmInput.value);
    const inspectionDate = inspectionDateInput.value;

    let formIsValid = true;

    const plateRegex = /^[0-9]{2}[A-Z]{1,3}[0-9]{1,4}$/;
    const plateParts = plate.match(/^([0-9]{2})([A-Z]{1,3})([0-9]{1,4})$/);

    if (!plateRegex.test(plate) || !plateParts) {
        plateInput.style.borderColor = 'red';
        formIsValid = false;
    } else {
        const letters = plateParts[2].length;
        const numbers = plateParts[3].length;
        if ((letters >= 1 && letters <= 3) && numbers <= 4) {
            plateInput.style.borderColor = '';
        } else {
            plateInput.style.borderColor = 'red';
            formIsValid = false;
        }
    }

    if (!brand) {
        brandInput.style.borderColor = 'red';
        formIsValid = false;
    } else {
        brandInput.style.borderColor = '';
    }

    if (isNaN(currentKm)) {
        currentKmInput.style.borderColor = 'red';
        formIsValid = false;
    } else {
        currentKmInput.style.borderColor = '';
    }

    if (isNaN(inspectionKm)) {
        inspectionKmInput.style.borderColor = 'red';
        formIsValid = false;
    } else {
        inspectionKmInput.style.borderColor = '';
    }

    if (inspectionKm > currentKm) {
        inspectionKmInput.style.borderColor = 'red';
        formIsValid = false;
    } else {
        inspectionKmInput.style.borderColor = '';
    }

    let formattedDate = '';
    if (inspectionDate) {
        const dateParts = inspectionDate.split('-'); 
        if (dateParts.length === 3) {
            formattedDate = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;
            inspectionDateInput.style.borderColor = '';
        } else {
            inspectionDateInput.style.borderColor = 'red';
            formIsValid = false;
        }
    }

    if (!formIsValid) {
        return;
    }

    const remainingKm = (inspectionKm + 15000) - currentKm;
    
    let bgColor;
    if (remainingKm > 500) {
        bgColor = 'rgb(69, 191, 248 ,0.5)';
    } else if (remainingKm <= 500 && remainingKm > 250) {
        bgColor = 'rgb(243, 241, 93 ,0.5)';
    } else if (remainingKm <= 250 && remainingKm >= 0) {
        bgColor = 'rgb(243, 68, 68 ,0.5)';
    } else {
        bgColor = 'rgb(165, 165, 165 ,0.5)';
    }

    const carInfo = document.createElement('div');
    carInfo.className = 'car-info';
    carInfo.style.backgroundColor = bgColor;
    carInfo.innerHTML = `
        <p>Plaka: ${plate}</p>
        <p>Marka: ${brand}</p>
        <p>Güncel KM: ${currentKm}</p>
        <p>Muayene Edildiği KM: ${inspectionKm}</p>
        <p>Muayene Edildiği Tarih: ${formattedDate}</p>
        <p>Muayeneye Kalan KM: ${remainingKm} ${remainingKm < 0 ? ' - Muayene vakti gecikmiştir!' : ''}</p>
        <button class="custom-button" onclick="updateCar(this)">Güncelle</button>
        <button class="delete-button"   onclick="deleteCar(this)">Sil</button>
    `;

    document.getElementById('saved-cars').appendChild(carInfo);

    document.getElementById('car-form').reset();
});

function updateCar(button) {
    const carInfo = button.parentElement;
    const plate = carInfo.querySelector('p:nth-child(1)').innerText.replace('Plaka: ', '');
    const brand = carInfo.querySelector('p:nth-child(2)').innerText.replace('Marka: ', '');
    const currentKm = carInfo.querySelector('p:nth-child(3)').innerText.replace('Güncel KM: ', '');
    const inspectionKm = carInfo.querySelector('p:nth-child(4)').innerText.replace('Muayene Edildiği KM: ', '');
    const inspectionDate = carInfo.querySelector('p:nth-child(5)').innerText.replace('Muayene Edildiği Tarih: ', '').split('/').reverse().join('-');

    document.getElementById('plate').value = plate;
    document.getElementById('brand').value = brand;
    document.getElementById('current-km').value = currentKm;
    document.getElementById('inspection-km').value = inspectionKm;
    document.getElementById('inspection-date').value = inspectionDate;

   
    carInfo.remove();
}

function deleteCar(button) {
    const carInfo = button.parentElement;
    carInfo.remove();
}