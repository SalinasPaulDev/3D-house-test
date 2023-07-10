import { Suspense, useEffect, useMemo, useState } from 'react'
import React, { useRef } from 'react'

import { ContactShadows, OrbitControls, useGLTF } from '@react-three/drei'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import CameraControls from 'camera-controls'
CameraControls.install({ THREE })


export function Model(props) {
  const {frontClicked, rightClicked, leftClicked, backClicked} = props

  const { nodes, materials } = useGLTF('/Barn_Testing.glb')
  return (
    <group {...props} dispose={null}>
      <group scale={[0.008, 0.011, 0.01]} >
        <mesh geometry={nodes.Mesh.geometry} material-color={backClicked ? 'red' : '#d9d5d4'}/>
        <mesh geometry={nodes.Mesh_1.geometry} material={materials.Siding_BoardandBatten} />
        <mesh geometry={nodes.Mesh_2.geometry} material={materials.Roofing_Shingles_DesertTan} />
        <mesh geometry={nodes.Mesh_3.geometry} material={materials.Wood_Trim_Interior} />
        <mesh geometry={nodes.Mesh_4.geometry} material={materials.Wood_InteriorFloor} />
        <mesh geometry={nodes.Mesh_5.geometry} material={materials.Wood_Trim} />
        <mesh geometry={nodes.Mesh_6.geometry} material={materials.Metal_Interior} />
        <mesh geometry={nodes.Mesh_7.geometry} material={materials.Metal_Exterior} />
      </group>
      <group scale={[0.008, 0.011, 0.01]} >
        <mesh geometry={nodes.Mesh001.geometry} material={materials.Wood_Trim_Interior}/>
        <mesh geometry={nodes.Mesh001_1.geometry} material={materials.Wood_Interior} />
        <mesh geometry={nodes.Mesh001_2.geometry} material={materials.Wood_Trim} />
        <mesh geometry={nodes.LoftedBarn_6Wall_10x12_None_Wall1.geometry} material-color={backClicked ? 'red' : '#d9d5d4'}/>
        <mesh geometry={nodes.LoftedBarn_6Wall_10x12_None_Wall2.geometry}  material-color={rightClicked ? 'red' : '#d9d5d4'}/>
        <mesh geometry={nodes.LoftedBarn_6Wall_10x12_None_Wall3.geometry} material-color={frontClicked ? 'red' : '#d9d5d4'} />
        <mesh geometry={nodes.LoftedBarn_6Wall_10x12_None_Wall4.geometry} material-color={leftClicked ? 'red': '#d9d5d4'}/>
      </group>
    </group>
  )
}

useGLTF.preload('/Barn_Testing.glb')


const Controls = ({focus, pos = new THREE.Vector3(), look = new THREE.Vector3()}) => {
  const camera = useThree(state => state.camera)
  const gl = useThree((state) => state.gl)
  const controls = useMemo(() => new CameraControls(camera, gl.domElement), [])
  return useFrame((state, delta) => {
    pos.set(focus.x,focus.y, focus.z - 2)
    state.camera.position.lerp(pos, 0.5)
    state.camera.updateProjectionMatrix()
    controls.setLookAt(state.camera.position.x, state.camera.position.y, state.camera.position.z, look.x, look.y, look.z, true)
    return controls.update(delta)
  })
}

const CAMERA_FOCUSES = {
  FRONT: 'front',
  BACK: 'back',
  LEFT: 'left',
  RIGHT: 'right',
  NONE: 'none'
}

function App() {
  const [frontClicked, setFrontClicked] = useState(false)
  const [leftClicked, setLeftClicked] = useState(false)
  const [rightClicked, setRightClicked] = useState(false)
  const [backClicked, setBackClicked] = useState(false)
  const [cameraV3, setCameraV3] = useState({x:0,y:15,z:25})
  const [cameraFocused, setCameraFocused] = useState(CAMERA_FOCUSES.NONE)




  return (
    <div style={{height: '100vh' }}> 
    <div style={{display: 'flex', gap: 15}}>
      <button onClick={(e) => {
        setLeftClicked(false)
        setRightClicked(false)
        setBackClicked(false)
        setFrontClicked(true)
        setCameraV3({x:0,y:5,z:25})
      }}>Front</button>
      <button onClick={(e) => {
        setBackClicked(false)
        setFrontClicked(false)
        setRightClicked(false)
        setLeftClicked(true)
        setCameraV3({x: -20, y: 5, z: 10})
        }}>Left</button>
      <button onClick={(e) => {
        setLeftClicked(false)
        setBackClicked(false)
        setFrontClicked(false)
        setRightClicked(true)
        setCameraV3({x:25,y:5,z:10})
        }}>Right</button>
      <button onClick={(e) => {
        setLeftClicked(false)
        setFrontClicked(false)
        setRightClicked(false)
        setBackClicked(true)
        setCameraV3({x:15,y:5,z:-15})
        }}>Back</button>
    </div>
      <Canvas camera={{ position: [0,5,25], fov: 20 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} />
          <Model frontClicked={frontClicked} leftClicked={leftClicked} rightClicked={rightClicked} backClicked={backClicked} />
          <Controls focus={cameraV3}/>
          <ContactShadows frames={1} position={[0, -0.5, 0]} blur={1} opacity={0.75} />
          <ContactShadows frames={1} position={[0, -0.5, 0]} blur={3} color="grey" />
          <OrbitControls minPolarAngle={0} maxPolarAngle={Math.PI} />
      </Canvas>
    </div>
  )
}

export default App
