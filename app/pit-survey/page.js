'use client'
import Image from "next/image";
import { Button, Autocomplete, FormControl, FormLabel, Input, RadioGroup, Radio, List, ListItem, Checkbox, FormHelperText, Snackbar, Textarea } from '@mui/joy'
import MenuButton from "@/components/menu-button";
import { SFLAllTeams } from "./sfl-all-teams";
import { useState, useRef } from "react";
import styles from './pit.module.css'

  //images
  import WCD from '../../public/images/westcoastdrive.png'
  import Mec from '../../public/images/mecanumdrive.png'
  import Tank from '../../public/images/tankdrive.jpg'
  import Swerve from '../../public/images/swervedrive.jpg'

export default function PitSurveyPage() {
  const [teamNumber, setTeamNumber] = useState('')
  const [drivetrain, setDrivetrain] = useState('')
  const [prefPos, setPrefPos] = useState([])
  const [vision, setVision] = useState('')
  const [scoreHeight, setScoreHeight] = useState('')
  const [pickup, setPickup] = useState('')
  const [climb, setClimb] = useState('')
  const [helpClimb, setHelpClimb] = useState('')
  const [scoreClimb, setScoreClimb] = useState('')
  const [investigate, setInvestigate] = useState('')
  const [feedback, setFeedback] = useState('')
  const [name, setName] = useState('')

  //form state
  const [loading, setLoading] = useState(false)
  const formRef = useRef(null);
  // const [validated, setValidated] = useState(false)

  //checkboxes
  const [leftChecked, setLeft] = useState(false)
  const [centerChecked, setCenter] = useState(false)
  const [rightChecked, setRight] = useState(false)

  //drivetrain radio
  const [westSelected, setWest] = useState(false)
  const [mecanumSelected, setMec] = useState(false)
  const [tankSelected, setTank] = useState(false)
  const [swerveSelected, setSwerve] = useState(false)
  const [isOtherSelected, setOther] = useState(false)

  //snackbar state
  const [open, setOpen] = useState(false)
  const [errorString, setErrorString] =useState('')
  const [submitSuccess, setSuccess] = useState(false)

  function handleCheckbox(value, checked){
    console.log(`${value}, ${checked}`)

    if(checked == undefined){
      console.log('returning undefined')
      setPrefPos([...prefPos, value])
    }
    if(checked == true){
      setPrefPos([...prefPos, value])
      console.log('added')
      console.log(prefPos)
    } else if(checked == false) {
      setPrefPos(
        prefPos.filter(a =>
          a !== value
      ))
      console.log('removed')
      console.log(prefPos)
    }
  }

  function handleInputChange(event, value) {
    console.log(value);
    setTeamNumber(value);
  }

  function drivetrainHelper(radioValue){
    console.log(radioValue)
    switch (radioValue) {
      case 'west coast drive':
        setDrivetrain(radioValue)
        setWest(true)
        setMec(false)
        setTank(false)
        setSwerve(false)
        setOther(false)
        break;
      case 'mecanum':
        setDrivetrain(radioValue)
        setMec(true)
        setWest(false)
        setTank(false)
        setSwerve(false)
        setOther(false)
        break;
      case 'tank':
        setDrivetrain(radioValue)
        setTank(true)
        setWest(false)
        setMec(false)
        setSwerve(false)
        setOther(false)
        break;
      case 'swerve':
        setDrivetrain(radioValue)
        setSwerve(true)
        setWest(false)
        setMec(false)
        setTank(false)
        setOther(false)
      break;
      case 'other':
        setOther(true)
        setWest(false)
        setMec(false)
        setTank(false)
        setSwerve(false)
      break;
    }
  }

  function handleValidate(){
    if (!teamNumber || !drivetrain || ! prefPos || !vision
      || !scoreHeight || !pickup || !climb ||!helpClimb
      || !scoreClimb || !investigate || !name){
    setErrorString('All fields required!')
    setSuccess(false)
    setOpen(true)
    return false;
    }

    handleSubmit()
  }

  function handleSubmit(e){
    setLoading(true)
    e.preventDefault()

    if(investigate === 'no'){
      setFeedback(null)
    }

    //join into one string
    var allPrefPos = prefPos.join(",");
    console.log(allPrefPos)
 
    console.log(teamNumber, drivetrain, vision, scoreHeight, pickup, climb, helpClimb, scoreClimb, investigate, name)

    const data = {
      teamNumber: teamNumber,
      drivetrain: drivetrain,
      prefPos: allPrefPos,
      vision: vision,
      scoreHeight: scoreHeight,
      pickup: pickup,
      climb: climb,
      helpClimb: helpClimb,
      scoreClimb: scoreClimb,
      investigate: investigate,
      name: name
     }

    fetch('/api/pit-result', {
      method: 'POST', 
      body: JSON.stringify(data),
      headers:{ 'Content-Type': 'application/json' }
    })
    .then((response => {
      if(!response.ok){
          setSuccess(false)

          switch (response.status) {
            case 400:
                setErrorString('Server validation error! All fields required.')
                break;
            case 500:
                setErrorString('API error!')
                break;
            default:
                setErrorString('Error! Please try again.')
                break;
          }

          // return Promise.reject(response)
      } else { //reset
          setSuccess(true)
          formRef.current.reset();
          setTeamNumber('0')

          setLeft(false)
          setCenter(false)
          setRight(false)

          setDrivetrain('')
          setPrefPos([])
          setVision('')
          setScoreHeight('')
          setPickup('')
          setClimb('')
          setHelpClimb('')
          setScoreClimb('')
          setInvestigate('')
          setName('')
      }
      setOpen(true)
      setLoading(false)
  }))
  .catch(error => {
      console.log(error.json())
  })
  }

  return (
    <>
        <MenuButton/>

        <h1>Pit Survey</h1>
        {/* <p style={{color: 'red'}}>Please fill out all form fields</p>
        <p style={{color: 'red'}}><strong>Current Known Bugs:</strong>: Team Number does not visually reset. The <strong>value is reset on form submit</strong>. Please choose a new number or the field will be empty.</p> */}
        <form ref={formRef}>
        <h2>General</h2>
        <FormControl sx={{ marginBottom: '1rem'}}>
          <FormLabel>Team Number <sup className='req'>*</sup></FormLabel>
          <Autocomplete
            required
            options={SFLAllTeams}
            inputValue={teamNumber === '' ? '0' : teamNumber}
            onInputChange={() => {handleInputChange}}
            // clearOnBlur
            sx={{ width: 300 }}
          />
        </FormControl>

        <FormControl sx={{ marginBottom: '1rem'}}>
          <FormLabel>Drivetrain Type <sup className='req'>*</sup></FormLabel>
          <RadioGroup name="radio-buttons-drivetrain" value={drivetrain}>
            <div className={styles.radioContainer}>
            <Radio value="west coast drive" checked={westSelected} sx={{display: 'none'}}/>
            <div className={`${styles.customRadio} ${westSelected ? styles.dtSelected : ''}`} onClick={() => drivetrainHelper('west coast drive')}>
              <Image className={styles.customRadioImage} src={WCD} alt='west-coast-example'/>
              West Coast Drive
            </div>
            
            <Radio value="mecanum" checked={mecanumSelected} sx={{display: 'none'}}/>
            <div className={`${styles.customRadio} ${mecanumSelected ? styles.dtSelected : ''}`} onClick={() => drivetrainHelper('mecanum')}>
              <Image className={styles.customRadioImage} src={Mec} alt='mecanum-example'/>
              Mecanum Drive
            </div>
            
            <Radio value="tank" checked={tankSelected} sx={{display: 'none'}}/>
            <div className={`${styles.customRadio} ${tankSelected ? styles.dtSelected : ''}`} onClick={() => drivetrainHelper('tank')}>
              <Image className={styles.customRadioImage} src={Tank} alt='tank-example'/>
              Tank Drive (treads)
            </div>
            
            <Radio value="swerve" checked={swerveSelected} sx={{display: 'none'}}/>
            <div className={`${styles.customRadio} ${swerveSelected ? styles.dtSelected : ''}`} onClick={() => drivetrainHelper('swerve')}>
              <Image className={styles.customRadioImage} src={Swerve} alt='swerve-example'/>
              Swerve Drive
            </div>
            
            <div>
              <Radio value="other" checked={isOtherSelected} sx={{display: 'none', margin: '0 auto'}}/>
              <div className={`${styles.customRadio} ${isOtherSelected ? styles.dtSelected : ''}`} onClick={() => drivetrainHelper('other')}>
                Other
              </div>
              {isOtherSelected && isOtherSelected &&
                <Input
                onChange={(e) => setDrivetrain(e.target.value)}
                sx={{ width: 300 }}
                />
              }
            </div>
            </div>
          </RadioGroup>
        </FormControl>

        <FormControl  sx={{ marginBottom: '1rem'}}>
          <FormLabel>Preferred Starting Position <sup className='req'>*</sup></FormLabel>
          <FormHelperText>Drive team can have multiple preferences</FormHelperText>
          <div role="group" aria-labelledby="preferred-pos-group">
            <List size="sm">
              <ListItem>
                <Checkbox label="Left" value='left' checked={leftChecked} onChange={(e) => {setLeft(e.target.checked), handleCheckbox(e.target.value, e.target.checked)}}/>
              </ListItem>
              <ListItem>
                <Checkbox label="Center" value='center' checked={centerChecked} onChange={(e) => {setCenter(e.target.checked), handleCheckbox(e.target.value, e.target.checked)}}/>
              </ListItem>
              <ListItem>
                <Checkbox label="Right" value='right'  checked={rightChecked} onChange={(e) => {setRight(e.target.checked), handleCheckbox(e.target.value, e.target.checked)}}/>
              </ListItem>
            </List>
          </div>
        </FormControl>

        <FormControl  sx={{ marginBottom: '1rem'}}>
          <FormLabel>Does the robot have vision tracking? <sup className='req'>*</sup></FormLabel>
          <RadioGroup name="radio-buttons-vision"
              value={vision}
              onChange={(e) => setVision(e.target.value)}>
            <Radio value="yes" label="Yes" />
            <Radio value="no" label="No" />
          </RadioGroup>
        </FormControl>

        <FormControl  sx={{ marginBottom: '1rem'}}>
          <FormLabel>Which heights can the robot score from? <sup className='req'>*</sup></FormLabel>
          <RadioGroup name="radio-buttons-score-height"
          value={scoreHeight}
          onChange={(e) => setScoreHeight(e.target.value)}>
            <Radio value="amp" label="Amp" />
            <Radio value="shooter" label="Shooter" />
            <Radio value="both" label="Both" />
          </RadioGroup>
        </FormControl>

        <FormControl  sx={{ marginBottom: '1rem'}}>
          <FormLabel>Where can the robot pick up game pieces from? <sup className='req'>*</sup></FormLabel>
          <RadioGroup name="radio-buttons-pickup"
          value={pickup}
          onChange={(e) => setPickup(e.target.value)}>
            <Radio value="floor" label="Floor" />
            <Radio value="human player station" label="Human Player Station" />
            <Radio value="both" label="Both" />
          </RadioGroup>
        </FormControl>

        <h2>Endgame</h2>
        <FormControl  sx={{ marginBottom: '1rem'}}>
          <FormLabel>Can the robot climb? <sup className='req'>*</sup></FormLabel>
          <RadioGroup name="radio-buttons-climb"
          value={climb}
          onChange={(e) => setClimb(e.target.value)}>
            <Radio value="yes" label="Yes" />
            <Radio value="no" label="No" />
          </RadioGroup>
        </FormControl>

        <FormControl  sx={{ marginBottom: '1rem'}}>
          <FormLabel>Can the robot help another robot to climb? <sup className='req'>*</sup></FormLabel>
          <RadioGroup name="radio-buttons-climb-help"
          value={helpClimb}
          onChange={(e) => setHelpClimb(e.target.value)}>
            <Radio value="yes" label="Yes" />
            <Radio value="no" label="No" />
          </RadioGroup>
        </FormControl>

        <FormControl  sx={{ marginBottom: '1rem'}}>
          <FormLabel>Can the robot score while climbing? <sup className='req'>*</sup></FormLabel>
          <RadioGroup name="radio-buttons-climb-score"
          value={scoreClimb}
          onChange={(e) => setScoreClimb(e.target.value)}>
            <Radio value="yes" label="Yes" />
            <Radio value="no" label="No" />
          </RadioGroup>
        </FormControl>

        <h2>Information</h2>
        <FormControl  sx={{ marginBottom: '1rem'}}>
          <FormLabel>Do you think this robot is worth investigating? <sup className='req'>*</sup></FormLabel>
          <RadioGroup name="radio-buttons-invesitgate"
          value={investigate}
          onChange={(e) => setInvestigate(e.target.value)}>
            <Radio value="yes" label="Yes" />
            <Radio value="no" label="No" />
          </RadioGroup>

          {investigate && investigate === 'yes' && 
          <div>
            <FormLabel>Why? Explain your reason.</FormLabel>
            <Textarea minRows={3} onChange={(e) => setFeedback(e.target.value)} sx={{ width: 500 }}/>
          </div>
          }
        </FormControl>

        <FormControl  sx={{ marginBottom: '1rem'}}>
          <FormLabel>Full Name <sup className='req'>*</sup></FormLabel>
          <Input
          required
          onChange={(e) => setName(e.target.value)}
          sx={{ width: 300 }}
          />
        </FormControl>
        
        <Button loading={loading} onClick={handleValidate}>Submit Survey</Button>
        </form>

        <Snackbar
        variant="solid"
        color={submitSuccess ? 'success' : 'danger'}
        autoHideDuration={submitSuccess ? 3500 : 5000}
        open={open}
        onClose={() => setOpen(false)}
        // onUnmount={handleReset}
        >
        {submitSuccess ?
        `Submitted!`
        : `${errorString}`}
        </Snackbar>
    </>


  )
}