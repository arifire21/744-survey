# 2024
# Pre-Release
## v0.1.0
- porting over code from defunct PWA
- Next-ifying it, with statefuls

# SFL
## v1.0.0
- integrated with Vercel postgres
- cleaned up GET rendering

# Post-SFL
## v1.1.0
- added custom styling to drivetrain buttons again
- corrected icons

## v1.1.1
- fix onInputChange by using `onChange`
- fix Autocomplete value not clearing on submit by using `value`
- fix rendering ternary in db-view

## v2.0.0
- match survey form
- api points made
- basic match result render with colored backdrop
- fix autocomplete and match number not using numeric keyboard (#4)

## v2.0.1 (MVP State)
- fix [#7](https://github.com/arifire21/744-survey/issues/7)

## v2.1.1
- fix [#5](https://github.com/arifire21/744-survey/issues/5)
- added extra conditionals/questions to forms for clarity
- changed `numeric` inputMode to `tel` to use more optimized number keyboard
- split pit and match views into two pages
- fix [#10](https://github.com/arifire21/744-survey/issues/10)
- added SERIAL PRIMARY KEY `id` field to both tables
- uninstall sqlite packages - unused

# Orlando
## v3.0.0
- team list updated to orlando roster
- change `tel` to `decimal` - fix #4 again?
- added `practice` match type
- changed drivetrain radio button colors for clarity
- added placeholder text to Autocompletes for clarity
- Pit Survey filtering
    - all: sorted in ascending order
    - by team number: avail options grabbed from posted array
    - by [x] trait: via select dropdown

## v3.0.1
- getting team numbers from posted array now works correctly (via useState)
- hotfix: match number cannot be 0, added error message

## v3.0.2
- hotfix: increment matchNumber + 1 to avoid error (new issue, onchange does not fire after form submit [#16](https://github.com/arifire21/744-survey/issues/16))
- added dev tables, dev mode in development
- indented section details and adjusted margins for cleaner/more compact look
- while better match result rendering is developed, added sorting to improve readability
    - sorts by match number, then alliance color, to map/render them in sequence of red then blue
    - MUI Accordion (collapsible) per mapped item, to help with visual busyness
- [Saturday Hotfix] Pit and Match Surveys: change feedback max length to 500 chars

# Post-Orlando
## v4.0.0
- dev and postseason modes added, toggled via ENVs
    - for serving as a portfolio example
    - for archiving results
- organizing some files
