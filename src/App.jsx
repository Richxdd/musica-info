import axios from 'axios'
import { useState,useEffect } from 'react'
import Cancion from './components/Cancion'
import Formulario from './components/Formulario'
import Info from './components/Info'

function App() {
 
const [Busquedaletra,setBusquedaletra] = useState({})
const [letra,setLetra] = useState('')
const [info,setInfo] = useState({})

useEffect (()=>{

  if(Object.keys(Busquedaletra).length===0)return

  const consultarAPI = async() => {

    const {artista,cancion} = Busquedaletra
    const url = `https://api.lyrics.ovh/v1/${artista}/${cancion}`
    const url2 = `https://theaudiodb.com/api/v1/json/2/search.php?s=${artista}`

    const [letra,informacion] = await Promise.all([
      axios(url),
      axios(url2)
    ])

    setInfo(informacion.data.artists[0]);

    setLetra(letra.data.lyrics);
  }
  consultarAPI()
  
},[Busquedaletra,info])


  return (
    <>
      <Formulario setBusquedaletra={setBusquedaletra} />
      <div className='container mt-5 '>
        <div className='row'>
          <div className='col-md-6'>
            <Info info={info}/>
          </div>
          <div className='col-md-6'>
            <Cancion letra={letra}/>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
