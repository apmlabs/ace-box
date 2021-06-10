import Nav from './Nav'
import Preview from './Preview'
import AceBoxLinks from './AceBoxLinks'
import HowTo from './HowTo'

const App = () =>
  <div>
    <Nav />
    <main>
      <div className="layout__container">
        <div className="island">
          <AceBoxLinks />
        </div>
      </div>
      <div className="layout__container">
        <div className="island">
          <Preview />
        </div>
      </div>
      <div className="layout__container">
        <div className="island">
          <HowTo />
        </div>
      </div>
    </main>
  </div>

export { App as default }
