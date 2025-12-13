const { useState } = React

export function LongText({ text, length = 50 }) {

    const [isShown, setIsShown] = useState(false)

    function getTextToShow() {
        if (text.length < length) return text
        if (!isShown) return text.substring(0, length) + '...'
        return text
    }

    function onToggleShown() {
        setIsShown(prevIsShown => !prevIsShown)
    }

    return (
        <p>
            {getTextToShow()}
            { text.length >= length && <button onClick={onToggleShown}>{isShown ? 'Show less' : 'Show more'}</button>}
        </p>
    )
}