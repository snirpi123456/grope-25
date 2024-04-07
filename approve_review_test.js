const { displayReviews, deleteReview } = require('./approve_review.js');

global.localStorage = {
  getItem: jest.fn(),
  setItem: jest.fn()
};

describe('displayReviews function', () => {
  beforeEach(() => {
    localStorage.getItem.mockClear();
    document.body.innerHTML = '<ul id="reviewList"></ul>';
  });

  test('displays reviews from localStorage', () => {
    const mockReviews = [
      { reviewText: 'Great product' },
      { reviewText: 'Terrible experience' }
    ];
    localStorage.getItem.mockReturnValueOnce(JSON.stringify(mockReviews));

    displayReviews();

    expect(document.querySelectorAll('.review-item').length).toBe(mockReviews.length);
  });

  test('displays no reviews if localStorage is empty', () => {
    localStorage.getItem.mockReturnValueOnce(null);

    displayReviews();

    expect(document.querySelectorAll('.review-item').length).toBe(0);
  });
});

describe('deleteReview function', () => {
  test('deletes review at given index', () => {
    const mockReviews = [
      { reviewText: 'Great product' },
      { reviewText: 'Terrible experience' }
    ];
    localStorage.getItem.mockReturnValueOnce(JSON.stringify(mockReviews));

    deleteReview(1); // Delete review at index 1

    const updatedReviews = JSON.parse(localStorage.setItem.mock.calls[0][1]);
    expect(updatedReviews.length).toBe(mockReviews.length - 1);
    expect(updatedReviews[1].reviewText).toBeUndefined();
  });
});
