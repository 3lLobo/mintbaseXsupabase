import { default as HeadContainer } from 'next/head'

const Head = () => {
    return (
        <div>
            <HeadContainer>
                <title>Mintbase X Supabase - by 3llobo</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </HeadContainer>
            <HeadContainer>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
                <link
                    href="https://fonts.googleapis.com/css2?family=Manjari:wght@100&display=swap"
                    rel="stylesheet"
                />
            </HeadContainer>
        </div>
    )
}

export default Head
