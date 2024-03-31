
function submitReview() {
    const rating = document.querySelector('input[name="rating"]:checked');
    const reviewText = document.getElementById('review-text').value;

    if (rating) {
        const reviewData = {
            rating: rating.value,
            reviewText: reviewText
        };

        saveReview(reviewData);
        displayReviews();
        clearForm();
    } else {
        alert("Please select a rating");
    }
}

function saveReview(reviewData) {
    const existingReviews = JSON.parse(localStorage.getItem('reviews')) || [];
    existingReviews.push(reviewData);
    localStorage.setItem('reviews', JSON.stringify(existingReviews));
}

function clearForm() {
    document.querySelector('input[name="rating"]:checked').checked = false;
    document.getElementById('review-text').value = '';
}

function displayReviews() {
    const reviewsContainer = document.getElementById('reviews-list');
    reviewsContainer.innerHTML = '';

    const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
    reviews.forEach((review, index) => {
        const reviewElement = document.createElement('div');
        reviewElement.classList.add('review');
        reviewElement.innerHTML = `
            <div class="stars">${getStars(review.rating)}</div>
            <p><strong>ביקורת:</strong> ${review.reviewText}</p>
        `;
        reviewsContainer.appendChild(reviewElement);
    });
}

function getStars(rating) {
    const stars = Array.from({ length: parseInt(rating, 10) }, (_, index) => index + 1);
    return stars.map(() => '<span class="star">☆</span>').join('');
}

displayReviews();

module.exports = { submitReview, saveReview, clearForm, displayReviews, getStars };
