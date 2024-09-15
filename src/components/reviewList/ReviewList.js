import React from 'react';
import {ReviewItem} from "../reviewItem/ReviewItem";


export function ReviewList({ reviews }) {
    return (
        <div className="review-wrapper">
            <div className="space-between-for-two-components">
                <h3>Reviews</h3>
                <i className="bi bi-plus-circle"></i>
            </div>
            {reviews.map((review, index) => (
                <ReviewItem
                    key={index}
                    username={review.username}
                    date={review.date}
                    reviewText={review.reviewText}
                    rating={review.rating}
                />
            ))}
        </div>
    );
}