import { Button } from "@/components/ui/button"
import Footer from "./component/Footer"
import Home from "./component/Home"
import Navbar from "./component/Navbar"
import { Toaster } from "sonner"
function App() {
  return (
    <>
      <Navbar />
      <Home />
      <Toaster />
      <Footer />

    </>
  )
}

export default App