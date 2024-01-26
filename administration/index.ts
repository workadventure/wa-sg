/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.info('"Administration" script started successfully')

// Waiting for the API to be ready
WA.onInit().then(() => {
    console.log("DEBUG: onInit")

    async function process() {
        console.log("DEBUG: process")

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
                try {
                    await WA.state.saveVariable(`${area}-EN-config`, inputEN.value).catch(e => console.error('Something went wrong while saving variable', e))
                    await WA.state.saveVariable(`${area}-FR-config`, inputFR.value).catch(e => console.error('Something went wrong while saving variable', e))
                    console.log("DEBUG: variables saved")
                } catch (error) {
                    console.error('Error saving variables:', error)
                } finally {
                    console.log("DEBUG: input feedback")
                    // Check that the input value and the variable value are the same after saving the variable
                    checkEN.innerHTML = inputEN.value === WA.state.loadVariable(`${area}-EN-config`) ? "&check;" : "&cross;"
                    checkFR.innerHTML = inputFR.value === WA.state.loadVariable(`${area}-FR-config`) ? "&check;" : "&cross;"
                }
            }
        }).catch(e => console.error(e))
    }

    if (document.readyState === "loading") {
        console.log("DEBUG: Loading hasn't finished yet...")
        document.addEventListener("DOMContentLoaded", process)
    } else {
        console.log("DEBUG: `DOMContentLoaded` has already fired")
        process()
    }        
}).catch(e => console.error(e));

export {}
