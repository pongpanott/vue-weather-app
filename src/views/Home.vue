<template>
  <c-stack maxW="sm" mx="auto">
    <c-input
      type="text"
      placeholder="search"
      variant="outline"
      size="sm"
    ></c-input>

    <c-box border="1px solid">
      <c-text>location</c-text>
      <c-text>date</c-text>
      <c-text>temp</c-text>
      <c-text>description</c-text>
    </c-box>
  </c-stack>
</template>

<script lang="js">
import {CStack,CBox, CInput, CText} from '@chakra-ui/vue'

export default {
  name: 'Home',
  components: {
    CStack,
    CBox,
    CInput,
    CText
  },
  data() {
    return {
      message: 'Hello Vue!',
    }
  },
}
</script>
