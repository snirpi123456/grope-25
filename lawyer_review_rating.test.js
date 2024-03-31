const { JSDOM } = require('jsdom');
const { submitReview, saveReview, clearForm, displayReviews, getStars } = require('./lawyer_review_rating');

const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
global.document = dom.window.document;

test('review form submission', () => {
  const reviewText = 'This product is great!';
  submitReviewForm(reviewText);
  
  const latestReview = getMostRecentReview();
  expect(latestReview.text).toBe(reviewText);
});

test('review display', () => {
  const review1 = createReview('Love this product!'); 
  const review2 = createReview('Does not work for me');
  
  renderReviews([review1, review2]);
  
  const displayedReviews = getRenderedReviews();
  expect(displayedReviews).toEqual([review1, review2]);
});

const star1 = document.querySelector('input[name="rating"][value="1"]');
const star2 = document.querySelector('input[name="rating"][value="2"]');
const star3 = document.querySelector('input[name="rating"][value="3"]');
const star4 = document.querySelector('input[name="rating"][value="4"]');
const star5 = document.querySelector('input[name="rating"][value="5"]');

test('clicking stars marks them', () => {

  // Click the 3rd star
  star3.click();
  
  // Star 1 and 2 should be checked
  expect(star1.checked).toBeTruthy();
  expect(star2.checked).toBeTruthy();

  // Star 3 should be checked
  expect(star3.checked).toBeTruthy();
  
  // Star 4 and 5 should not be checked
  expect(star4.checked).toBeFalsy();
  expect(star5.checked).toBeFalsy();
});

// test that checks if the review has the right amount of stars
// Helper function to get stars element for review
const getStarsFn = (review) => {
  return review.querySelector('.stars');
}

test('review displays correct stars', () => {
  // Create review with 5 stars
  const fiveStarReview = createReview('Amazing!', 5);
  
  // Render review
  renderReview(fiveStarReview);
  
  // Get stars element
  const starsEl = getStarsFn(fiveStarReview);
  
  // Should have 5 star elements
  expect(starsEl.querySelectorAll('.star').length).toBe(5);

  // Create review with 3 stars
  const threeStarReview = createReview('It was okay', 3);

  // Render review
  renderReview(threeStarReview);

  // Get stars element
  const starsEl2 = getStarsFn(threeStarReview);

  // Should have 3 star elements
  expect(starsEl2.querySelectorAll('.star').length).toBe(3);
});
