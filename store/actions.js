export default {
  initFacets({ commit, state }) {
    const id = []
    const name = []
    const email = []
    const gender = []
    const country = []
    const latitude = []
    const longitude = []
    const imageUrl = []
    const color = []
    const date = []
    const address = []
    const city = []

    state.fullFeatures.forEach((people) => {
      id.push(people.id)
      name.push(people.name)
      email.push(people.email)
      gender.push(people.gender)
      country.push(people.country)
      latitude.push(people.latitude)
      longitude.push(people.longitude)
      imageUrl.push(people.image_url)
      color.push(people.color)
      date.push(people.date)
      address.push(people.pushress)
      city.push(people.city)
    })

    const facets = {
      id,
      name,
      email,
      gender,
      country,
      latitude,
      longitude,
      imageUrl,
      color,
      date,
      address,
      city,
    }

    commit('setFacets', facets)
  },

  filterResults({ commit, state }) {
    const filteredFeatures = state.fullFeatures.filter((people) => {
      const filters = state.filters
      const facetNames = Object.keys(filters)

      for (const facetName of facetNames) {
        if (
          filters[facetName].length > 0 &&
          filters[facetName].includes(people[facetName]) === false
        ) {
          return false
        } else {
          continue
        }
      }
      return true
    })
    commit('setCurrentFeatures', filteredFeatures)
  },
  regsiterFilter({ commit, state }, payload) {
    commit('setFilters', {
      ...state.filters,
      [payload.newFilterName]: [],
    })
  },

  updateFilter({ commit, state }, payload) {
    commit('setFilters', {
      ...state.filters,
      [payload.filterName]: payload.filterOptions,
    })
  },
}
