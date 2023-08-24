import { defineStore } from 'pinia'
export const useBrandStore = defineStore('brand', {
  state: () => ({
    brandList: [],
    curBrand: {}
  }),
  getters: {
    otherBrands(state) {
      return state.brandList.filter((e) => e.id !== state.curBrand.id)
    }
  },
  actions: {
    changeBrand(brandId) {
      this.curBrand = this.brandList.find((e) => e.id === brandId)
    }
  }
})
