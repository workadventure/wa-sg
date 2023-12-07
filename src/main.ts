/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";
import { Popup } from "@workadventure/iframe-api-typings";

console.log('Script started successfully');

let popupStand: Popup|null;
let link: any;

// Waiting for the API to be ready
WA.onInit().then(() => {

    console.log('Add element to ActionBar');
    WA.ui.actionBar.addButton({
        id: 'help-btn',
        // @ts-ignore
        type: 'action',
        imageSrc: 'https://svgur.com/i/10Sh.svg',
        toolTip: 'Help',
        callback: () => {
            link = WA.state.lnk_stand_en;
            WA.nav.openCoWebSite(link);
        }
    });



    WA.room.area.onEnter("standZone").subscribe(() => {
        console.log('Player language: ', WA.player.language);

        if(popupStand) return;

        if(WA.player.language == "fr-FR") {
            popupStand = WA.ui.openPopup("popupStand", WA.state.txt_popup_stand_fr as string, [{
                label: WA.state.cta_popup_stand_fr as string,
                className: "primary",
                callback: () => {
                    link = WA.state.lnk_stand_fr;
                    WA.nav.openCoWebSite(link);
                    popupStand?.close();
                    popupStand = null;
                }
            }]);
        } else {
            popupStand = WA.ui.openPopup("popupStand", WA.state.txt_popup_stand_en as string, [{
                label: WA.state.cta_popup_stand_en as string,
                className: "primary",
                callback: () => {
                    link = WA.state.lnk_stand_en;
                    WA.nav.openCoWebSite(link);
                    popupStand?.close();
                    popupStand = null;
                }
            }]);
        }
    });
    WA.room.area.onLeave("standZone").subscribe(() => {
        popupStand?.close();
        popupStand = null;
    });

    // The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure
    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));

}).catch(e => console.error(e));

export {};
