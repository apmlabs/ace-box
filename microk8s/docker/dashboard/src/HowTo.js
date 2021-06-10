// import { useState, useEffect } from 'react'

const HowTo = () => {
  return (
    <div>
      <h2>HowTo</h2>
      <div class="">
        <label class="label--progressbar" htmlFor="progressbar">3/4</label>
        <progress class="progressbar" value="3" max="4" id="progressbar"></progress>
      </div>
      <div>
        Getting started... TBD
      </div>
      <div className="section">
        <div style={{ width: "100%" }}>
          <ul class="pagination">
            <li class="pagination__item">
              <a href="#noop" class="arrow arrow--reversed" rel="prev">Previous</a>
            </li>
            <li class="pagination__item">
              <a href="#noop" class="pagination__link">1</a>
            </li>
            <li class="pagination__item">
              <a href="#noop" class="pagination__link">2</a>
            </li>
            <li class="pagination__item">
              <span class="pagination__current">3</span>
            </li>
            <li class="pagination__item">
              <a href="#noop" class="pagination__link">4</a>
            </li>
            <li class="pagination__item">
              <a href="#noop" class="arrow" rel="next">Next</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export { HowTo as default }
