'use client'

import {ReactNode, useEffect, useState} from "react";
import axios from "axios";
import {useTelegram} from "@/components/middlewares/TelegramProvider";
import Loading from "@/components/shared/Loading";
import useDataState from "@/components/states/useDataState";


const IsTelegramWebApp = ({children}: { children: ReactNode }) => {
    const {webApp} = useTelegram();
    
    const synchronizationData = useDataState(state => state.synchronizationData);
    
    const [_get, _setGet] = useState(false);
    const [_fatalError, _setFatalError] = useState(true);

    // function getData() {
    //     axios.get(`/api/userData?${webApp?.initData}`).then(result => uploadData(result.data)).then(res => _setFatalError(false)).catch(reason => _setFatalError(true))
    //
    //     setTimeout(() => {
    //         getData()
    //     }, 100000)
    // }

    if (!webApp?.initData) {
        return <Loading/>;
    }

    if (!_get) {
        synchronizationData(webApp?.initData as string, () => {
            _setFatalError(false)
            _setGet(true)
        })
    }

    return (
        <>
            {!_fatalError ? children : <Loading/>}
        </>
    );
};

export default IsTelegramWebApp;