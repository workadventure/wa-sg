/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.info('"Administration" script started successfully')

// Waiting for the API to be ready
WA.onInit().then(() => {
    // Waiting for the DOM to be ready
    window.addEventListener('DOMContentLoaded', () => {
        const url = new URL(window.location.toString())
        const area = url.searchParams.get("area")
    
        let inputEN = document.getElementById("input-en") as HTMLInputElement
        let inputFR = document.getElementById("input-fr") as HTMLInputElement
        let checkEN = document.getElementById("check-en") as HTMLElement
        let checkFR = document.getElementById("check-fr") as HTMLElement
        let btn = document.getElementById("btn") as HTMLElement

        bootstrapExtra().then(async () => {
            let urlEN = WA.state.loadVariable(`${area}-EN-config`) as string
            let urlFR = WA.state.loadVariable(`${area}-FR-config`) as string
    
            // we initialize the 2 fields values and prepare the submission
            if (inputEN && inputFR && area) {
                inputEN.value = urlEN
                inputFR.value = urlFR
    
                btn.addEventListener('click', event => {
                    event.preventDefault()

                    WA.state.saveVariable(`${area}-EN-config`, inputEN.value).catch(e => console.error('Something went wrong while saving variable', e))
                    WA.state.saveVariable(`${area}-FR-config`, inputFR.value).catch(e => console.error('Something went wrong while saving variable', e))

                    // Check that the input value and the variable value are the same after saving the variable
                    checkEN.innerHTML = inputEN.value === WA.state.loadVariable(`${area}-EN-config`) ? "&check;" : "&cross;"
                    checkFR.innerHTML = inputFR.value === WA.state.loadVariable(`${area}-FR-config`) ? "&check;" : "&cross;"
                })
            }
        }).catch(e => console.error(e));
    })

}).catch(e => console.error(e));

export {}
