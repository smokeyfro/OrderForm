const axios = require('axios')

module.exports = function (api) {

  api.loadSource(async store => {
    const { data } = await axios.get('https://gson.fayazara.now.sh/?url=https://docs.google.com/spreadsheets/d/e/2PACX-1vTZXbaVxaC2aIn6irlxZ9QYrGf-5zSw6iBqYITbQzIaN7xXCgxzUV0g-IYthlVT80IlcbyDHpY186bm/pub?output=csv')

    const contentType = store.addCollection({
      typeName: 'Product'
    })

    for (const item of data) {
      contentType.addNode({
        id: item.id,
        producer: item.producer,
        producer_id: item.producer_id,
        title: item.title,
        price: item.price,
        availability: item.availability
      })
    }
  })
}