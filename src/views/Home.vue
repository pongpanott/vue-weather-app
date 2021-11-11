<template>
  <c-box :class="changeBackground()" h="100vh" p="2">
    <c-stack maxW="sm" mx="auto">
      <c-box mt="24">
        <c-input
          type="text"
          placeholder="search location"
          variant="outline"
          size="md"
          v-model="query"
          @keypress="fetchWeather"
        />
      </c-box>
      <c-box
        class="weather-box"
        mt="6"
        p="2"
        border="1px solid lightgrey"
        rounded="lg"
        shadow="md"
        v-if="weather && !notFound"
      >
        <c-text align="center" fontSize="2xl" mb="2"
          >{{ location }}, {{ country }}</c-text
        >
        <c-text align="center" mb="1">{{ date }} </c-text>
        <c-text align="center" mb="1">{{ temp }} &deg;C</c-text>
        <c-text align="center" mb="1">{{ weather }}</c-text>
      </c-box>
      <c-box v-if="notFound" mt="6">
        <c-text align="center"> Location not found ! </c-text>
      </c-box>
    </c-stack>
  </c-box>
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
    changeBackground() {
      switch (this.weather) {
        case "Clear":
        return "weather-clear-sky"
        break;
        case "Clouds":
        return "weather-cloudy"
        break;
        case "Rain":
        return "weather-rain"
        break;
        case "Snow":
        return "weather-snow"
        break;
        case "Atmosphere":
        return "weather-atmosphere"
        break;
        default:
        return "weather-not-found"
        break;
      }
    }
  },
}
</script>

<style scoped>
.weather-clear-sky {
  background: linear-gradient(
    to bottom,
    #ffffff,
    #ecf1ff,
    #cfe5ff,
    #a5ddff,
    #6dd5fa
  );
}
.weather-cloudy {
  background: linear-gradient(
    to bottom,
    #ffffff,
    #faf9fa,
    #f6f4f4,
    #f2eeed,
    #ece9e6
  );
}
.weather-rain {
  background: linear-gradient(
    to bottom,
    #485563,
    #3d3e4a,
    #2e2a31,
    #1c181b,
    #000000
  );
}
.weather-snow {
  background: linear-gradient(
    to bottom,
    #e6dada,
    #baaeb5,
    #898693,
    #56626f,
    #274046
  );
}
.weather-snow {
  background: linear-gradient(
    to bottom,
    #e6dada,
    #baaeb5,
    #898693,
    #56626f,
    #274046
  );
}
.weather-atmosphere {
  background: linear-gradient(
    to bottom,
    #e6dada,
    #baaeb5,
    #898693,
    #56626f,
    #274046
  );
}
.weather-not-found {
  background-color: #f8f8f8;
}
.weather-box {
  backdrop-filter: blugrayscaler(30%);
}
</style>
