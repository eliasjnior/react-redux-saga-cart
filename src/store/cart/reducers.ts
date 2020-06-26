import produce from 'immer'

import {
  ADD_PRODUCT,
  CartActionTypes,
  CartState,
  REMOVE_PRODUCT,
} from './types'

const initialState: CartState = {
  error: false,
  loading: false,
  items: [],
}

export function cartReducer(
  state = initialState,
  action: CartActionTypes,
): CartState {
  switch (action.type) {
    case ADD_PRODUCT:
      return produce(state, (draftState) => {
        const foundItem = draftState.items.find(
          (item) => item.product.id === action.product.id,
        )
        if (foundItem) {
          foundItem.quantity += 1
          foundItem.lineTotal = foundItem.product.price * foundItem.quantity
        } else {
          draftState.items.push({
            quantity: 1,
            product: action.product,
            lineTotal: action.product.price,
          })
        }
      })
    case REMOVE_PRODUCT:
      return produce(state, (draftState) => {
        const foundItem = draftState.items.find(
          (item) => item.product.id === action.product.id,
        )

        if (foundItem) {
          if (foundItem.quantity < 2) {
            draftState.items.splice(draftState.items.indexOf(foundItem), 1)
          } else {
            foundItem.quantity -= 1
          }
        }

        return draftState
      })
    default:
      return state
  }
}
