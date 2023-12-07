/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";
import { Popup } from "@workadventure/iframe-api-typings";

console.log('Script started successfully');

let popupStand: Popup|null;
let popupBucarest: Popup|null;
let popupBangalore: Popup|null;
let popupStade: Popup|null;
let popupLille: Popup|null;
let popupParis: Popup|null;
let popupSakura: Popup|null;
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

    WA.room.area.onEnter("zoneBucarest").subscribe(() => {
        popupBucarest = WA.ui.openPopup("popupBucarest", "TO COMPLETE" as string, [{
                label: "Fermer",
                className: "primary",
                callback: () => {
                    popupBucarest?.close();
                    popupBucarest = null;
                }
            }]);
    });
    WA.room.area.onLeave("zoneBucarest").subscribe(() => {
        popupBucarest?.close();
        popupBucarest = null;
    });

    WA.room.area.onEnter("zoneBangalore").subscribe(() => {
        popupBangalore = WA.ui.openPopup("popupBangalore", "TO COMPLETE" as string, [{
                label: "Fermer",
                className: "primary",
                callback: () => {
                    popupBangalore?.close();
                    popupBangalore = null;
                }
            }]);
    });
    WA.room.area.onLeave("zoneBangalore").subscribe(() => {
        popupBangalore?.close();
        popupBangalore = null;
    });

    WA.room.area.onEnter("zoneStade").subscribe(() => {
        popupStade = WA.ui.openPopup("popupStade", "TO COMPLETE" as string, [{
                label: "Fermer",
                className: "primary",
                callback: () => {
                    popupStade?.close();
                    popupStade = null;
                }
            }]);
    });
    WA.room.area.onLeave("zoneStade").subscribe(() => {
        popupStade?.close();
        popupStade = null;
    });

    WA.room.area.onEnter("zoneLille").subscribe(() => {
        popupLille = WA.ui.openPopup("popupLille", "TO COMPLETE" as string, [{
                label: "Fermer",
                className: "primary",
                callback: () => {
                    popupLille?.close();
                    popupLille = null;
                }
            }]);
    });
    WA.room.area.onLeave("zoneLille").subscribe(() => {
        popupLille?.close();
        popupLille = null;
    });

    WA.room.area.onEnter("zoneParis").subscribe(() => {
        popupParis = WA.ui.openPopup("popupParis", "TO COMPLETE" as string, [{
                label: "Fermer",
                className: "primary",
                callback: () => {
                    popupParis?.close();
                    popupParis = null;
                }
            }]);
    });
    WA.room.area.onLeave("zoneParis").subscribe(() => {
        popupParis?.close();
        popupParis = null;
    });

    WA.room.area.onEnter("zoneSakura").subscribe(() => {
        popupSakura = WA.ui.openPopup("popupSakura", "TO COMPLETE" as string, [{
                label: "Fermer",
                className: "primary",
                callback: () => {
                    popupSakura?.close();
                    popupSakura = null;
                }
            }]);
    });
    WA.room.area.onLeave("zoneSakura").subscribe(() => {
        popupSakura?.close();
        popupSakura = null;
    });

    // The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure
    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));

}).catch(e => console.error(e));

export {};
