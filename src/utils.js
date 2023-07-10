import { useMemo } from 'react'
import * as THREE from 'three'
import CameraControls from 'camera-controls'
import { useFrame, useThree } from '@react-three/fiber'
CameraControls.install({ THREE })

export const Controls = ({focus, pos = new THREE.Vector3(), look = new THREE.Vector3()}) => {
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