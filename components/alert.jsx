'use client'
import styles from '@/styles/alert.module.css'
import {Button} from '@mui/joy'

//mode can be 'dev' or 'postseason' (or demo)

export function HiatusAlert(){
    function handleClose(id){
        let e = document.getElementById(id);
        e.remove();
    }
    return(
        <div className={styles.bgMask} id={`hiatus-alert`}>
        <div className={styles.alertContainer}>
            <h4 className={styles.header}>Hiatus Mode</h4>
            <hr className='line'/>
            <p>HIATUS MODE Enabled</p>
            <p>Previous records and forms are available, but new records cannot be added.</p>
            <Button onClick={()=>handleClose(`hiatus-alert`)}>Okay</Button>
        </div>   
        </div>   
    )
}

export function OffseasonAlert(){
    function handleClose(id){
        let e = document.getElementById(id);
        e.remove();
    }
    return(
        <div className={styles.bgMask}  id={`offseason-alert`}>
        <div className={styles.alertContainer}>
            <h4 className={styles.header}>Offseason Mode</h4>
            <hr className='line'/>
            <p>OFFSEASON MODE Enabled</p>
            <p>The app will use data from the previous season.</p>
            <Button onClick={()=>handleClose(`offseason-alert`)}>Okay</Button>
        </div>   
        </div>
    )
}

export function DevAlert(){
    function handleClose(id){
        let e = document.getElementById(id);
        e.remove();
    }
    return(
        <div className={styles.bgMask} id={`dev-alert`}>
        <div className={styles.alertContainer}>
            <h4 className={styles.header}>Demo Mode</h4>
            <hr className='line'/>
            <p>DEV MODE Enabled</p>
            <p>The app will use dev-specific APIs.</p>
            <Button onClick={()=>handleClose(`dev-alert`)}>Okay</Button>
        </div>   
        </div>   
    )
}

export function DemoAlert(){
    function handleClose(id){
        let e = document.getElementById(id);
        e.remove();
    }
    return(
        <div className={styles.bgMask} id={`demo-alert`}>
        <div className={styles.alertContainer}>
            <h4 className={styles.header}>Demo Mode</h4>
            <hr className='line'/>
            <p>DEMO MODE Enabled</p>
            <p>Previous records and forms are available to show examples and UI design, but new records cannot be added.</p>
            <Button onClick={()=>handleClose(`demo-alert`)}>Okay</Button>
        </div>   
        </div>   
    )
}