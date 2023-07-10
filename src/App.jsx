import React, { useState } from 'react'

import { ContactShadows, OrbitControls, useGLTF } from '@react-three/drei'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Controls } from './utils'
import { Model } from './components/Model'
import './style.css'
import CrossIcon from './icons/Cross'


export const CAMERA_FOCUSES = {
  FRONT: {
    title: 'Front',
    cords: {x:0,y:5,z:25}
  },
  BACK:{ 
    title: 'Back',
    cords: {x:15,y:5,z:-15}
  },
  LEFT: {
    title: 'Left',
    cords: {x: -20, y: 5, z: 10}
  
  },
  RIGHT: {
    title: 'Right',
    cords: {x:25,y:5,z:10}
  },
  NONE: {
    title:'none',
    cords: {x:0,y:15,z:25}
  
  }
}

function App() {
  const [cameraFocused, setCameraFocused] = useState(CAMERA_FOCUSES.NONE)

  return (
    <div style={{height: '100vh' }}> 
    <div className='buttonContainer'>
      <button style={{backgroundColor:cameraFocused.title === CAMERA_FOCUSES.FRONT.title ? '#08499E' : '' }} onClick={(e) => {
        setCameraFocused(CAMERA_FOCUSES.FRONT)
      }}>{CAMERA_FOCUSES.FRONT.title}</button>
      <button style={{backgroundColor: cameraFocused.title === CAMERA_FOCUSES.LEFT.title ? '#08499E' : ''}} onClick={(e) => {
        setCameraFocused(CAMERA_FOCUSES.LEFT)
        }}>{CAMERA_FOCUSES.LEFT.title}</button>
      <button style={{backgroundColor: cameraFocused.title === CAMERA_FOCUSES.RIGHT.title ? '#08499E' : ''}} onClick={(e) => {
        setCameraFocused(CAMERA_FOCUSES.RIGHT)
        }}>{CAMERA_FOCUSES.RIGHT.title}</button>
      <button style={{backgroundColor: cameraFocused.title === CAMERA_FOCUSES.BACK.title ? '#08499E' : ''}} onClick={(e) => {
        setCameraFocused(CAMERA_FOCUSES.BACK)
        }}>{CAMERA_FOCUSES.BACK.title}</button>

      <div className='cross' onClick={() => setCameraFocused(CAMERA_FOCUSES.NONE)}>
        <CrossIcon />
      </div>
        
    </div>
      <Canvas camera={{ position: [0,5,25], fov: 20 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} />
          <Model cameraFocused={cameraFocused} />
          <Controls focus={cameraFocused.cords}/>
          <ContactShadows frames={1} position={[0, -0.5, 0]} blur={1} opacity={0.75} />
          <ContactShadows frames={1} position={[0, -0.5, 0]} blur={3} color="grey" />
          <OrbitControls minPolarAngle={0} maxPolarAngle={Math.PI} />
      </Canvas>
    </div>
  )
}

export default App
