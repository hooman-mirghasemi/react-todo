import { useRef, useState } from "react"

export default function StopWatch() {
    const [startTime, setStartTime] = useState(null);
    const [now, setNow] = useState(null);
    const intevalRef = useRef(null);

    const handelStart = () => {
        setStartTime(Date.now());
        setNow(Date.now());

        intevalRef.current = setInterval(() => {
            setNow(Date.now());
        }, 10);

    };

    const stopWatch = () => {
        clearInterval(intevalRef.current);
        intevalRef.current = null;
    }


    let secoundPassed = 0;
    if (startTime != null && now != null) {
        secoundPassed = (now - startTime) / 100;
    }

    return (
            <div className="flex items-center justify-center h-screen">
                <div className="space-y-2">
                    <div className="text-xl font-bold">Stop Watch: {secoundPassed}</div>
                
                    <div className="flex items-center space-x-2">
                        <button 
                            onClick={handelStart}
                            className="border border-gray-200 px-4 py-2 bg-gray-100 rounded">Start</button>
                        <button 
                            onClick={stopWatch}
                            className="border border-gray-200 px-4 py-2 bg-gray-100 rounded">Stop</button>
                    </div>
                </div>
            </div>
    )
}