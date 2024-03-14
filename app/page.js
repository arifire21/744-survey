import Image from "next/image";
import { Button } from '@mui/joy'
import styles from "./page.module.css";
import Logo from "../public/images/FIS_CRESCENDO_Logo_Horizontal_RGB.png";

export default function Home() {
  return (
    <>
    <div className={styles.flexHeader}>
      <p>Version: <span id="version-number" style={{color: '#01a0bb'}}>2.1.1</span></p>
      <Button component="a" href="/db-view">
        View Data &#8594;
      </Button>
    </div>

    <div id="game-logo-container">
    {/* <img src="./FIS_CRESCENDO_Logo_Horizontal_RGB.png" alt="FIRST Crescendo Logo" width="100%" height="100%"/> */}
      <div className={styles.gameLogoContainer}>
        <Image src={Logo} alt="FIRST Crescendo Logo" fill/>
      </div>
    </div>

    <div className={styles.menuContainer}>
        <h1>Select Survey Mode</h1>
        <div className={styles.buttonContainer}>
        <Button component="a" href="/pit-survey">
          Pit Survey
        </Button>
        <Button component="a" href="/match-survey">
          Match Survey
        </Button>
        </div>
    </div>
    </>
  );
}
