const apiHost = 'https://bakesaleforgood.com'

export default {
  async fetchInitial() {
    try {
      let res = await fetch(apiHost + '/api/deals');
      let resJson = await res.json();
      return resJson;
    } catch(err) {
      console.log('err', err)
    }
  },
  priceInDollar(priceInCents) {
    return `$${priceInCents/100}`
  }
}