import React from 'react';
import './index.less';

export default function Checkbox() {
  return (
    <div>
      <svg className="checkbox-symbol">
        <symbol id="check" viewBox="0 0 12 10">
          <polyline
            points="1.5 6 4.5 9 10.5 1"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
          ></polyline>
        </symbol>
      </svg>

      <div className="checkbox-container">
        <input className="checkbox-input" id="checkbox-input-apples" type="checkbox" />
        <label className="checkbox" htmlFor="checkbox-input-apples">
          <span>
            <svg width="12px" height="10px">
              <use xlinkHref="#check"></use>
            </svg>
          </span>
          <span>Apples</span>
        </label>
        <input className="checkbox-input" id="checkbox-input-oranges" type="checkbox" />
        <label className="checkbox" htmlFor="checkbox-input-oranges">
          <span>
            <svg width="12px" height="10px">
              <use xlinkHref="#check"></use>
            </svg>
          </span>
          <span>Oranges</span>
        </label>
      </div>
    </div>
  );
}
