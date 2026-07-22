window.addEventListener("scroll", () => {

    const navbar = document.querySelector(".navbar");

    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }

});

const reviewForm = document.getElementById("reviewForm");
const reviewContainer = document.getElementById("reviewContainer");

reviewForm.addEventListener("submit", function (e) {

    e.preventDefault();

    const name = document.getElementById("name").value;
    const review = document.getElementById("review").value;

    const card = document.createElement("div");

    card.classList.add("review-card");

    card.innerHTML = `
        <div class="stars">★★★★★</div>
        <h3>${name}</h3>
        <p>${review}</p>
    `;

    reviewContainer.prepend(card);

    reviewForm.reset();

});

const sampleReviews = [

    {
        name: "Priya",
        review: "Absolutely loved the crochet flowers. Beautiful craftsmanship."
    },

    {
        name: "Ananya",
        review: "The quality exceeded my expectations. Highly recommended."
    },

    {
        name: "Neha",
        review: "Beautiful packaging and amazing handmade products."
    }

];

sampleReviews.forEach(item => {

    const card = document.createElement("div");

    card.classList.add("review-card");

    card.innerHTML = `
        <div class="stars">★★★★★</div>
        <h3>${item.name}</h3>
        <p>${item.review}</p>
    `;

    reviewContainer.appendChild(card);

});