let ratingStars = document.querySelectorAll(".star-rating span");
let ratingInput = document.getElementById("rating");

ratingStars.forEach(star => {
    star.addEventListener("click", () => {
        let value = parseInt(star.getAttribute("data-star"));
        ratingInput.value = value;

        ratingStars.forEach(s => s.classList.remove("active"));
        for (let i = 0; i < value; i++) {
            ratingStars[i].classList.add("active");
        }
    });
});

document.getElementById("reviewForm").addEventListener("submit", function(e) {
    e.preventDefault();
    
    let name = document.getElementById("name").value;
    let review = document.getElementById("reviewText").value;
    let rating = ratingInput.value;

    if (!rating) {
        alert("Please provide a rating.");
        return;
    }

    let newReview = {
        name: name,
        review: review,
        rating: rating
    };

    let reviews = JSON.parse(localStorage.getItem("reviews")) || [];
    reviews.push(newReview);
    localStorage.setItem("reviews", JSON.stringify(reviews));

    alert("Review submitted successfully!");
    window.location.href = "index.html";
});
