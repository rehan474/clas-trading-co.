<script setup lang="ts">
import {useLoop} from '@tresjs/core'
import {Shape,type Group} from 'three'
const group=shallowRef<Group>()
const shirt=new Shape()
shirt.moveTo(-.38,.9);shirt.lineTo(-.8,.7);shirt.lineTo(-1.12,.2);shirt.lineTo(-.72,-.03);shirt.lineTo(-.52,.27);shirt.lineTo(-.52,-.88);shirt.quadraticCurveTo(0,-1,.52,-.88);shirt.lineTo(.52,.27);shirt.lineTo(.72,-.03);shirt.lineTo(1.12,.2);shirt.lineTo(.8,.7);shirt.lineTo(.38,.9);shirt.quadraticCurveTo(0,.4,-.38,.9)
const {onBeforeRender}=useLoop()
onBeforeRender(({elapsed})=>{if(group.value){group.value.rotation.y=Math.sin(elapsed*.45)*.28;group.value.rotation.z=Math.sin(elapsed*.35)*.07;group.value.position.y=Math.sin(elapsed*.7)*.09}})
</script>
<template><TresGroup ref="group" :rotation="[.05,-.15,0]"><TresMesh :position="[-.65,.15,0]" :rotation="[0,.2,-.16]"><TresExtrudeGeometry :args="[shirt,{depth:.14,bevelEnabled:true,bevelThickness:.06,bevelSize:.05,bevelSegments:3,steps:1}]"/><TresMeshStandardMaterial color="#8b3955" :roughness=".88"/></TresMesh><TresGroup :position="[1.05,-.55,.2]" :rotation="[0,-.25,.18]"><TresMesh :position="[-.22,-.2,0]"><TresBoxGeometry :args="[.42,.85,.14]"/><TresMeshStandardMaterial color="#e4bac8" :roughness=".95"/></TresMesh><TresMesh :position="[.22,-.2,0]"><TresBoxGeometry :args="[.42,.85,.14]"/><TresMeshStandardMaterial color="#e4bac8" :roughness=".95"/></TresMesh><TresMesh :position="[0,.22,0]"><TresBoxGeometry :args="[.86,.22,.17]"/><TresMeshStandardMaterial color="#60233c" :roughness=".9"/></TresMesh></TresGroup><TresMesh :position="[-.65,.05,.23]"><TresSphereGeometry :args="[.035,12,12]"/><TresMeshStandardMaterial color="#fff8f7"/></TresMesh><TresMesh :position="[-.65,-.15,.23]"><TresSphereGeometry :args="[.035,12,12]"/><TresMeshStandardMaterial color="#fff8f7"/></TresMesh></TresGroup></template>
