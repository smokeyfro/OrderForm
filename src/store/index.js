import Vue from 'vue'
import Vuex from 'vuex'
import * as types from './mutation-types'
import Products from "~/components/Products.vue"

Vue.use(Vuex)
Vue.use(Products)

const debug = process.env.NODE_ENV !== 'production'

// initial state
const state = {
  added: [],
  all: []
}

// getters
const getters = {
	allProducts: state => state.all, // would need action/mutation if data fetched async
	getNumberOfProducts: state => (state.all) ? state.all.length : 0,
	cartProducts: state => {
		return state.added.map(({ id, quantity }) => {
			const product = state.all.find(product => product.id === id)

			return {
				name: product.name,
				price: product.price,
				quantity
			}
		})
	}
}

// actions
const actions = {
	addToCart({ commit }, product){
		commit(types.ADD_TO_CART, {
			id: product.id
		})
	}
}

// mutations
const mutations = {

	[types.ADD_TO_CART] (state, { id }) {
	    const record = state.added.find(p => p.id === id)

	    if (!record) {
	      state.added.push({
	        id,
	        quantity: 1
	      })
	    } else {
	      record.quantity++
	    }
      },
      
      setItems(state, items) {
        state.items = items
      }
}

// one store for entire application
export default new Vuex.Store({
	state,
	strict: debug,
	getters,
	actions,
	mutations
})
