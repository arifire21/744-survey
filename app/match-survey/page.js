'use client'
// import StartPosSelector from '@/components/start-pos-selector'
import { Box, Button, Autocomplete, FormControl, FormLabel, Input, RadioGroup, Radio, radioClasses, FormHelperText, Snackbar, Textarea, Slider } from '@mui/joy'
import MenuButton from '@/components/menu-button'
import { useState, useRef } from 'react'
// import CounterButton from '@/components/counter-button'
import styles from './match.module.css'

import { SFLAllTeams } from "../data/sfl-all-teams";

export default function MatchSurveyPage(){
    //form state
    const [loading, setLoading] = useState(false)
    const formRef = useRef(null);

    //snackbar state
    const [open, setOpen] = useState(false)
    const [errorString, setErrorString] =useState('')
    const [submitSuccess, setSuccess] = useState(false)

    //child states
    const [name, setName] = useState('')
    const [matchNumber, setMatchNumber] = useState(0)
    const [teamNumber, setTeamNumber] = useState('')
    const [startPos, setStartPos] = useState('')
    const [color, setColor] = useState('');

    const [autoLine, setLine] = useState('')
    const [autoAmpCount, setAutoAmpCount] = useState(0)
    const [autoSpeakerCount, setAutoSpeakerCount] = useState(0)

    const [teleAmpCount, setTeleAmpCount] = useState(0)
    const [teleSpeakerCount, setTeleSpeakerCount] = useState(0)
    const [amplifyCount, setAmplifyCount] = useState(0)

    const [endPark, setEndPark] = useState('')
    const [endClimbSuccess, setClimbSuccess] = useState('')
    const [endScoreClimb, setScoreClimb] = useState('')
    const [endThrow, setEndThrow] = useState('')
    const [endHumanCount, setEndHumanCount] = useState(0)

    const [defense, setDefense] = useState(0)
    const [robotDisabled, setRobotDisabled] = useState('')
    const [comments, setComments] = useState('')

    const humanPlayerMarks = [
        {
          value: 0,
          label: '0',
        },
        {
          value: 1,
          label: '1',
        },
        {
          value: 2,
          label: '2',
        },
        {
          value: 3,
          label: '3',
        },
    ];

    const defenseMarks = [
        {
          value: 0,
          label: '0',
        },
        {
          value: 1,
          label: '1',
        },
        {
          value: 2,
          label: '2',
        },
        {
          value: 3,
          label: '3',
        },
        {
         value: 4,
         label: '3',
        },
        {
         value: 5,
         label: '5',
        },
    ];

    function handleInputChange(event, value) {
        setTeamNumber(value);
    }

    return (
        <>
            <MenuButton/>
            <h1>Match Survey</h1>
            <form ref={formRef}>
                {/* <h2>Pre-Start</h2> */}
                <FormControl  sx={{ marginBottom: '1rem'}}>
                <FormLabel>Name <sup className='req'>*</sup></FormLabel>
                <Input
                required
                onChange={(e) => setName(e.target.value)}
                sx={{ width: 300 }}
                />
                </FormControl>

                <FormControl  sx={{ marginBottom: '1rem'}}>
                <FormLabel>Match Number <sup className='req'>*</sup></FormLabel>
                <Input
                type='number'
                inputMode='numeric'
                required
                onChange={(e) => setMatchNumber(e.target.value)}
                sx={{ width: 300 }}
                />
                </FormControl>

                <FormControl sx={{ marginBottom: '1rem'}}>
                <FormLabel>Team Number <sup className='req'>*</sup></FormLabel>
                <Autocomplete
                    required
                    type="number"
                    inputMode="numeric"
                    options={SFLAllTeams}
                    value={teamNumber}
                    onChange={handleInputChange}
                    clearOnBlur
                    sx={{ width: 300 }}
                />
                </FormControl>

                <FormLabel>Alliance</FormLabel>
                {/* <RadioGroup
                    name='match-color'
                    value={color}
                    onChange={(e) => {setColor(e.target.value)}}
                    >
                        <Radio value='red' label='Red'/>
                        <Radio value='blue' label='Blue'/>
                </RadioGroup> */}
                    <RadioGroup
                        orientation="horizontal"
                        aria-label="alliance color"
                        name="alliance-color"
                        variant="outlined"
                        value={color}
                        onChange={(event) => setColor(event.target.value)}
                        sx={{width: 'fit-content', marginBottom: '1rem'}}
                        >
                        {['red', 'blue'].map((item) => (
                            <Box
                            key={item}
                            sx={(theme) => ({
                                position: 'relative',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: 48,
                                height: 48,
                                '&:not([data-first-child])': {
                                borderLeft: '1px solid',
                                borderColor: 'divider',
                                },
                                [`&[data-first-child] .${radioClasses.action}`]: {
                                borderTopLeftRadius: `calc(${theme.vars.radius.sm} - 1px)`,
                                borderBottomLeftRadius: `calc(${theme.vars.radius.sm} - 1px)`,
                                },
                                [`&[data-last-child] .${radioClasses.action}`]: {
                                borderTopRightRadius: `calc(${theme.vars.radius.sm} - 1px)`,
                                borderBottomRightRadius: `calc(${theme.vars.radius.sm} - 1px)`,
                                },
                            })}
                            >
                            <Radio
                                value={item}
                                disableIcon
                                overlay
                                label={
                                {
                                    red: 'Red',
                                    blue: 'Blue'
                                }[item]
                                }
                                variant={color === item ? 'solid' : 'plain'}
                                slotProps={{
                                input: { 'aria-label': item },
                                action: {sx: { borderRadius: 0, transition: 'none' }},
                                label: { sx: { lineHeight: 0 } },
                                radio: { sx: { backgroundColor: `${color} === 'red' : '#000' ? 'transparent'`} }
                                }}
                            />
                            </Box>
                        ))}
                        </RadioGroup>

                <FormLabel>Starting Position</FormLabel>
                {/* <FormHelperText>Positions are from <strong>driver's POV (them facing the field)</strong></FormHelperText> */}
                <FormControl sx={{marginBottom: '1rem'}}>
                { color === 'blue' && (
                    <RadioGroup
                    name='blue-pos'
                    value={startPos}
                    onChange={(e) => {setStartPos(e.target.value), console.log(startPos)}}
                    >
                        <Radio value='Against B1 Wall' label='Against B1 Wall'/>
                        <Radio value='Against B2 Wall' label='Against B2 Wall'/>
                        <Radio value='Left Diagonal Subwoofer' label='Left Diagonal Subwoofer'/>
                        <Radio value='Centered Subwoofer' label='Centered Subwoofer'/>
                        <Radio value='Right Diagonal Subwoofer' label='Right Diagonal Subwoofer'/>
                        <Radio value='Against B3 Wall' label='Against B3 Wall'/>
                    </RadioGroup>
                )}
                { color === 'red' && (
                    <RadioGroup
                    name='red-pos'
                    value={startPos}
                    onChange={(e) => {setStartPos(e.target.value), console.log(startPos)}}
                    >
                        <Radio value='Against R1 Wall' label='Against R1 Wall'/>
                        <Radio value='Against R2 Wall' label='Against R2 Wall'/>
                        <Radio value='Left Diagonal Subwoofer' label='Left Diagonal Subwoofer'/>
                        <Radio value='Centered Subwoofer' label='Centered Subwoofer'/>
                        <Radio value='Right Diagonal Subwoofer' label='Right Diagonal Subwoofer'/>
                        <Radio value='Against R3 Wall' label='Against R3 Wall'/>
                    </RadioGroup>
                )}
                </FormControl>

                <h2>Auto</h2>
                {/* cross auto line */}
                <FormControl sx={{ marginBottom: '1rem'}}>
                    <FormLabel>Did robot cross the Auto Line?</FormLabel>
                    <RadioGroup
                    name='match-auto-line'
                    value={autoLine}
                    onChange={(e) => {setLine(e.target.value), console.log(autoLine)}}
                    >
                        <Radio value='yes' label='Yes'/>
                        <Radio value='no' label='No'/>
                    </RadioGroup>
                </FormControl>

                {/* Note scored in amp */}
                <FormControl sx={{ marginBottom: '1rem'}}>
                <FormLabel>Notes Scored in Amp</FormLabel>
                <div className={styles.container}>
                <button
                    type="button"
                    className={styles.leftButton}
                    onClick={() => setAutoAmpCount(autoAmpCount == 0 ? 0 : (autoAmpCount - 1))}>
                    -
                </button>
                <Input
                readOnly
                value={autoAmpCount}
                className={styles.counterInput}
                sx={{ '& input': { textAlign: 'center' }}}/>
                <button
                    type="button"
                    className={styles.rightButton}
                    onClick={() => setAutoAmpCount(autoAmpCount + 1)}>
                    +
                </button>
                </div>
                </FormControl>

                {/* Notes Scored in Speaker */}
                <FormControl sx={{ marginBottom: '1rem'}}> 
                <FormLabel>Notes Scored in Speaker</FormLabel>
                <div className={styles.container}>
                <button
                    type="button"
                    className={styles.leftButton}
                    onClick={() => setAutoSpeakerCount(autoSpeakerCount == 0 ? 0 : (autoSpeakerCount - 1))}>
                    -
                </button>
                <Input
                readOnly
                value={autoSpeakerCount}
                className={styles.counterInput}
                sx={{ '& input': { textAlign: 'center' }}}/>
                <button
                    type="button"
                    className={styles.rightButton}
                    onClick={() => setAutoSpeakerCount(autoSpeakerCount + 1)}>
                    +
                </button>
                </div>
                </FormControl>
                
                <h2>Teleop</h2>
                {/* Note scored in amp */}
                <FormControl sx={{ marginBottom: '1rem'}}>
                <FormLabel>Notes Scored in Amp</FormLabel>
                <div className={styles.container}>
                <button
                    type="button"
                    className={styles.leftButton}
                    onClick={() => setTeleAmpCount(teleAmpCount == 0 ? 0 : (teleAmpCount - 1))}>
                    -
                </button>
                <Input
                readOnly
                value={teleAmpCount}
                className={styles.counterInput}
                sx={{ '& input': { textAlign: 'center' }}}/>
                <button
                    type="button"
                    className={styles.rightButton}
                    onClick={() => setTeleAmpCount(teleAmpCount + 1)}>
                    +
                </button>
                </div>
                </FormControl>

                {/* Notes Scored in Speaker */}
                <FormControl sx={{ marginBottom: '1rem'}}> 
                <FormLabel>Notes Scored in Speaker</FormLabel>
                <div className={styles.container}>
                <button
                    type="button"
                    className={styles.leftButton}
                    onClick={() => setTeleSpeakerCount(teleSpeakerCount == 0 ? 0 : (teleSpeakerCount - 1))}>
                    -
                </button>
                <Input
                readOnly
                value={teleSpeakerCount}
                className={styles.counterInput}
                sx={{ '& input': { textAlign: 'center' }}}/>
                <button
                    type="button"
                    className={styles.rightButton}
                    onClick={() => setTeleSpeakerCount(teleSpeakerCount + 1)}>
                    +
                </button>
                </div>
                </FormControl>

                {/* human player amplification */}
                <FormControl sx={{ marginBottom: '1rem'}}> 
                <FormLabel>Times Human Player <strong>pressed</strong> Amplify</FormLabel>
                <div className={styles.container}>
                <button
                    type="button"
                    className={styles.leftButton}
                    onClick={() => setAmplifyCount(amplifyCount == 0 ? 0 : (amplifyCount - 1))}>
                    -
                </button>
                <Input
                readOnly
                value={amplifyCount}
                className={styles.counterInput}
                sx={{ '& input': { textAlign: 'center' }}}/>
                <button
                    type="button"
                    className={styles.rightButton}
                    onClick={() => setAmplifyCount(amplifyCount + 1)}>
                    +
                </button>
                </div>
                </FormControl>

                <h2>Endgame</h2>
                <FormControl sx={{ marginBottom: '1rem'}}>
                    <FormLabel>Did robot park at the stage or attempt to climb?</FormLabel>
                    <RadioGroup
                    name='match-climb-park'
                    value={endPark}
                    onChange={(e) => {setEndPark(e.target.value), console.log(endPark)}}
                    >
                        <Radio value='park' label='Park'/>
                        <Radio value='climb' label='Climb'/>
                    </RadioGroup>
                </FormControl>

                {endPark === 'climb' && (
                    <>
                    <FormControl sx={{ marginBottom: '1rem'}}>
                        <FormLabel>Did robot <strong>successfully climb</strong>?</FormLabel>
                        <RadioGroup
                        name='match-climb'
                        value={endClimbSuccess}
                        onChange={(e) => {setClimbSuccess(e.target.value), console.log(endClimbSuccess)}}
                        >
                            <Radio value='yes' label='Yes'/>
                            <Radio value='no' label='No'/>
                        </RadioGroup>
                    </FormControl>

                    <FormControl sx={{ marginBottom: '1rem'}}>
                        <FormLabel>Did robot score in stage?</FormLabel>
                        <RadioGroup
                        name='match-climb-score'
                        value={endScoreClimb}
                        onChange={(e) => {setScoreClimb(e.target.value), console.log(endScoreClimb)}}
                        >
                            <Radio value='yes' label='Yes'/>
                            <Radio value='no' label='No'/>
                        </RadioGroup>
                    </FormControl>
                    </>
                )}

                <FormControl sx={{ marginBottom: '1rem'}}>
                    <FormLabel>Did human player throw any notes?</FormLabel>
                    <RadioGroup
                    name='match-HP-throw'
                    value={endThrow}
                    onChange={(e) => {setEndThrow(e.target.value), console.log(endThrow)}}
                    >
                        <Radio value='yes' label='Yes'/>
                        <Radio value='no' label='No'/>
                    </RadioGroup>
                </FormControl>

                {endThrow === 'yes'  && (
                    <>
                    <FormLabel>How many scored?</FormLabel>
                    <Slider
                        aria-label="HP-note-score"
                        defaultValue={0}
                        // getAriaValueText={endHumanCount}
                        step={1}
                        // valueLabelDisplay="auto"
                        marks={humanPlayerMarks}
                        min={0}
                        max={3}
                        onChange={(e) => {setEndHumanCount(e.target.value)}}
                        sx={{ maxWidth: 500, minWidth: 300 }}
                    />
                  </>
                )}

                <h2>Information</h2>
                <FormControl sx={{ marginBottom: '1rem'}}>
                    <FormLabel>Did robot lose comms at any point (or was disabled)?</FormLabel>
                    <RadioGroup
                    name='match-disabled'
                    value={robotDisabled}
                    onChange={(e) => {setRobotDisabled(e.target.value)}}
                    >
                        <Radio value='yes' label='Yes'/>
                        <Radio value='no' label='No'/>
                    </RadioGroup>
                </FormControl>

                <FormControl sx={{ marginBottom: '3rem'}}>
                <FormLabel>Rate effective defense:</FormLabel>
                <Slider
                    aria-label="defense"
                    defaultValue={0}
                    // getAriaValueText={endHumanCount}
                    step={1}
                    // valueLabelDisplay="auto"
                    marks={defenseMarks}
                    min={0}
                    max={5}
                    onChange={(e) => {setDefense(e.target.value)}}
                    sx={{ maxWidth: 500, minWidth: 300 }}
                />
                </FormControl>

                <FormControl>
                    <FormLabel>Post-Match Comments</FormLabel>
                    <FormHelperText>Why disabled, fouls, etc.</FormHelperText>
                    <Textarea minRows={2} onChange={(e) => setFeedback(e.target.value)} sx={{ maxWidth: 500, minWidth: 300 }}/>
                </FormControl>

                <Button loading={loading} onClick={(e) => {handleValidate(e)}}>Submit Survey</Button>
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