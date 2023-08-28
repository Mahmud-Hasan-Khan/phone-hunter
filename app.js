
const loadPhone = async (searchText, isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    displayPhone(phones, isShowAll);
}

const displayPhone = (phones, isShowAll) => {
    console.log(phones.length);

    const phoneContainer = document.getElementById('phone-container');
    // clear phone container card before adding new cards
    phoneContainer.textContent = '';

    // hide show all button by default, when phone is more than 12 it will be viable
    const showAllBtn = document.getElementById('show-all-btn');

    if (phones.length > 12 && !isShowAll) {
        showAllBtn.classList.remove('hidden')
    } else {
        showAllBtn.classList.add('hidden')
    }
    console.log('is show all', isShowAll);
    // display only first 12 phones if not show All
    if (!isShowAll) {
        phones = phones.slice(0, 12);

    }

    phones.forEach(phone => {
        console.log(phone);
        const { image, phone_name, brand } = phone
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card w-96 bg-base-100 shadow-xl border`;
        phoneCard.innerHTML = `
        <figure class="bg-[#f3f8ff] rounded-lg m-6"><img class="object-cover py-16 " src="${image}" alt="phone" /></figure>
        <div class="card-body">
            <h2 class="card-title justify-center">${phone_name}</h2>
            <p class="text-center">${brand}</p>
            <div class="card-actions justify-center">
                <button class="btn btn-primary">Buy Now</button>
            </div>
        </div>
        `;
        phoneContainer.appendChild(phoneCard)
    });
    // stop loading spinner
    toggleLoadingSpinner(false)
}

// handle search button
const handleSearch = (isShowAll) => {
    // start loading spinner
    toggleLoadingSpinner(true)
    const searchField = document.getElementById('input-search');
    const searchText = searchField.value;
    console.log(searchText);
    loadPhone(searchText, isShowAll)
}

// spinner
const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('loading-spinner');
    if (isLoading) {
        loadingSpinner.classList.remove('hidden')
    } else {
        loadingSpinner.classList.add('hidden')
    }
}

// handle show all data
const handleShowAll = () => {
    handleSearch(true)
}

// loadPhone()