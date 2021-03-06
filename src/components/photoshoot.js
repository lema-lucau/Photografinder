import { Menu, MenuItem, MenuLabel, Modal, Skeleton } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { LOGGED_IN_USER } from "../constants/user";
import { getUserByUserId } from "../services/users";
import { deletePhotoshoot, updatePhotoshootStatus } from "../services/photoshoots";
import { CONFIRMED } from "../constants/photoshoot";
import PhotoshootDetails from "./photoshootDetails";
import { formatDate, concatTime, photoshootFinishedOrExpired } from "../helpers/photoshootFunctions";

export default function Photoshoot({id, size='', date, username, location, startTime, endTime, lastEditBy , status, clientNotes, photographerNotes}) {
    const [user, setUser] = useState(null);
    const [opened, setOpened] = useState(false);
    const [viewPhotoshoot, setViewPhotoshoot] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fbUser = JSON.parse(localStorage.getItem(LOGGED_IN_USER));

        const getUser = async () => {
            await getUserByUserId(fbUser.uid)
            .then(returnedUser => setUser(returnedUser));
        }

        const checkPhotoshoot = async () => {
           await photoshootFinishedOrExpired(id, formatDate(date, "-", "YYYYMMDD"), endTime, status);
        }

        checkPhotoshoot();
        getUser();
    }, []);

    // Check if the photoshoot has expired
    // const result = await

    // If the client was the last person to edit photoshoot, they must wait for photographer to approve photoshoot
    // This works vice versa
    let canConfirmPhotoshoot = false;
    if (user !== null && user.type === "Client" && lastEditBy === "Photographer") {
        canConfirmPhotoshoot = true;
    }  else if (user !== null && user.type === "Photographer" && lastEditBy === "Client") {
        canConfirmPhotoshoot = true;
    }

    function BgImg() {
        return(<img src="https://img.icons8.com/material-outlined/30/000000/menu-2.png" alt="three dots menu icon"></img>);
    }

    function DisplayPhotoshoot() {
        return(
            <>
                <Modal
                    opened={viewPhotoshoot}
                    onClose={() => setViewPhotoshoot(false)}
                    size="85%"
                    styles={{
                        modal: { backgroundColor: 'rgba(224,242,254,0.1)' },
                        close: { color: 'black' }
                    }}
                >
                    <PhotoshootDetails 
                        username={username} date={formatDate(date, "/")} startTime={startTime} endTime={endTime} 
                        location={location} clientNotes={clientNotes} photographerNotes={photographerNotes} 
                        status={status} lastEditBy={lastEditBy}
                    />
                </Modal>
            </>
        );
    }

    function ConfirmCancellation() {
        return(
            <>
                <h1 className="text-center text-3xl font-bold mb-8">Cancel Photoshoot</h1>
                <h2 className="text-center text-xl mb-8">Are you sure you want to cancel the following photoshoot?</h2>
                <PhotoshootDetails 
                    username={username} date={formatDate(date, "/")} startTime={startTime} endTime={endTime} 
                    location={location} clientNotes={clientNotes} photographerNotes={photographerNotes}
                />
                <div className="flex justify-around w-5/6 pb-8 mx-auto mt-8">
                    <button 
                        className="text-lg text-white px-24 py-4 ml-8 bg-green-400 rounded-full"
                        onClick={() => setOpened(false)}
                    >
                        No
                    </button>

                    <button 
                        className="text-lg text-white px-24 py-4 ml-8 bg-red-500 rounded-full"
                        onClick={async () => {
                            await deletePhotoshoot(id);
                            window.location.reload();
                        }}
                    >
                        Yes
                    </button>
                </div>
            </>
        );
    }

    if (size === "small") {
        return(
            <div 
                className="bg-sky-200 grid grid-cols-9 gap-2 hover:bg-sky-300 w-full rounded-3xl mb-2 p-8"
            >
                <p onClick={() => setViewPhotoshoot(true)} className="text-lg italic font-semibold col-span-3 overflow-x-auto">{formatDate(date, "/")}</p>
                <p onClick={() => setViewPhotoshoot(true)} className="text-lg italic font-semibold text-center col-span-4 overflow-x-auto">{username}</p>
                <p onClick={() => setViewPhotoshoot(true)} className="text-lg italic font-semibold text-right col-span-2 overflow-x-auto">{concatTime(startTime, endTime)}</p>
                <DisplayPhotoshoot />
            </div>
        );
    }

    return(
        <>
            { user !== null ?
                <div 
                    className="bg-sky-200 grid grid-cols-12 gap-2 hover:bg-sky-300 w-full rounded-3xl mb-2 p-8"
                >
                    <p onClick={() => setViewPhotoshoot(true)} className="text-lg italic font-semibold col-span-2 overflow-x-auto">{formatDate(date, "/")}</p>
                    <p onClick={() => setViewPhotoshoot(true)} className="text-lg italic font-semibold col-span-3 overflow-x-auto">{username}</p>
                    <p onClick={() => setViewPhotoshoot(true)} className="text-lg italic font-semibold col-span-4 overflow-x-auto">{location}</p>
                    <p onClick={() => setViewPhotoshoot(true)} className="text-lg italic font-semibold col-span-2 overflow-x-auto">{concatTime(startTime, endTime)}</p>
                    <div className="col-span-1">
                        {/* Dropdown menu that will appear when user clicks the three dots */}
                        <Menu 
                            control={<button type="button"><BgImg></BgImg></button>} placement="center"
                        >
                            <MenuLabel>Photoshoot options</MenuLabel> 
                            <MenuItem 
                                onClick={() => navigate(`/edit-photoshoot/${id}`)}
                                icon={<img src="https://img.icons8.com/external-dreamstale-lineal-dreamstale/24/000000/external-edit-interface-dreamstale-lineal-dreamstale.png" alt="edit icon"></img>}
                                sx={() => ({
                                    '&:hover': {
                                        backgroundColor: "#e2e8f0"
                                    },
                                })}
                            >
                                Edit
                            </MenuItem>
                            {canConfirmPhotoshoot && status !== CONFIRMED ? 
                                <MenuItem 
                                    onClick={async () => {await updatePhotoshootStatus(id, CONFIRMED); window.location.reload()}}
                                    icon={<img src="https://img.icons8.com/external-royyan-wijaya-detailed-outline-royyan-wijaya/24/external-tick-interface-royyan-wijaya-detailed-outline-royyan-wijaya.png" alt="confirm icon"></img>}
                                    sx={() => ({
                                        '&:hover': {
                                            backgroundColor: "#e2e8f0"
                                        },
                                    })}
                                >
                                    Confirm
                                </MenuItem>
                        
                            : null}

                            <MenuItem
                                icon={<img src="https://img.icons8.com/ios/24/000000/cancel.png" alt="cancel icon"></img>} 
                                onClick={() => setOpened(true)}
                                sx={() => ({
                                    '&:hover': {
                                        backgroundColor: "#e2e8f0"
                                    },
                                })}
                            >
                                Cancel
                            </MenuItem>
                        </Menu>
                    </div>

                    {/* Confirm cancellation */}
                    <Modal
                        opened={opened}
                        onClose={() => setOpened(false)}
                        size="85%"
                    >
                        <ConfirmCancellation />
                    </Modal>

                    {/* Display photoshoot details */}
                    <DisplayPhotoshoot />
                </div>
            : 
                <>
                    <Skeleton className="mt-2 mb-2 rounded-3xl" height={96} /> 
                    <Skeleton className="mb-2 rounded-3xl" height={96} /> 
                    <Skeleton className="mb-2 rounded-3xl" height={96} /> 
                    <Skeleton className="mb-2 rounded-3xl" height={96} /> 
                </>
            }
        </>
    );
}