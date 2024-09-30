import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';

export const Rating = ({ rate }) => {
  return (
    <div>
      {[...Array(5)].map((_, i) => {
        const index = i + 1;
        let icon;
        if (index <= Math.floor(rate)) icon = faStar;
        else if (rate > i && rate < index + 1) icon = faStarHalfAlt;
        else icon = farStar;

        return (
          <span key={i}>
            <FontAwesomeIcon 
              icon={icon} 
              style={{ color: '#FFD700' }}
            />
          </span>
        );
      })}
      <span className="mx-1"style={{ color: '#FFD700' }}>{rate.toFixed(1)}</span>
    </div>
  );
};
