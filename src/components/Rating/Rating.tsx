import React from 'react';
import RatingStars from './RatingStars';

const Rating: React.FC<{
  rating: number;
  count: number;
  size?: 'small' | 'large';
}> = ({ rating, count, size = 'small' }) => {
  return (
    <div className="flex flex-col items-center">
      <RatingStars rating={rating} />
      {size === 'small' && <div>{count} reviews</div>}
      {size === 'large' && <div>Based on {count} reviews</div>}
    </div>
  );
};

export default Rating;
