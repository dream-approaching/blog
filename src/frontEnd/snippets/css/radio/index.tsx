import React from 'react';
import './index.less';

export default function Radio() {
  return (
    <div>
      <div className="radio-container">
        <input className="radio-input" id="radio-input-apples" type="radio" name="fruit" />
        <label className="radio" htmlFor="radio-input-apples">
          Apples
        </label>
        <input className="radio-input" id="radio-input-oranges" type="radio" name="fruit" />
        <label className="radio" htmlFor="radio-input-oranges">
          Oranges
        </label>
      </div>
    </div>
  );
}
