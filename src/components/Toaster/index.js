import { Toaster as HotToaster } from 'react-hot-toast'

import { Colours } from 'constants/Branding'

const Toaster = () => (
    <HotToaster
        toastOptions={{
            success: {
                style: {
                    background: Colours.Primary,
                    color: Colours.Primary,
                },
            },
            error: {
                style: {
                    background: Colours.Danger,
                    color: Colours.White,
                },
            },
        }}
    />
)

export default Toaster
