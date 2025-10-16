import { useEffect } from "react";

function useOnCLickOutSide( ref : any, handler : (event: any)=>void) {
    useEffect(()=> {
        const Listener = (event : any)=> {

            // do noting if the ref element or descendent element
            if(!ref.current || ref.current.contains(event.target)) {
                return;
            }

            //calling the event if it is outside the element
            handler(event);
        };

        //blinding the event listener
        document.addEventListener("mousedown", Listener);
        document.addEventListener("touchstart", Listener);

        // now cleaning up the event listener on unmount
        return ()=>{
            document.removeEventListener("mousedown", Listener);
            document.removeEventListener("touchstart", Listener);
        };
    }, [ref, handler]);
}

export default useOnCLickOutSide;