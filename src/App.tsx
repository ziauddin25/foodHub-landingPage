import './App.css'
import BestChef from './components/BestChef'
import BestFood from './components/BestFood'
import Footer from './components/Footer'
import Gallery from './components/Gallery'
import Hero from './components/Hero'
import OurMenu from './components/OurMenu'
import SpecialDish from './components/SpecialDish'

function App() {

  return (
    <>
      <Hero />
      <SpecialDish />
      <BestFood />
      <BestChef />
      <OurMenu />
      <Gallery />
      <Footer />
    </>
  )
}

export default App
