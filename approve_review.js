document.addEventListener('DOMContentLoaded', function() {
    displayReviews();
});

function displayReviews() {
    const reviewList = document.getElementById('reviewList');
    reviewList.innerHTML = '';
    const reviews = JSON.parse(localStorage.getItem('reviews'));

    if (reviews) {
        reviews.forEach((review, index) => {
            const listItem = document.createElement('li');
            listItem.classList.add('review-item');

            const reviewContent = document.createElement('p');
            reviewContent.classList.add('review-content');
            reviewContent.textContent = review.reviewText; 
            listItem.appendChild(reviewContent);

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'מחק ביקורת';
            deleteButton.classList.add('delete-button');
            deleteButton.addEventListener('click', function() {
                deleteReview(index);
            });
            listItem.appendChild(deleteButton);

            reviewList.appendChild(listItem);
        });
    }
}

function deleteReview(index) {
    let reviews = JSON.parse(localStorage.getItem('reviews'));

    reviews.splice(index, 1);

    localStorage.setItem('reviews', JSON.stringify(reviews));

    displayReviews();
}
