import { useEffect, useState } from 'react'
import copy from 'clipboard-copy'

const copyToClipboard = (value, setIsCopied) => {
  copy(value)
  setIsCopied(true)
}

const AceBoxCredential = ({ name, value, type }) => {
  const isSecret = type === "password"

  const [isShown, setIsShown] = useState(!isSecret)
  const [isCopied, setIsCopied] = useState(false)

  useEffect(() => {
    let timeoutId = null

    if (isCopied) {
      timeoutId = setTimeout(() => {
        setIsCopied(false)
      }, 800)
    }
    
    return () => clearTimeout(timeoutId)
  }, [isCopied])

  return (
    <div>
      <label htmlFor={name} className="label" style={{ display: "flex", width: "100%" }}>
        <div style={{ flexGrow: "1" }}>
          {name}
        </div>
        {
          isSecret &&
            <div style={{ marginLeft: "5px" }}>
              <button
                type="button"
                className="btn btn--secondary"
                style={{ border: "none", background: "none", padding: "0px", margin: "0px", height: "12px", lineHeight: "12px", fontSize: "12px" }}
                onClick={() => setIsShown(isShown => !isShown)}
              >
                {
                  isShown
                    ? "Hide"
                    : "Show"
                } 
              </button>
            </div>
        }
        <div style={{ marginLeft: "5px" }}>
          <button
            type="button"
            className="btn btn--secondary"
            style={{ border: "none", background: "none", padding: "0px", margin: "0px", height: "12px", lineHeight: "12px", fontSize: "12px" }}
            onClick={() => copyToClipboard(value, setIsCopied)}
          >
            {
              isCopied
                ? "Copied!"
                : "Copy"
            }
          </button>
        </div>
      </label>
      <input disabled type={isShown ? "text" : "password"} className="inputfield" value={value} style={{ color: "inherit" }} id={name} />
    </div>
  )
}

const AceBoxCredentials = ({ credentials }) =>
  <div style={{ display: "grid", gridTemplateColumns: "auto", rowGap: "10px" }}>
    {
      !!credentials && credentials.map((credential, key) => {
        const capitalizedName = credential.name[0].toUpperCase() + credential.name.substring(1)
        const value = credential.value
        const type = credential.type
        
        return (
          <AceBoxCredential
            key={key}
            name={capitalizedName}
            value={value}
            type={type}
          />
        )
      })
    }
  </div>

export { AceBoxCredentials as default }
