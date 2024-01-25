/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.info('"Administration" script started successfully')

// Waiting for the API to be ready
WA.onInit().then(() => {
    console.log("DEBUG: onInit")
    // Waiting for the DOM to be ready
    window.addEventListener('DOMContentLoaded', async () => {
        console.log("DEBUG: DOMContentLoaded")
        const url = new URL(window.location.toString())
        const area = url.searchParams.get("area")
    
        let inputEN = document.getElementById("input-en") as HTMLInputElement
        let inputFR = document.getElementById("input-fr") as HTMLInputElement
        let checkEN = document.getElementById("check-en") as HTMLElement
        let checkFR = document.getElementById("check-fr") as HTMLElement
        let btn = document.getElementById("btn") as HTMLElement

        bootstrapExtra().then(async () => {
            console.log("DEBUG: bootstrapExtra")
            let urlEN = await WA.state.loadVariable(`${area}-EN-config`) as string
            let urlFR = await WA.state.loadVariable(`${area}-FR-config`) as string
            console.log("DEBUG: urlEN",urlEN)
            console.log("DEBUG: urlFR",urlFR)
    
            // we initialize the 2 fields values and prepare the submission
            if (inputEN && inputFR && area) {
                console.log("DEBUG: bootstrapExtra")
                inputEN.value = urlEN
                inputFR.value = urlFR
                console.log("DEBUG: inputEN.value",inputEN.value)
                console.log("DEBUG: inputFR.value",inputFR.value)
    
                btn.addEventListener('click', event => {
                    console.log("DEBUG: click event")
                    event.preventDefault()
                    saveVariables()          
                })
            }

            async function saveVariables() {
                console.log("DEBUG: saving variables...")
                await WA.state.saveVariable(`${area}-EN-config`, inputEN.value).catch(e => console.error('Something went wrong while saving variable', e))
                await WA.state.saveVariable(`${area}-FR-config`, inputFR.value).catch(e => console.error('Something went wrong while saving variable', e))
              
                console.log("DEBUG: variables saved")
                // Check that the input value and the variable value are the same after saving the variable
                checkEN.innerHTML = inputEN.value === WA.state.loadVariable(`${area}-EN-config`) ? "&check;" : "&cross;"
                checkFR.innerHTML = inputFR.value === WA.state.loadVariable(`${area}-FR-config`) ? "&check;" : "&cross;"
                console.log("DEBUG: input feedback")
            }
        }).catch(e => console.error(e));
    })

}).catch(e => console.error(e));

export {}
