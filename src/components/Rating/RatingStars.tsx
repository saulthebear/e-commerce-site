import React from 'react';
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs';

const createComponentArray = (
  count: number,
  element: React.ReactNode,
  keyStart: number
) => {
  if (count <= 0) {
    return [];
  }

  return [...Array(count)].map((_, index) => (
    <div key={index + keyStart}>{element}</div>
  ));
};

const RatingStars: React.FC<{ rating: number }> = ({ rating }) => {
  const roundedRating = Math.round(rating * 2) / 2;
  const fullStarCount = Math.floor(roundedRating);
  const hasHalfStar = roundedRating % 1 !== 0;
  const emptyStarCount = 5 - fullStarCount - (hasHalfStar ? 1 : 0);
  const fullStars = createComponentArray(fullStarCount, <BsStarFill />, 0);
  const emptyStars = createComponentArray(
    emptyStarCount,
    <BsStar />,
    hasHalfStar ? fullStarCount + 1 : fullStarCount
  );
  let stars = [];
  if (hasHalfStar) {
    stars = [
      ...fullStars,
      <div key="halfStar">
        <BsStarHalf />
      </div>,
      ...emptyStars,
    ];
  } else {
    stars = [...fullStars, ...emptyStars];
  }
  return <div className="flex">{stars}</div>;
};

export default RatingStars;
