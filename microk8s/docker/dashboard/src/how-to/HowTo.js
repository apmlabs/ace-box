import React, { useState } from 'react'

import Preface from './Preface'
import WrapUp from './WrapUp'
import StepOne from './StepOne'

const HowToStepper = ({ activeChildIndex, setActiveChildIndex, children }) => {
  const allChildren = React.Children.toArray(children)

  const setChild = (childIndex) => {
    setActiveChildIndex(childIndex)
  }

  const setPreviousChild = () => {
    const indexOfNewChild = activeChildIndex - 1
    const isIndexAllowed = indexOfNewChild >= 0 && indexOfNewChild < allChildren.length
    
    if (isIndexAllowed) {
      setActiveChildIndex(indexOfNewChild)
    }
  }

  const setNextChild = () => {
    const indexOfNewChild = activeChildIndex + 1
    const isIndexAllowed = indexOfNewChild >= 0 && indexOfNewChild < allChildren.length
    
    if (isIndexAllowed) {
      setActiveChildIndex(indexOfNewChild)
    }
  }

  return (
    <>
      <div className="section">
        {allChildren[activeChildIndex]}
      </div>
      <div style={{ width: "100%", position: "fixed", bottom: "10px" , left: "0", right: "0" }}>
        <ul className="pagination">
          <li className="pagination__item">
            <div
              className="arrow arrow--reversed"
              style={{ cursor: "pointer" }}
              rel="prev"
              onClick={() => setPreviousChild()}
            >
              Previous
            </div>
          </li>
          {
            allChildren.map((children, key) => {
              const isActive = key === activeChildIndex

              return (
                <li key={key} className="pagination__item">
                  <div
                    className={isActive ? "pagination__current" : "pagination__link"}
                    style={{ cursor: "pointer" }}
                    onClick={() => setChild(key)}
                  >
                    {key+1}
                  </div>
                </li>
              )
            })
          }
          <li className="pagination__item">
            <div
              className="arrow"
              style={{ cursor: "pointer" }}
              rel="next"
              onClick={() => setNextChild()}
            >
              Next
            </div>
          </li>
        </ul>
      </div>
    </>
  )
}

const HowTo = () => {
  const [activeChildIndex, setActiveChildIndex] = useState(0)

  return (
    <div>
      <h2>How-To</h2>
      <HowToStepper
        activeChildIndex={activeChildIndex}
        setActiveChildIndex={setActiveChildIndex}
      >
        <Preface />
        <StepOne />
        <WrapUp />
      </HowToStepper>
    </div>
  )
}

export { HowTo as default }
