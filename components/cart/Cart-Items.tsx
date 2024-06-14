
import { Box, Button, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

import { FlexRow } from '../FlexRow'
import { formatToCurrency } from '../../utils/currencyFormatter'
import { useDispatch } from 'react-redux'
import { removeFromCart } from '../../store/cartSlice'
import { CartItem } from '../../types'
import { useProduct } from '../../hooks'
import CartItemLoadingSkeleton from '../Skeleton/CartItemLoader'


function CartItem({ productNumber, productId }: CartItem) {
    const { isLoading, data, error } = useProduct(productId)
    const dispatch = useDispatch()

    if (isLoading) return <CartItemLoadingSkeleton />

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                width: 'inherit',
                py: 1.8,
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <img
                    src={data?.image}
                    alt="thumbnail"
                    style={{ width: 60, height: 40, objectFit: 'cover', borderRadius: 5 }}
                />
                <div>
                    <Typography fontSize={15}>{data?.title}</Typography>
                    <Typography
                        sx={{
                            color: 'GrayText',
                            fontSize: 12,
                            textTransform: 'capitalize',
                        }}
                    >
                        {data?.countInStock} remaining
                    </Typography>
                </div>
            </Box>
            <div>
                <FlexRow
                    sx={{ alignItems: 'center', gap: 1.5, flexWrap: 'wrap-reverse' }}
                >
                    <Typography fontSize={14}>
                        {formatToCurrency(data?.price!, 'NGN')}
                    </Typography>
                    <Button
                        color="error"
                        endIcon={<CloseIcon />}
                        sx={{ textTransform: 'capitalize', fontSize: 12 }}
                        style={{ outline: 'none' }}
                        onClick={() => {
                            dispatch(removeFromCart({ productNumber }))
                        }}
                    >
                        Remove
                    </Button>
                </FlexRow>
            </div>
        </Box>
    )
}

export default CartItem
