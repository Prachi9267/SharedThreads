window.addEventListener("scroll", () => {

    const navbar = document.querySelector(".navbar");

    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }

});


function toggleText() {
    let text = document.getElementById("moreText");
    let btn = document.getElementById("readBtn");

    text.classList.toggle("show");

    if (text.classList.contains("show")) {
        btn.innerHTML = "Read Less";
    } else {
        btn.innerHTML = "Read More";
    }
}



reviewForm.addEventListener("submit", async function (e) {

    e.preventDefault();

    try {

        const response = await fetch("https://script.google.com/macros/s/AKfycbzZO27nArossT_1SHMppwBe0ZPLUW8qIV4QV07DPxNs6WAuZhqLV-sUcih_juTiw8jreg/exec", {
            method: "POST",
            body: JSON.stringify({
                name: document.getElementById("name").value,
                review: document.getElementById("review").value
            })
        });

        console.log(response);

        const text = await response.text();
        console.log(text);

        alert("Thank you for your review!");

        document.getElementById("reviewForm").reset();

    } catch (err) {
        console.error(err);
        alert(err.message);
    }

});