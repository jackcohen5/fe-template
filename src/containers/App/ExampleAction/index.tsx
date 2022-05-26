import { memo } from "react"

import { ExampleContainer, MarginedButton } from "./ExampleAction.styles"

type ExampleActionProps = {
    buttonDisabled?: boolean
    buttonLabel: string
    onClick: () => void
    description: React.ReactNode
}

const ExampleAction = ({
    buttonDisabled = false,
    buttonLabel,
    onClick,
    description,
}: ExampleActionProps) => {
    return (
        <ExampleContainer>
            <MarginedButton
                ariaLabel={buttonLabel}
                disabled={buttonDisabled}
                onClick={onClick}
                type="button"
            >
                {buttonLabel}
            </MarginedButton>
            {description}
        </ExampleContainer>
    )
}

export default memo(ExampleAction)
