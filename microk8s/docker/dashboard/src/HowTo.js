// import { useState, useEffect } from 'react'

const HowTo = () => {
  return (
    <div>
      <h2>HowTo</h2>
      <div className="">
        <label className="label--progressbar" htmlFor="progressbar">3/4</label>
        <progress className="progressbar" value="3" max="4" id="progressbar"></progress>
      </div>
      <div>
        Getting started... TBD
      </div>
      <div className="section">
        <div style={{ width: "100%" }}>
          <ul className="pagination">
            <li className="pagination__item">
              <a href="#noop" className="arrow arrow--reversed" rel="prev">Previous</a>
            </li>
            <li className="pagination__item">
              <a href="#noop" className="pagination__link">1</a>
            </li>
            <li className="pagination__item">
              <a href="#noop" className="pagination__link">2</a>
            </li>
            <li className="pagination__item">
              <span className="pagination__current">3</span>
            </li>
            <li className="pagination__item">
              <a href="#noop" className="pagination__link">4</a>
            </li>
            <li className="pagination__item">
              <a href="#noop" className="arrow" rel="next">Next</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export { HowTo as default }
