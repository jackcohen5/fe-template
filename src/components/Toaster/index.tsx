import { Toaster as HotToaster } from "react-hot-toast"

import { Colour } from "constants/Branding"

const Toaster = () => (
    <HotToaster
        toastOptions={{
            success: {
                style: {
                    background: Colour.Primary,
                    color: Colour.Primary,
                },
            },
            error: {
                style: {
                    background: Colour.Danger,
                    color: Colour.White,
                },
            },
        }}
    />
)

export default Toaster
