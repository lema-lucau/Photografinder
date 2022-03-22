import { Menu, MenuItem, MenuLabel } from "@mantine/core";
import { useNavigate } from "react-router-dom";

export default function Photoshoot({id, size='', date, username, location, startTime, endTime}) {
    const navigate = useNavigate();

    function BgImg() {
        return(<img src="https://img.icons8.com/material-outlined/30/000000/menu-2.png" alt="three dots menu icon"></img>);
    }

    const concatTime = (startTime, endTime) => {return startTime + " - " + endTime};
    const formatDate = (date) => {
        const day = date.substring(8, 10);
        const month = date.substring(5,7);
        const year = date.substring(0,4);

        return day + "/" + month + "/" + year;
    }

    if (size === "small") {
        return(
            <div className="bg-white grid grid-cols-9 gap-2 hover:bg-gray-300 w-full border-t border-b border-black mb-2 p-8">
                <p className="text-lg italic font-semibold col-span-2 overflow-x-auto">{formatDate(date)}</p>
                <p className="text-lg italic font-semibold text-center col-span-5 overflow-x-auto">{username}</p>
                <p className="text-lg italic font-semibold text-right col-span-2 overflow-x-auto">{concatTime(startTime, endTime)}</p>
            </div>
        );
    }

    return(
        <div className="bg-white grid grid-cols-12 gap-2 hover:bg-gray-300 w-full border-t border-b border-black mb-2 p-8">
            <p className="text-lg italic font-semibold col-span-2 overflow-x-auto">{formatDate(date)}</p>
            <p className="text-lg italic font-semibold col-span-3 overflow-x-auto">{username}</p>
            <p className="text-lg italic font-semibold col-span-4 overflow-x-auto">{location}</p>
            <p className="text-lg italic font-semibold col-span-2 overflow-x-auto">{concatTime(startTime, endTime)}</p>
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
                        Edit photoshoot
                    </MenuItem>
                    <MenuItem
                        icon={<img src="https://img.icons8.com/ios/24/000000/cancel.png" alt="cancel icon"></img>} 
                        sx={() => ({
                            '&:hover': {
                                backgroundColor: "#e2e8f0"
                            },
                        })}
                    >
                        Cancel photoshoot
                    </MenuItem>
                </Menu>
            </div>
        </div>
    );
}