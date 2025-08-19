import React, { memo } from 'react'
import { NavLink } from "react-router-dom";

const SidebarLinkUL = ({endereco = '/', nomeLink = '--'}) => {
    return (
            <li className="mb-1 last:mb-0">
                <NavLink
                    end
                    to={endereco}
                    className={({ isActive }) =>
                        "block transition duration-150 truncate " +
                        (isActive ?
                            "text-violet-500" :
                            "text-gray-500/90 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200")
                    }
                >
                    <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                        {nomeLink}
                    </span>
                </NavLink>
            </li>
    )
}

export default memo(SidebarLinkUL)