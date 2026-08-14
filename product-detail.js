const params =
    new URLSearchParams(
        window.location.search
    );

const productId =
    Number(
        params.get("id")
    );

fetch("products.json")

    .then(response => response.json())

    .then(products => {

        // FIND PRODUCT

        const product =
            products.find(
                product =>
                    product.id === productId
            );


        const productDetail =
            document.getElementById(
                "productDetail"
            );


        // PRODUCT NOT FOUND

        if (!product) {

            productDetail.innerHTML = `

                <div class="product-not-found">

                    <h2>
                        Product not found
                    </h2>

                    <a href="index.html#collection">
                        Back to Collection
                    </a>

                </div>

            `;

            return;
        }


        // ==================================
        // CREATE PRODUCT INFORMATION
        // ==================================

        let detailsHTML = "";


        Object.entries(product)
            .forEach(([key, value]) => {


                // Don't display ID or images

                if (
                    key === "id" ||
                    key === "Images" ||
                    key === "Name" ||
                    key === "Price"
                ) {

                    return;

                }


                // ==================================
                // MEASUREMENTS
                // ==================================

                if (
                    key === "Measurements" &&
                    typeof value === "object"
                ) {


                    let measurementsHTML = "";


                    Object.entries(value)
                        .forEach(
                            ([measurement, measurementValue]) => {


                                measurementsHTML += `

                                    <div
                                        class="measurement-row"
                                    >

                                        <span
                                            class="measurement-name"
                                        >
                                            ${measurement}
                                        </span>


                                        <span
                                            class="measurement-value"
                                        >
                                            ${measurementValue}
                                        </span>

                                    </div>

                                `;

                            }
                        );


                    detailsHTML += `

                        <div
                            class="product-section"
                        >

                            <h2>
                                Measurements
                            </h2>


                            <div
                                class="measurements-list"
                            >

                                ${measurementsHTML}

                            </div>

                        </div>

                    `;

                }


                // ==================================
                // OTHER INFORMATION
                // ==================================

                else {


                    detailsHTML += `

                        <div
                            class="product-detail-item"
                        >

                            <span
                                class="detail-label"
                            >
                                ${key}
                            </span>


                            <span
                                class="detail-value"
                            >
                                ${value}
                            </span>

                        </div>

                    `;

                }

            });


        // ==================================
        // PRODUCT PAGE
        // ==================================

        productDetail.innerHTML = `


            <!-- =========================
                 LEFT SIDE
            ========================== -->

            <div class="product-gallery">


                <div
                    class="main-image-container"
                >


                    <button
                        class="gallery-arrow left-arrow"
                        aria-label="Previous image"
                    >
                        &#10094;
                    </button>


                    <img
                        src="${product.Images[0]}"
                        alt="${product.Name}"
                        id="mainProductImage"
                        class="main-product-image"
                    >


                    <button
                        class="gallery-arrow right-arrow"
                        aria-label="Next image"
                    >
                        &#10095;
                    </button>


                </div>


                <!-- THUMBNAILS -->

                <div
                    class="product-thumbnails"
                >

                    ${product.Images
                .map(
                    (image, index) => `

                            <img
                                src="${image}"
                                alt="${product.Name}"
                                class="
                                    product-thumbnail
                                    ${index === 0
                            ? "active"
                            : ""
                        }
                                "
                                data-index="${index}"
                            >

                        `
                )
                .join("")}

                </div>


            </div>


            <!-- =========================
                 RIGHT SIDE
            ========================== -->

            <div
                class="product-information"
            >


                <h1>
                    ${product.Name}
                </h1>


                <p
                    class="product-detail-price"
                >
                    ₹${product.Price} <span>(1st Day Rent)</span>
                </p>


                <div
                    class="all-product-details"
                >

                    ${detailsHTML}

                </div>


                <!-- =========================
                     RENT BUTTON
                ========================== -->

                <button
                    class="rent-btn"
                    id="rentBtn"
                    type="button"
                >
                    Rent This Item
                </button>


            </div>

        `;


        // ==================================
        // RENT BUTTON / WHATSAPP
        // ==================================

        const rentBtn =
            document.getElementById(
                "rentBtn"
            );


        rentBtn.addEventListener(
            "click",
            () => {

                // Replace XXXXXX with your
                // WhatsApp number later.
                // Include country code.
                // Example for India:
                // 919876543210

                const whatsappNumber =
                    "918143388549";


                const productName =
                    product.Name;


                const productLink =
                    window.location.href;


                const message =
                    `Hi! I want to rent this item: ${productName}

Product link: ${productLink}`;


                const whatsappURL =
                    `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;


                window.open(
                    whatsappURL,
                    "_blank"
                );

            }
        );


        // ==================================
        // IMAGE ELEMENTS
        // ==================================

        const mainImage =
            document.getElementById(
                "mainProductImage"
            );


        const thumbnails =
            document.querySelectorAll(
                ".product-thumbnail"
            );


        const leftArrow =
            document.querySelector(
                ".left-arrow"
            );


        const rightArrow =
            document.querySelector(
                ".right-arrow"
            );


        let currentImage = 0;


        // ==================================
        // SHOW IMAGE
        // ==================================

        function showImage(index) {


            if (index < 0) {

                index =
                    product.Images.length - 1;

            }


            if (
                index >=
                product.Images.length
            ) {

                index = 0;

            }


            currentImage = index;


            mainImage.src =
                product.Images[currentImage];


            thumbnails.forEach(
                thumbnail => {

                    thumbnail.classList
                        .remove("active");

                }
            );


            thumbnails[currentImage]
                .classList
                .add("active");

        }


        // ==================================
        // LEFT ARROW
        // ==================================

        leftArrow.addEventListener(
            "click",
            () => {

                showImage(
                    currentImage - 1
                );

            }
        );


        // ==================================
        // RIGHT ARROW
        // ==================================

        rightArrow.addEventListener(
            "click",
            () => {

                showImage(
                    currentImage + 1
                );

            }
        );


        // ==================================
        // THUMBNAILS
        // ==================================

        thumbnails.forEach(
            thumbnail => {

                thumbnail.addEventListener(
                    "click",
                    () => {

                        const index =
                            Number(
                                thumbnail
                                    .dataset
                                    .index
                            );


                        showImage(index);

                    }
                );

            }
        );


    })


    .catch(error => {

        console.error(
            "Error loading product:",
            error
        );

    });