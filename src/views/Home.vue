<template>
  <c-stack maxW="sm" mx="auto">
    <c-box mt="24" p="2">
      <c-input
        type="text"
        placeholder="search location"
        variant="outline"
        size="md"
        v-model="query"
        @keypress="fetchWeather"
      />
    </c-box>
    <c-box align-item="center" v-if="weather && !notFound">
      <c-text align="center">{{ location }}, {{ country }}</c-text>
      <c-text align="center">{{ date }} </c-text>
      <c-text align="center">{{ temp }} &deg;C</c-text>
      <c-text align="center">{{ weather }}</c-text>
    </c-box>
    <c-box v-if="notFound">
      <c-text align="center"> Location not found ! </c-text>
    </c-box>
  </c-stack>
</template>

<script lang="js">
import {CStack,CBox, CInput, CText} from '@chakra-ui/vue'
import moment from 'moment'

export default {
  name: 'Home',
  components: {
    CStack,
    CBox,
    CInput,
    CText
  },
  data () {
    return {
      query:'',
      location: '',
      country: '',
      date: null,
      temp: null,
      weather: null,
      notFound: false,
    }
  },
  methods: {
    fetchWeather(e) {
      if (e.key === "Enter" && this.query !== '') {
        this.axios
        .get(`https://api.openweathermap.org/data/2.5/weather?q=${this.query}&units=metric&appid=${process.env.VUE_APP_WEATHER_APIKEY}`)
        .then(response => {
          this.notFound = false;
          this.setResults(response.data)
        }).catch(error => {
          console.log(`error`, error)
          this.locationNotFound()
        })
      }
    },
    setResults (result) {
      this.location = result.name;
      this.country = result.sys.country;
      this.weather = result.weather[0].main;
      this.date = moment(new Date()).format("dddd DD MMMM YYYY");
      this.temp = Math.floor(result.main.temp);
    },
    locationNotFound() {
      this.notFound = true;
      this.query = '';
    },
  },

}
</script>
