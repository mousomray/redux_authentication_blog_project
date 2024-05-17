import React from 'react'
import { Hourglass } from 'react-loader-spinner'

const Loader = () => {
    return (
        <>
            <Hourglass
                visible={true}
                height="35"
                width="35"
                ariaLabel="hourglass-loading"
                wrapperStyle={{}}
                wrapperClass=""
                colors={['white', 'white']}
            />
        </>
    )
}

export default Loader