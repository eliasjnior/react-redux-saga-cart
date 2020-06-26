import React, { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import formatCurrency from '~/helpers/formatCurrency'
import { RootState } from '~/store/rootReducer'

import CartItem from './CartItem'
import { Button, Loading, Table, Updating } from './styles'

const Cart: React.FC = () => {
  const cart = useSelector((state: RootState) => state.cart)

  const dispatch = useDispatch()

  const formattedSubtotal = useMemo(() => formatCurrency(cart.subtotal), [
    cart.subtotal,
  ])

  const formattedShipping = useMemo(() => formatCurrency(cart.shipping), [
    cart.shipping,
  ])

  const formattedTotal = useMemo(() => formatCurrency(cart.total), [cart.total])

  return (
    <Table>
      <thead>
        <tr>
          <th>Product</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Line total</th>
        </tr>
      </thead>
      <tbody>
        {cart.items.length ? (
          cart.items.map((item) => (
            <CartItem key={item.product.id} item={item} />
          ))
        ) : (
          <tr>
            <td colSpan={4}>Your cart is empty</td>
          </tr>
        )}
      </tbody>
      <tfoot>
        <tr>
          <th colSpan={3} scope="row">
            Subtotal
          </th>
          <td className="price">
            {cart.loading ? <Loading /> : formattedSubtotal}
          </td>
        </tr>
        <tr>
          <th colSpan={3} scope="row">
            Shipping
          </th>
          <td className="price">
            {cart.loading ? <Loading /> : formattedShipping}
          </td>
        </tr>
        <tr>
          <th colSpan={3} scope="row">
            Total
          </th>
          <td className="price">
            {cart.loading ? <Loading /> : formattedTotal}
          </td>
        </tr>
        <tr>
          <th colSpan={4} scope="row">
            <Button onClick={() => dispatch({ type: 'CALCULATE_CART' })}>
              Calculate totals
            </Button>

            {cart.loading && <Updating>Updating...</Updating>}
          </th>
        </tr>
      </tfoot>
    </Table>
  )
}

export default Cart
