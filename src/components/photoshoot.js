import { Menu, MenuItem, MenuLabel } from "@mantine/core";

export default function Photoshoot() {
    function BgImg() {
        return(<img src="https://img.icons8.com/material-outlined/30/000000/menu-2.png" alt="three dots menu icon"></img>);
    }

    return(
        <div className="bg-white grid grid-cols-12 gap-2 hover:bg-gray-300 w-full border-t border-b border-black mb-2 p-8">
            <p className="text-lg col-span-2 overflow-x-auto">Date</p>
            <p className="text-lg col-span-3 overflow-x-auto">Photographers_username</p>
            <p className="text-lg col-span-4 overflow-x-auto">Location</p>
            <p className="text-lg col-span-2 overflow-x-auto">Time</p>
            <div className="col-span-1">
                {/* Dropdown menu that will appear when user clicks the three dots */}
                <Menu 
                    control={<button type="button"><BgImg></BgImg></button>} placement="center"
                >
                    <MenuLabel>Photoshoot options</MenuLabel> 
                    <MenuItem 
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