import React from 'react'
import { useGLTF } from '@react-three/drei'

export default function Castle(props) {
  const { nodes, materials } = useGLTF('/model/terrain/castle.glb')
  return (
    <group {...props} dispose={null} frustumCulled={false}>
      <group rotation={[-Math.PI / 2, 0, 0]} >
        <group rotation={[Math.PI / 2, 0, 0]}>
          <group rotation={[-Math.PI / 2, 0, -Math.PI / 2]} >
            <mesh geometry={nodes.meshNode_Material_u1_v1_0.geometry} material={materials.Material_u1_v1} />
            <mesh geometry={nodes.meshNode_Material_u1_v1_0_1.geometry} material={materials.Material_u1_v1} />
            <mesh geometry={nodes.meshNode_Material_u1_v1_0_2.geometry} material={materials.Material_u1_v1} />
            <mesh geometry={nodes.meshNode_Material_u1_v1_0_3.geometry} material={materials.Material_u1_v1} />
            <mesh geometry={nodes.meshNode_Material_u1_v1_0_4.geometry} material={materials.Material_u1_v1} />
            <mesh geometry={nodes.meshNode_Material_u1_v1_0_5.geometry} material={materials.Material_u1_v1} />
            <mesh geometry={nodes.meshNode_Material_u1_v1_0_6.geometry} material={materials.Material_u1_v1} />
            <mesh geometry={nodes.meshNode_Material_u1_v1_0_7.geometry} material={materials.Material_u1_v1} />
            <mesh geometry={nodes.meshNode_Material_u1_v1_0_8.geometry} material={materials.Material_u1_v1} />
            <mesh geometry={nodes.meshNode_Material_u1_v1_0_9.geometry} material={materials.Material_u1_v1} />
            <mesh geometry={nodes.meshNode_Material_u1_v1_0_10.geometry} material={materials.Material_u1_v1} />
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/model/terrain/castle.glb')
