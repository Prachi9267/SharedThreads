fetch("products.json")
    .then(response => response.json())
    .then(products => {

        const collectionGrid =
            document.getElementById("collectionGrid");

        products.forEach(product => {

            const card =
                document.createElement("div");

            card.classList.add("card");

            let currentImage = 0;

            card.innerHTML = `

                <div class="product-image-container">

                    <img 
                        src="${product.Images[0]}" 
                        alt="${product.Name}"
                        class="product-image"
                    >

                    <button
                        class="image-btn prev-btn"
                        aria-label="Previous image">
                        &#10094;
                    </button>

                    <button
                        class="image-btn next-btn"
                        aria-label="Next image">
                        &#10095;
                    </button>

                </div>

                <h3>
                    ${product.Name}
                </h3>

                <p class="product-price">
                    ₹${product.Price}
                </p>

            `;


            const image =
                card.querySelector(".product-image");

            const prevBtn =
                card.querySelector(".prev-btn");

            const nextBtn =
                card.querySelector(".next-btn");


            // =========================
            // NEXT IMAGE
            // =========================

            nextBtn.addEventListener(
                "click",
                (event) => {

                    event.stopPropagation();

                    currentImage++;

                    if (
                        currentImage >=
                        product.Images.length
                    ) {
                        currentImage = 0;
                    }

                    image.src =
                        product.Images[currentImage];

                }
            );


            // =========================
            // PREVIOUS IMAGE
            // =========================

            prevBtn.addEventListener(
                "click",
                (event) => {

                    event.stopPropagation();

                    currentImage--;

                    if (currentImage < 0) {

                        currentImage =
                            product.Images.length - 1;

                    }

                    image.src =
                        product.Images[currentImage];

                }
            );


            // =========================
            // OPEN PRODUCT PAGE
            // =========================

            card.addEventListener(
                "click",
                () => {

                    window.location.href =
                        `product.html?id=${product.id}`;

                }
            );


            // Make card clickable

            card.style.cursor = "pointer";


            // Add card to collection

            collectionGrid.appendChild(card);

        });

    })


    .catch(error => {

        console.error(
            "Error loading products:",
            error
        );

    });