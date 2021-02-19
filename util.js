const apiHost = 'https://bakesaleforgood.com'

export default {
  async fetchInitial() {
    try {
      const res = await fetch(apiHost + '/api/deals');
      const resJson = await res.json();
      return resJson;
    } catch(err) {
      console.log('err', err)
    }
  },
  async fetchDealDetails(dealId) {
    try {
      const res = await fetch(apiHost + '/api/deals/' + dealId);
      const resJson = await res.json();
      return resJson;
    } catch(err) {
      console.log('err', err)
    }
  },
  priceInDollar(priceInCents) {
    return `$${priceInCents/100}`
  }
}