const { saveReview, displayReviews } = require('./review'); 

describe('review.html', () => {

  beforeEach(() => {
    document.body.innerHTML = '';  
  });

  test('saves and displays a review', () => {
    
    // Arrange
    const review = {
      rating: 5,
      text: 'Great product!'
    };

    // Act 
    saveReview(review);
    displayReviews();
    
    // Assert
    expect(document.body.innerHTML).toContain(review.text);
    expect(document.body.innerHTML).toContain(review.rating);
  });

});
